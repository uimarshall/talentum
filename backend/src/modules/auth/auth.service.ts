import jwt from 'jsonwebtoken';
import sessionModel from '../../database/models/session.model';
import UserModel from '../../database/models/user.model';
import VerificationCodeModel from '../../database/models/verification.model';
import { ErrorCode } from '../../shared/enums/errorCode.enum';
import { VerificationEnum } from '../../shared/enums/verificationCode.enum';
import { ILogin, IRegister } from '../../shared/interface/auth.interface';
import {
  BadGatewayException,
  BadRequestException,
  EmailAlreadyExistsException,
  HttpException,
  NotFoundException,
  UnAuthorizedException,
} from '../../shared/utils/catchErrors';
import {
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
  threeMinutesAgo,
} from '../../shared/utils/dateTime';
import { config } from '../../config/app.config';
import SessionModel from '../../database/models/session.model';
import { refreshTokenSignOptions, RefreshTPayload, signJwtToken, verifyJwtToken } from '../../shared/utils/jwt';
import { sendEmail } from '../../mailers/mailer';
import { verifyEmailTemplate } from '../../mailers/template';
import { HTTPSTATUS } from '../../config/http.config';

export class AuthService {
  // Implement your auth service methods here
  public async register(registerData: IRegister) {
    // Registration logic goes here
    const { name, email, password, confirmPassword, userAgent, ipAddress } = registerData;
    const userAlreadyExists = await UserModel.exists({ email });
    if (userAlreadyExists) {
      throw new EmailAlreadyExistsException('User already exists', ErrorCode.AUTH_EMAIL_ALREADY_EXIST);
    }
    const newUser = await UserModel.create({ name, email, password });
    const userId = newUser._id;
    // Create a verification for the user
    const verification = await VerificationCodeModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
    });
    // Send verification email to the user with the code
    const verificationUrl = `${config.DOMAIN}/confirm-account?code=${verification.code}`;
    await sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verificationUrl),
    });
    return {
      user: newUser,
    };
  }

  public async login(loginData: ILogin) {
    // Login logic goes here
    const { email, password, userAgent } = loginData;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new BadGatewayException('Invalid Email or Password', ErrorCode.AUTH_USER_NOT_FOUND);
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new BadGatewayException('Invalid Email or Password', ErrorCode.AUTH_USER_NOT_FOUND);
    }

    // Check if user enable 2FA return user = null-> user will not be signed in
    const session = await sessionModel.create({
      userId: user._id,
      sessionId: user._id,
      userAgent,

      expiresAt: fortyFiveMinutesFromNow(),
    });

    const generateAccessToken = (userId: string, sessionId: string): string => {
      const payload = {
        userId,
        sessionId,
        audience: ['user'], // Add any custom claims here
      };

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT secret is not defined');
      }
      const options = {
        expiresIn: 3600, // Token expiration time in seconds (1 hour)
      };

      return jwt.sign(payload, secret as jwt.Secret, options);
    };

    // Example usage
    // const userId = String(user._id);
    // const sessionId = String(session._id);
    // const accessToken = generateAccessToken(userId, sessionId);
    const accessToken = signJwtToken({
      userId: user._id,
      sessionId: session._id,
    });

    // console.log('Access Token:', accessToken);

    // Refresh Token

    const generateRefreshToken = (sessionId: string): string => {
      const payload = {
        sessionId,
        audience: ['user'], // Add any custom claims here
      };

      const secret = process.env.JWT_REFRESH_SECRET;
      if (!secret) {
        throw new Error('JWT refresh secret is not defined');
      }
      const options = {
        expiresIn: 1000 * 60 * 60 * 24 * 30, // 30 days, // Token expiration time in seconds (30 days)
      };

      return jwt.sign(payload, secret, options);
    };
    // Example usage
    // const refreshToken = generateRefreshToken(sessionId);
    const refreshToken = signJwtToken(
      {
        sessionId: session._id,
      },
      refreshTokenSignOptions
    );

    // console.log('Refresh Token:', refreshToken);

    return {
      user,
      accessToken,
      refreshToken,
      mfaRequired: false, // Set to true if MFA is required
    };
  }

  // Refresh Token

  public async refreshToken(refreshToken: string) {
    const { payload } = verifyJwtToken<RefreshTPayload>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });

    if (!payload) {
      throw new UnAuthorizedException('Invalid refresh token');
    }

    const session = await SessionModel.findById(payload.sessionId);
    const now = Date.now();

    if (!session) {
      throw new UnAuthorizedException('Session does not exist');
    }

    if (session.expiredAt.getTime() <= now) {
      throw new UnAuthorizedException('Session expired');
    }

    const sessionRequireRefresh = session.expiredAt.getTime() - now <= ONE_DAY_IN_MS;

    if (sessionRequireRefresh) {
      session.expiredAt = calculateExpirationDate(config.JWT.REFRESH_TOKEN_EXPIRES_IN);
      await session.save();
    }

    const newRefreshToken = sessionRequireRefresh
      ? signJwtToken(
          {
            sessionId: session._id,
          },
          refreshTokenSignOptions
        )
      : undefined;

    const accessToken = signJwtToken({
      userId: session.userId,
      sessionId: session._id,
    });

    return {
      accessToken,
      newRefreshToken,
    };
  }

  // Verify email service

  public async verifyEmail(code: string) {
    const validCode = await VerificationCodeModel.findOne({
      code: code,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      validCode.userId,
      {
        isEmailVerified: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new BadRequestException('Unable to verify email address', ErrorCode.VALIDATION_ERROR);
    }

    await validCode.deleteOne();
    return {
      user: updatedUser,
    };
  }

  // Forgot password service
  public async forgotPassword(email: string) {
    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    //check mail rate limit is 2 emails per 3 or 10 min
    const timeAgo = threeMinutesAgo();
    const maxAttempts = 2;

    const count = await VerificationCodeModel.countDocuments({
      userId: user._id,
      type: VerificationEnum.PASSWORD_RESET,
      createdAt: { $gt: timeAgo },
    });

    if (count >= maxAttempts) {
      throw new HttpException(
        'Too many request, try again later',
        HTTPSTATUS.TOO_MANY_REQUESTS,
        ErrorCode.AUTH_TOO_MANY_ATTEMPTS
      );
    }
  }
}

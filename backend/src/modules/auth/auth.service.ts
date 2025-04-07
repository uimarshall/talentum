import jwt from 'jsonwebtoken';
import sessionModel from '../../database/models/session.model';
import UserModel from '../../database/models/user.model';
import VerificationCodeModel from '../../database/models/verification.model';
import { ErrorCode } from '../../shared/enums/errorCode.enum';
import { VerificationEnum } from '../../shared/enums/verificationCode.enum';
import { ILogin, IRegister } from '../../shared/interface/auth.interface';
import { BadGatewayException, BadRequestException, EmailAlreadyExistsException } from '../../shared/utils/catchErrors';
import { fortyFiveMinutesFromNow } from '../../shared/utils/dateTime';
import { config } from '../../config/app.config';

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
    const verificationCode = await VerificationCodeModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
    });
    // Send verification email to the user with the code
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

      const secret = config.JWT.SECRET; // Replace with your actual secret
      const options = {
        expiresIn: 3600, // Token expiration time in seconds (1 hour)
      };

      return jwt.sign(payload, secret, options);
    };

    // Example usage
    const userId = String(user._id);
    const sessionId = String(session._id);
    const accessToken = generateAccessToken(userId, sessionId);

    // console.log('Access Token:', accessToken);

    // Refresh Token

    const generateRefreshToken = (sessionId: string): string => {
      const payload = {
        sessionId,
        audience: ['user'], // Add any custom claims here
      };

      const secret = config.JWT.REFRESH_SECRET; // Replace with your actual secret
      const options = {
        expiresIn: 1000 * 60 * 60 * 24 * 30, // 7 days, // Token expiration time in seconds (30 days)
      };

      return jwt.sign(payload, secret, options);
    };
    // Example usage
    const refreshToken = generateRefreshToken(sessionId);
    // console.log('Refresh Token:', refreshToken);

    // const accessToken = jwt.sign({ userId: user._id, sessionId: session._id, audience: 'user' }, config.JWT.SECRET, {
    //   expiresIn: config.JWT.EXPIRES_IN,
    // });

    // const refreshToken = jwt.sign({ sessionId: session._id, audience: ['user'] }, config.JWT.REFRESH_SECRET, {
    //   expiresIn: config.JWT.REFRESH_TOKEN_EXPIRES_IN,
    // });
    return {
      user,
      accessToken,
      refreshToken,
      mfaRequired: false, // Set to true if MFA is required
    };
  }
}

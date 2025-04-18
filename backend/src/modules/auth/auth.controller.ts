import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { asyncErrorHandler } from '../../middlewares/asyncErrorHandler';
import { AuthService } from './auth.service';
import { HTTPSTATUS } from '../../config/http.config';
import {
  emailSchema,
  loginSchema,
  registerSchema,
  verificationEmailSchema,
} from '../../shared/validators/auth.validator';
import {
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthenticationCookies,
} from '../../shared/utils/cookie';
import { UnAuthorizedException } from '../../shared/utils/catchErrors';

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // Register user
  // @desc Register user
  // @route POST /api/auth/register
  // @access Public

  public register = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userAgent = req.headers['user-agent']; // The user agent is a string that identifies the client software making the request.
    const ipAddress = req.ip; // The IP address of the client making the request.

    const body = registerSchema.parse({ ...req.body }); // Validate the request body against the schema.
    const { user } = await this.authService.register(body); // Call the register method of the AuthService with the validated body.
    return res.status(HTTPSTATUS.CREATED).json({
      message: 'User registered successfully!, please check your email to verify your account',
      data: user, // Return the user data in the response.
    });
  });

  // Login user
  // @desc Login user
  // @route POST /api/auth/login
  // @access Public
  public login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userAgent = req.headers['user-agent'];
    // const ipAddress = req.ip;
    const body = loginSchema.parse({ ...req.body, userAgent }); // Validate the request body against the schema.
    const { user, accessToken, refreshToken, mfaRequired } = await this.authService.login(body); // Call the login method of the AuthService with the validated body.

    return setAuthenticationCookies({
      res,
      accessToken,
      refreshToken,
    })
      .status(HTTPSTATUS.OK)
      .json({
        message: 'User logged in successfully',
        user,
        mfaRequired,
      });
  });

  // @desc Refresh token
  // @route POST /api/auth/refresh-token
  // @access Public
  public refreshToken = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (!refreshToken) {
      throw new UnAuthorizedException('Missing Refresh Token');
    }

    const { accessToken, newRefreshToken } = await this.authService.refreshToken(refreshToken);

    if (newRefreshToken) {
      res.cookie('refreshToken', newRefreshToken, getRefreshTokenCookieOptions());
    }

    return res.status(HTTPSTATUS.OK).cookie('accessToken', accessToken, getAccessTokenCookieOptions()).json({
      message: 'Refresh access token successfully',
    });
  });

  // Verify user email
  // @desc Verify user email
  // @route GET /api/auth/verify-email
  // @access Public
  public verifyEmail = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { code } = verificationEmailSchema.parse(req.body);
    await this.authService.verifyEmail(code);

    return res.status(HTTPSTATUS.OK).json({
      message: 'Email verified successfully',
    });
  });

  // Forgot password

  // @desc Forgot password
  // @route POST /api/auth/forgot-password
  // @access Public
  public forgotPassword = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const email = emailSchema.parse(req.body.email);
    await this.authService.forgotPassword(email);

    return res.status(HTTPSTATUS.OK).json({
      message: 'Password reset email sent',
    });
  });
}

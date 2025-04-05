import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { asyncErrorHandler } from '../../middlewares/asyncErrorHandler';
import { AuthService } from './auth.service';
import { HTTPSTATUS } from '../../config/http.config';
import { registerSchema } from '../../shared/validators/auth.validator';

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

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
}

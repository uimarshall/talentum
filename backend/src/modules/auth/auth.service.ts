import UserModel from '../../database/models/user.model';
import VerificationCodeModel from '../../database/models/verification.model';
import { ErrorCode } from '../../shared/enums/errorCode.enum';
import { VerificationEnum } from '../../shared/enums/verificationCode.enum';
import { IRegister } from '../../shared/interface/auth.interface';
import { EmailAlreadyExistsException } from '../../shared/utils/catchErrors';
import { fortyFiveMinutesFromNow } from '../../shared/utils/dateTime';

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
}

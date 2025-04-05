import { HTTPSTATUS, HttpStatusCode } from '../../config/http.config';
import { ErrorCode } from '../enums/errorCode.enum';
import { AppErrorHandler } from './appErrorHandler';

export class NotFoundException extends AppErrorHandler {
  constructor(message = 'Resource Not Found', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode || ErrorCode.RESOURCE_NOT_FOUND);
  }
}

export class HttpException extends AppErrorHandler {
  constructor(message = 'Http Exception Error', statusCode: HttpStatusCode, errorCode?: ErrorCode) {
    super(message, statusCode, errorCode);
  }
}

export class UnAuthorizedException extends AppErrorHandler {
  constructor(message = 'Unauthorized Access', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode || ErrorCode.ACCESS_UNAUTHORIZED);
  }
}
export class ForbiddenException extends AppErrorHandler {
  constructor(message = 'Forbidden Access', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.FORBIDDEN, errorCode || ErrorCode.ACCESS_FORBIDDEN);
  }
}
export class BadRequestException extends AppErrorHandler {
  constructor(message = 'Bad Request', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.BAD_REQUEST);
  }
}
export class ConflictException extends AppErrorHandler {
  constructor(message = 'Conflict', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.CONFLICT, errorCode || ErrorCode.RESOURCE_ALREADY_EXISTS);
  }
}
export class InternalServerErrorException extends AppErrorHandler {
  constructor(message = 'Internal Server Error', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
export class NotImplementedException extends AppErrorHandler {
  constructor(message = 'Not Implemented', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.NOT_IMPLEMENTED, errorCode || ErrorCode.NOT_IMPLEMENTED);
  }
}
export class TooManyRequestsException extends AppErrorHandler {
  constructor(message = 'Too Many Requests', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.TOO_MANY_REQUESTS, errorCode || ErrorCode.AUTH_TOO_MANY_REQUEST);
  }
}
export class ServiceUnavailableException extends AppErrorHandler {
  constructor(message = 'Service Unavailable', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.SERVICE_UNAVAILABLE, errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
export class GatewayTimeoutException extends AppErrorHandler {
  constructor(message = 'Gateway Timeout', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.GATEWAY_TIMEOUT, errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
export class BadGatewayException extends AppErrorHandler {
  constructor(message = 'Bad Gateway', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_GATEWAY, errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
export class NotAcceptableException extends AppErrorHandler {
  constructor(message = 'Not Acceptable', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.NOT_ACCEPTABLE, errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
export class RequestTimeoutException extends AppErrorHandler {
  constructor(message = 'Request Timeout', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.REQUEST_TIMEOUT, errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
export class UnprocessableEntityException extends AppErrorHandler {
  constructor(message = 'Unprocessable Entity', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.UNPROCESSABLE_ENTITY, errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
  }
}

export class MethodNotAllowedException extends AppErrorHandler {
  constructor(message = 'Method Not Allowed', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.METHOD_NOT_ALLOWED, errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
export class ResourceAlreadyExistsException extends AppErrorHandler {
  constructor(message = 'Resource Already Exists', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.CONFLICT, errorCode || ErrorCode.RESOURCE_ALREADY_EXISTS);
  }
}
export class ResourceNotFoundException extends AppErrorHandler {
  constructor(message = 'Resource Not Found', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode || ErrorCode.RESOURCE_NOT_FOUND);
  }
}
export class ValidationErrorException extends AppErrorHandler {
  constructor(message = 'Validation Error', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.VALIDATION_ERROR);
  }
}
export class UnexpectedErrorException extends AppErrorHandler {
  constructor(message = 'Unexpected Error', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode || ErrorCode.UNEXPECTED_ERROR);
  }
}
export class VerificationErrorException extends AppErrorHandler {
  constructor(message = 'Verification Error', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode || ErrorCode.VERIFICATION_ERROR);
  }
}
export class EmailAlreadyExistsException extends AppErrorHandler {
  constructor(message = 'Email Already Exists', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.AUTH_EMAIL_ALREADY_EXIST);
  }
}
export class InvalidTokenException extends AppErrorHandler {
  constructor(message = 'Invalid Token', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.AUTH_INVALID_TOKEN);
  }
}
export class UserNotLoginException extends AppErrorHandler {
  constructor(message = 'User Not Logged In', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode || ErrorCode.AUTH_USER_NOT_LOGIN);
  }
}
export class UserNotFoundException extends AppErrorHandler {
  constructor(message = 'User Not Found', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode || ErrorCode.AUTH_USER_NOT_FOUND);
  }
}
export class UserNotActiveException extends AppErrorHandler {
  constructor(message = 'User Not Active', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode || ErrorCode.AUTH_USER_NOT_ACTIVE);
  }
}
export class UserAlreadyActiveException extends AppErrorHandler {
  constructor(message = 'User Already Active', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.AUTH_USER_ALREADY_ACTIVE);
  }
}
export class UserNotVerifiedException extends AppErrorHandler {
  constructor(message = 'User Not Verified', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode || ErrorCode.AUTH_USER_NOT_VERIFIED);
  }
}
export class UserAlreadyVerifiedException extends AppErrorHandler {
  constructor(message = 'User Already Verified', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.AUTH_USER_ALREADY_VERIFIED);
  }
}
export class InvalidEmailException extends AppErrorHandler {
  constructor(message = 'Invalid Email', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.AUTH_INVALID_EMAIL);
  }
}
export class InvalidCredentialsException extends AppErrorHandler {
  constructor(message = 'Invalid Credentials', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode || ErrorCode.AUTH_INVALID_CREDENTIALS);
  }
}
export class PasswordMismatchException extends AppErrorHandler {
  constructor(message = 'Password Mismatch', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.AUTH_PASSWORD_MISMATCH);
  }
}
export class InvalidCurrentPasswordException extends AppErrorHandler {
  constructor(message = 'Invalid Current Password', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.AUTH_INVALID_CURRENT_PASSWORD);
  }
}
export class TokenNotFoundException extends AppErrorHandler {
  constructor(message = 'Token Not Found', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode || ErrorCode.AUTH_TOKEN_NOT_FOUND);
  }
}

export class UnauthorizedAccessException extends AppErrorHandler {
  constructor(message = 'Unauthorized Access', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode || ErrorCode.AUTH_UNAUTHORIZED_ACCESS);
  }
}

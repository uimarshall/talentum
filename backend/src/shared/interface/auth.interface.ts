export interface IUser {
  name: string;

  email: string;
  password: string;

  confirmPassword: string;
  userAgrent?: string;
  ipAddress?: string;
}
export interface ILogin {
  email: string;
  password: string;
  userAgent?: string;
  ipAddress?: string;
}
export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
  ipAddress?: string;
}

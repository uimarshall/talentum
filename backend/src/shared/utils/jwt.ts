import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { SessionDocument } from '../../database/models/session.model';
import { UserDocument } from '../../database/models/user.model';
import { config } from '../../config/app.config';

export type AccessTPayload = {
  userId: UserDocument['_id'];
  sessionId: SessionDocument['_id'];
};

export type RefreshTPayload = {
  sessionId: SessionDocument['_id'];
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ['user'],
};

export const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: parseInt(config.JWT.EXPIRES_IN, 10),
  secret: process.env.JWT_SECRET || 'default-secret',
};

export const refreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: parseInt(config.JWT.REFRESH_TOKEN_EXPIRES_IN, 10),
  secret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
};

export const signJwtToken = (payload: AccessTPayload | RefreshTPayload, options?: SignOptsAndSecret) => {
  const { secret, ...opts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });
};

export const verifyJwtToken = <TPayload extends object = AccessTPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  try {
    const { secret = process.env.JWT_SECRET, ...opts } = options || {};
    if (!secret) {
      throw new Error('JWT secret is not defined');
    }
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...opts,
    }) as unknown as TPayload;
    return { payload };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};

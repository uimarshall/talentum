import { getEnv } from '../shared/utils/getEnv';

const appConfig = () => ({
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  DOMAIN: getEnv('DOMAIN', 'localhost'),
  PORT: getEnv('PORT', '8000'),
  CLIENT_URL: getEnv('CLIENT_URL', 'http://localhost:3000'),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  MONGO_URI: getEnv('MONGO_URI', 'mongodb://localhost:27017/talentum'),
  MONGO_URI_LOCAL: getEnv('MONGO_URI_LOCAL', 'mongodb://localhost:27017/talentum'),
  JWT: {
    // SECRET: getEnv('JWT_SECRET'),
    EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '15m'),
    // REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
    REFRESH_TOKEN_EXPIRES_IN: getEnv('JWT_REFRESH_EXPIRES_IN', '30d'),
    // RESEND_API_KEY: getEnv('RESEND_API_KEY'),
    // EMAIL_SENDER: getEnv('EMAIL_SENDER'),
  },
});

export const config = appConfig();

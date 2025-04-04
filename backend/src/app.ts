import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
import { BadRequestException } from './shared/utils/catchErrors';
import { ErrorCode } from './shared/enums/errorCode.enum';
import { asyncErrorHandler } from './middlewares/asyncErrorHandler';

// import env from './utils/validateEnv';

// Load the environment variables
dotenv.config({ path: 'backend/src/config/.env' });

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

// Route middleware

// Custom Error Middleware to handle error
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Holla World!');
});
app.get('/greet', (req: Request, res: Response, next: NextFunction) => {
  // Simulate an async operation
  throw new BadRequestException('Bad requset!', ErrorCode.RESOURCE_NOT_FOUND);
  res.send('Hello Guys');
});
app.get('/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

export default app;

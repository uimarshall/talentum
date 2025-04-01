import express, { type Express, type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

// import env from './utils/validateEnv';

// Load the environment variables
dotenv.config({ path: 'backend/src/config/.env' });

const app: Express = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors()); // Make sure you Enable CORS correctly, or you will get CORS errors.

// Route middleware

// Custom Error Middleware to handle error

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Configurations + Linting + found solution, better');
});
app.get('/greet', (req: Request, res: Response) => {
  res.send('Hello Guys');
});
app.get('/time', (req: Request, res: Response) => {
  res.json({ time: new Date().toISOString() });
});

export default app;

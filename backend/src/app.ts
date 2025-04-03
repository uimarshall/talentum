import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

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

app.get('/', (req, res) => {
  res.send('Holla World!');
});
app.get('/greet', (req, res) => {
  res.send('Hello Guys');
});
app.get('/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

export default app;

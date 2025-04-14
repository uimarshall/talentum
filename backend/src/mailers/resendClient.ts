import { Resend } from 'resend';
import { config } from '../config/app.config';

export const resend = new Resend(process.env.RESEND_API_KEY);

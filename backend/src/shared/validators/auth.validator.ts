import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'Email must not be empty' })
  .max(25, { message: 'Email must not exceed 25 characters' })
  .email({ message: 'Invalid email address' });
export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(255, { message: 'Password must not exceed 255 characters' });
export const verificationCodeSchema = z.string().trim().min(1).max(25);

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Name is required' })
      .max(255, { message: 'Name must not exceed 255 characters' }),
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email must not be empty' })
      .max(25, { message: 'Email must not exceed 25 characters' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(255, { message: 'Password must not exceed 255 characters' }),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(255, { message: 'Password must not exceed 255 characters' }),
    // userAgent: z.string().optional(),
    // ipAddress: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // error will be reported at 'confirmPassword' field
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email must not be empty' })
    .max(25, { message: 'Email must not exceed 25 characters' })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  userAgent: z.string().optional(),
});

// Verification schema

export const verificationEmailSchema = z.object({
  code: verificationCodeSchema,
});

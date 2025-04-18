import { Router } from 'express';
import { authController } from './auth.module';

const router = Router();
router.post('/register', authController.register);

// Verify the user email
router.post('/verify-email', authController.verifyEmail);

router.post('/login', authController.login);
router.get('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);

export default router;

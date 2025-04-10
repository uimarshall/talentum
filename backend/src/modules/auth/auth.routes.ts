import { Router } from 'express';
import { authController } from './auth.module';

const router = Router();
router.post('/register', authController.register);

router.post('/login', authController.login);
router.get('/refresh-token', authController.refreshToken);

export default router;

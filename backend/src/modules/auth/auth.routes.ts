import { Router } from 'express';
import { authController } from './auth.module';

const router = Router();
router.post('/register', authController.register);

export default router;

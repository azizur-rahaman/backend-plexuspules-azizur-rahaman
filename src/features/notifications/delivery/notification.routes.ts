import { Router } from 'express';
import { NotificationController } from './notification.controller';
import { authMiddleware } from '../../../core/middlewares/auth.middleware';

const router = Router();

// Protect token registration with auth
router.post('/register-token', authMiddleware, NotificationController.registerToken);

export default router;

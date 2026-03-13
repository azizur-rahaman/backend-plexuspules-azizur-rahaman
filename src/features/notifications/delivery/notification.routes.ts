import { Router } from 'express';
import { NotificationController } from './notification.controller';
import { authMiddleware } from '../../../core/middlewares/auth.middleware';

const router = Router();

// Routes protected with auth
router.use(authMiddleware);

router.post('/register-token', NotificationController.registerToken);
router.post('/send-test', NotificationController.sendTestNotification);
router.get('/settings', NotificationController.getSettings);
router.post('/settings', NotificationController.updateSettings);

export default router;

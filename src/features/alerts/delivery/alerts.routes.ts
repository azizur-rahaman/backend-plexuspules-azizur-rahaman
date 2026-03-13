import { Router } from 'express';
import { AlertsController } from './alerts.controller';
import { authMiddleware } from '../../../core/middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, AlertsController.getAlerts);

export default router;

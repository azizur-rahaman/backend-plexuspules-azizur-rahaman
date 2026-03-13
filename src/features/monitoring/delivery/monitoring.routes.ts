import { Router } from 'express';
import { MonitoringController } from './monitoring.controller';
import { authMiddleware } from '../../../core/middlewares/auth.middleware';

const router = Router();

// Protect all monitoring routes
router.use(authMiddleware);

router.get('/summary', MonitoringController.getSummary);
router.get('/devices', MonitoringController.getDevices);
router.get('/devices/:id', MonitoringController.getDeviceDetails);

export default router;

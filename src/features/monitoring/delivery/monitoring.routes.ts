import { Router } from 'express';
import { MonitoringController } from './monitoring.controller';

const router = Router();

router.get('/summary', MonitoringController.getSummary);
router.get('/devices', MonitoringController.getDevices);
router.get('/devices/:id', MonitoringController.getDeviceDetails);

export default router;

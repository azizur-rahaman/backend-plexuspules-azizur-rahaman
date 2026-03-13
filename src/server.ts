import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(cors());

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use(morgan('dev'));

// Routes
import authRoutes from './features/auth/delivery/auth.routes';
import dashboardRoutes from './features/dashboard/delivery/dashboard.routes';
import devicesRoutes from './features/devices/delivery/devices.routes';
import performanceRoutes from './features/performance/delivery/performance.routes';
import alertsRoutes from './features/alerts/delivery/alerts.routes';
import notificationRoutes from './features/notifications/delivery/notification.routes';
import { initializeFirebase } from './core/config/firebase.config';

// Initialize Firebase Admin
initializeFirebase();

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/devices', devicesRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/notifications', notificationRoutes);

// Global Error Handler (must be registered after all routes)
import { globalErrorHandler } from './core/middlewares/error.middleware';
app.use(globalErrorHandler);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Plexus Cloud Backend is running' });
});

// Simulated Background Alerts
import { notificationRepository } from './features/notifications/data/fcm-notification.repository';
const startAlertSimulation = () => {
  console.log('[simulator]: Starting alert simulation...');
  setInterval(async () => {
    const tokens = await notificationRepository.getAllRegisteredTokens();
    if (tokens.length > 0) {
      console.log('[simulator]: Simulating critical alert push...');
      const randomAlerts = [
        { title: 'CRITICAL: Core Switch Down', body: 'Core-Switch-01 is unreachable. Network heartbeat failed.' },
        { title: 'ALERT: High Traffic Load', body: 'Edge-Router-05: Traffic exceeds 90% capacity.' },
        { title: 'CRITICAL: Security Breach', body: 'Unauthorized access attempt detected in Server Room Alpha.' }
      ];
      const alert = randomAlerts[Math.floor(Math.random() * randomAlerts.length)];
      
      tokens.forEach(token => {
        notificationRepository.sendPushNotification(token, alert.title, alert.body);
      });
    }
  }, 60000); // Simulate every minute
};

// App Entry Point
const startServer = () => {
  try {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
      startAlertSimulation();
    });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
};

startServer();

export default app;

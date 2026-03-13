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
import notificationRoutes from './features/notifications/delivery/notification.routes';
import { initializeFirebase } from './core/config/firebase.config';

// Initialize Firebase Admin
initializeFirebase();

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/devices', devicesRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/notifications', notificationRoutes);

// Global Error Handler (must be registered after all routes)
import { globalErrorHandler } from './core/middlewares/error.middleware';
app.use(globalErrorHandler);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Plexus Cloud Backend is running' });
});

// App Entry Point
const startServer = () => {
  try {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
};

startServer();

export default app;

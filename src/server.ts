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
app.use('/api/auth', authRoutes);

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

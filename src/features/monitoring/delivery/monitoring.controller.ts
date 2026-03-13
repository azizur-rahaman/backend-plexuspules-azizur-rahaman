import { Request, Response } from 'express';
import { GetDevicesUseCase } from '../domain/get-devices.usecase';
import { GetDashboardMetricsUseCase } from '../domain/get-dashboard-metrics.usecase';
import { MockMonitoringRepository } from '../data/mock-monitoring.repository';

const monitoringRepository = new MockMonitoringRepository();
const getDevicesUseCase = new GetDevicesUseCase(monitoringRepository);
const getDashboardMetricsUseCase = new GetDashboardMetricsUseCase(monitoringRepository);

export class MonitoringController {
  static async getSummary(req: Request, res: Response) {
    try {
      const metrics = await getDashboardMetricsUseCase.execute();
      return res.status(200).json(metrics);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getDevices(req: Request, res: Response) {
    try {
      const { search, status } = req.query;
      const devices = await getDevicesUseCase.execute(search as string, status as string);
      return res.status(200).json(devices);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getDeviceDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const device = await monitoringRepository.getDeviceById(id);
      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }
      return res.status(200).json(device);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

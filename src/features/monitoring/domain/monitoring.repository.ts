import { Device, DeviceDetails } from './device.entity';
import { DashboardMetrics } from './dashboard.entity';

export interface IMonitoringRepository {
  getDevices(search?: string, status?: string): Promise<Device[]>;
  getDeviceById(id: string): Promise<DeviceDetails | null>;
  getDashboardMetrics(): Promise<DashboardMetrics>;
}

import { Device, DeviceDetails } from './device.entity';

export interface IDevicesRepository {
  getDevices(search?: string, status?: string): Promise<Device[]>;
  getDeviceById(id: string): Promise<DeviceDetails | null>;
}

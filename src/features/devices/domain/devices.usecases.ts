import { IDevicesRepository } from './devices.repository';
import { Device, DeviceDetails } from './device.entity';

export class GetDevicesUseCase {
  constructor(private devicesRepository: IDevicesRepository) {}
  async execute(search?: string, status?: string): Promise<Device[]> {
    return this.devicesRepository.getDevices(search, status);
  }
}

export class GetDeviceDetailsUseCase {
  constructor(private devicesRepository: IDevicesRepository) {}
  async execute(id: string): Promise<DeviceDetails | null> {
    return this.devicesRepository.getDeviceById(id);
  }
}

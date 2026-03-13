import { IMonitoringRepository } from './monitoring.repository';
import { Device } from './device.entity';

export class GetDevicesUseCase {
  constructor(private monitoringRepository: IMonitoringRepository) {}

  async execute(search?: string, status?: string): Promise<Device[]> {
    return this.monitoringRepository.getDevices(search, status);
  }
}

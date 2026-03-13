import { IMonitoringRepository } from './monitoring.repository';
import { Device } from './device.entity';

export class GetDevicesUseCase {
  constructor(private monitoringRepository: IMonitoringRepository) {}

  async execute(): Promise<Device[]> {
    return this.monitoringRepository.getDevices();
  }
}

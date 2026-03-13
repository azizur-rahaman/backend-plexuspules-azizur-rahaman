import { IMonitoringRepository } from './monitoring.repository';
import { DashboardMetrics } from './dashboard.entity';

export class GetDashboardMetricsUseCase {
  constructor(private monitoringRepository: IMonitoringRepository) {}

  async execute(): Promise<DashboardMetrics> {
    return this.monitoringRepository.getDashboardMetrics();
  }
}

import { IAlertsRepository } from './alerts.repository';
import { Alert } from './alert.entity';

export class GetAlertsUseCase {
  constructor(private alertsRepository: IAlertsRepository) {}

  async execute(): Promise<Alert[]> {
    return await this.alertsRepository.getAlerts();
  }
}

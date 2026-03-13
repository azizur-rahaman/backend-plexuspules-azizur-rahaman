import { Alert } from './alert.entity';

export interface IAlertsRepository {
  getAlerts(): Promise<Alert[]>;
}

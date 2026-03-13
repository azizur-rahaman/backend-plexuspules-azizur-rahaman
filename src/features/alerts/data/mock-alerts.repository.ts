import { Alert, AlertSeverity } from '../domain/alert.entity';
import { IAlertsRepository } from '../domain/alerts.repository';

export class MockAlertsRepository implements IAlertsRepository {
  private alerts: Alert[] = [
    {
      id: '1',
      title: 'Core-Switch-01',
      description: 'High Latency Detected on Uplink Port 48',
      severity: AlertSeverity.CRITICAL,
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: '2',
      title: 'Edge-Router-05',
      description: 'BGP Session Dropped with AS64512',
      severity: AlertSeverity.ALERT,
      timestamp: new Date(Date.now() - 900000).toISOString(),
    },
    {
      id: '3',
      title: 'Storage-Node-Alpha',
      description: 'Disk utilization exceeds 85% threshold',
      severity: AlertSeverity.WARNING,
      timestamp: new Date(Date.now() - 2700000).toISOString(),
    },
    {
      id: '4',
      title: 'VPN-Gateway-Secondary',
      description: 'Scheduled maintenance window starting soon',
      severity: AlertSeverity.INFO,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: '5',
      title: 'Wifi-AP-Lobby-02',
      description: 'Unusually high client density detected',
      severity: AlertSeverity.ALERT,
      timestamp: new Date(Date.now() - 10800000).toISOString(),
    },
  ];

  async getAlerts(): Promise<Alert[]> {
    return this.alerts;
  }
}

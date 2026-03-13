export enum AlertSeverity {
  CRITICAL = 'critical',
  ALERT = 'alert',
  WARNING = 'warning',
  INFO = 'info'
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  timestamp: string;
}

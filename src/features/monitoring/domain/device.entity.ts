export type DeviceStatus = 'online' | 'offline';

export interface Device {
  id: string;
  name: string;
  ipAddress: string;
  location: string;
  status: DeviceStatus;
  lastPing: Date;
}

export interface DeviceDetails extends Device {
  cpuUsage: number;
  memoryUsage: number;
  performanceHistory: number[];
}

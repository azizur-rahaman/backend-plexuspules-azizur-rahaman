export interface Device {
  id: string;
  name: string;
  ipAddress: string;
  location: string;
  status: 'online' | 'offline';
  lastPing: Date;
  cpuUsage: number;
  memoryUsage: number;
}

export interface DeviceDetails extends Device {
  performanceHistory: number[];
}

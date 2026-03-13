import { Request, Response } from 'express';
import { GetDevicesUseCase, GetDeviceDetailsUseCase } from '../domain/devices.usecases';
import { MockDevicesRepository } from '../data/mock-devices.repository';

const devicesRepository = new MockDevicesRepository();
const getDevicesUseCase = new GetDevicesUseCase(devicesRepository);
const getDeviceDetailsUseCase = new GetDeviceDetailsUseCase(devicesRepository);

export class DevicesController {
  static async getDevices(req: Request, res: Response) {
    try {
      const { search, status } = req.query;
      const devices = await getDevicesUseCase.execute(search as string, status as string);
      return res.status(200).json(devices);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getDeviceDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const device = await getDeviceDetailsUseCase.execute(id);
      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }
      return res.status(200).json(device);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

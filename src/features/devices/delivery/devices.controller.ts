import { Request, Response } from 'express';
import { GetDevicesUseCase, GetDeviceDetailsUseCase, UpdateDeviceStatusUseCase } from '../domain/devices.usecases';
import { MockDevicesRepository } from '../data/mock-devices.repository';
import { notificationRepository } from '../../notifications/data/fcm-notification.repository';

const devicesRepository = new MockDevicesRepository();
const getDevicesUseCase = new GetDevicesUseCase(devicesRepository);
const getDeviceDetailsUseCase = new GetDeviceDetailsUseCase(devicesRepository);
const updateDeviceStatusUseCase = new UpdateDeviceStatusUseCase(devicesRepository);

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

  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || (status !== 'online' && status !== 'offline')) {
        return res.status(400).json({ message: 'Valid status (online/offline) is required' });
      }

      const device = await updateDeviceStatusUseCase.execute(id, status);
      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      // Trigger notification
      const tokens = await notificationRepository.getAllRegisteredTokens();
      if (tokens.length > 0) {
        const title = `Device Status Changed`;
        const body = `Device ${device.name} is now ${status}`;
        
        await Promise.all(
          tokens.map(token => 
            notificationRepository.sendPushNotification(token, title, body, {
              deviceId: device.id,
              status: device.status
            })
          )
        );
      }

      return res.status(200).json(device);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

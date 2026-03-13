import * as admin from 'firebase-admin';
import { INotificationRepository } from '../domain/notification.repository';

// In-memory storage for tokens and settings for now
const userTokens: Map<string, Set<string>> = new Map();
const userSettings: Map<string, any> = new Map();

export class FcmNotificationRepository implements INotificationRepository {
  async sendPushNotification(
    token: string,
    title: string,
    body: string,
    data?: Record<string, string>
  ): Promise<void> {
    const message = {
      notification: { title, body },
      token,
      data: data || {},
    };

    try {
      await admin.messaging().send(message);
      console.log(`Notification sent successfully to token: ${token}`);
    } catch (error) {
      console.error(`Failed to send notification to token: ${token}`, error);
    }
  }

  async saveToken(userId: string, token: string): Promise<void> {
    if (!userTokens.has(userId)) {
      userTokens.set(userId, new Set());
    }
    userTokens.get(userId)?.add(token);
    console.log(`FCM Token registered for user ${userId}`);
  }

  async getTokensByUserId(userId: string): Promise<string[]> {
    const tokens = userTokens.get(userId);
    return tokens ? Array.from(tokens) : [];
  }

  async getAllRegisteredTokens(): Promise<string[]> {
    const allTokens: string[] = [];
    userTokens.forEach(tokens => {
      allTokens.push(...Array.from(tokens));
    });
    return allTokens;
  }

  async getSettings(userId: string): Promise<any> {
    if (!userSettings.has(userId)) {
      // Default settings
      return {
        pushEnabled: true,
        emailEnabled: true,
        alertThreshold: 80,
      };
    }
    return userSettings.get(userId);
  }

  async updateSettings(userId: string, settings: any): Promise<void> {
    userSettings.set(userId, { ...await this.getSettings(userId), ...settings });
    console.log(`Notification settings updated for user ${userId}`);
  }
}

export const notificationRepository = new FcmNotificationRepository();

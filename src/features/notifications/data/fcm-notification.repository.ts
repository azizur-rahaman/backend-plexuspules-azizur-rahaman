import * as admin from 'firebase-admin';
import { INotificationRepository } from '../domain/notification.repository';

// In-memory storage for tokens for now, as we don't have a database
const userTokens: Map<string, Set<string>> = new Map();

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

  // Helper for mock trigger to send to all registered tokens
  async getAllRegisteredTokens(): Promise<string[]> {
    const allTokens: string[] = [];
    userTokens.forEach(tokens => {
      allTokens.push(...Array.from(tokens));
    });
    return allTokens;
  }
}

export const notificationRepository = new FcmNotificationRepository();

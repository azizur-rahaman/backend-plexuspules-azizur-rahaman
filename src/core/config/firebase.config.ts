import * as admin from 'firebase-admin';
import path from 'path';

export const initializeFirebase = () => {
  const serviceAccountPath = path.resolve(
    process.cwd(),
    'plexus-cloud-fcm-firebase-adminsdk-fbsvc-d4d97a4b0d.json'
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });

  console.log('Firebase Admin SDK initialized successfully');
};

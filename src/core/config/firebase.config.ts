import * as admin from 'firebase-admin';

export const initializeFirebase = () => {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (!serviceAccountJson) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
  }

  const serviceAccount = JSON.parse(serviceAccountJson);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('Firebase Admin SDK initialized successfully');
};

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let _app: FirebaseApp | null = null;

export function getClientApp(): FirebaseApp {
  if (_app) return _app;
  try {
    _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    return _app;
  } catch {
    // If config is invalid, throw to be handled by callers (or mock mode)
    throw new Error('Firebase client not configured');
  }
}

export function getClientAuth() {
  return getAuth(getClientApp());
}

export function getClientDb() {
  return getFirestore(getClientApp());
}

export function getClientStorage() {
  return getStorage(getClientApp());
}

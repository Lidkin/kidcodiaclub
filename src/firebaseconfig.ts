import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_APP_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_APP_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_APP_FIREBASE_appId,
  measurementId: import.meta.env.VITE_APP_FIREBASE_measurementId,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const analytics = getAnalytics(firebaseApp);
logEvent(analytics, 'screen_view')

export { storage, analytics };
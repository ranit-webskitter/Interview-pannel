

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Define the shape of the Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  projectId: string;
  storageBucket: string;
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyA7KnHOccCwFCwo5fpk4GcH-EQuhkcERZg",
  projectId: "wts-interview-panel-ui",
  storageBucket: "gs://wts-interview-panel-ui.appspot.com",
};

// Initialize Firebase if it hasn’t been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

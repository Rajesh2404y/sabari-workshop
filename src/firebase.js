import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth }      from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage }   from "firebase/storage";

const {
  REACT_APP_FIREBASE_API_KEY:            apiKey,
  REACT_APP_FIREBASE_AUTH_DOMAIN:        authDomain,
  REACT_APP_FIREBASE_DATABASE_URL:       databaseURL,
  REACT_APP_FIREBASE_PROJECT_ID:         projectId,
  REACT_APP_FIREBASE_STORAGE_BUCKET:     storageBucket,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID:messagingSenderId,
  REACT_APP_FIREBASE_APP_ID:             appId,
  REACT_APP_FIREBASE_MEASUREMENT_ID:     measurementId,
} = process.env;

// Check if real Firebase credentials are provided
export const isFirebaseConfigured =
  apiKey && !apiKey.includes("your_") &&
  projectId && !projectId.includes("your_");

export const isFirebaseStorageConfigured =
  isFirebaseConfigured &&
  storageBucket && !storageBucket.includes("your_");

let app, auth, db, storage, analytics = null;

if (isFirebaseConfigured) {
  // Only initialise once (handles React hot-reload)
  app  = getApps().length ? getApps()[0] : initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  });
  auth = getAuth(app);
  db   = getFirestore(app);
  storage = isFirebaseStorageConfigured ? getStorage(app) : null;
  if (typeof window !== "undefined" && measurementId) {
    isAnalyticsSupported()
      .then((supported) => {
        if (supported) analytics = getAnalytics(app);
      })
      .catch(() => {
        analytics = null;
      });
  }
} else {
  // Safe stubs — prevent crashes when .env is not filled in
  console.warn("[Firebase] Not configured. Auth & Firestore features are disabled.");
  auth = null;
  db   = null;
  storage = null;
  analytics = null;
}

export { auth, db, storage, analytics };
export default app || null;

const {
  REACT_APP_FIREBASE_API_KEY:             apiKey,
  REACT_APP_FIREBASE_AUTH_DOMAIN:         authDomain,
  REACT_APP_FIREBASE_DATABASE_URL:        databaseURL,
  REACT_APP_FIREBASE_PROJECT_ID:          projectId,
  REACT_APP_FIREBASE_STORAGE_BUCKET:      storageBucket,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
  REACT_APP_FIREBASE_APP_ID:              appId,
  REACT_APP_FIREBASE_MEASUREMENT_ID:      measurementId,
} = process.env;

export const isFirebaseConfigured = Boolean(
  apiKey && projectId &&
  !apiKey.includes("your_") && !projectId.includes("your_")
);

export const isFirebaseStorageConfigured = Boolean(
  isFirebaseConfigured && storageBucket && !storageBucket.includes("your_")
);

let _app = null, _auth = null, _db = null, _storage = null;

export async function getFirebaseApp() {
  if (_app) return _app;
  if (!isFirebaseConfigured) return null;
  const { initializeApp, getApps, getApp } = await import("firebase/app");
  _app = getApps().length ? getApp() : initializeApp({
    apiKey, authDomain, databaseURL, projectId,
    storageBucket, messagingSenderId, appId, measurementId,
  });
  return _app;
}

export async function getFirebaseAuth() {
  if (_auth) return _auth;
  if (!isFirebaseConfigured) return null;
  const app = await getFirebaseApp();
  if (!app) return null;
  // Use getAuth — works with any auth provider enabled in Firebase Console
  const { getAuth } = await import("firebase/auth");
  _auth = getAuth(app);
  return _auth;
}

export async function getFirebaseDb() {
  if (_db) return _db;
  if (!isFirebaseConfigured) return null;
  const app = await getFirebaseApp();
  if (!app) return null;
  const { initializeFirestore, getFirestore, memoryLocalCache } = await import("firebase/firestore");
  try {
    _db = initializeFirestore(app, { localCache: memoryLocalCache() });
  } catch {
    _db = getFirestore(app);
  }
  return _db;
}

export async function getFirebaseStorage() {
  if (_storage) return _storage;
  if (!isFirebaseStorageConfigured) return null;
  const app = await getFirebaseApp();
  if (!app) return null;
  const { getStorage } = await import("firebase/storage");
  _storage = getStorage(app);
  return _storage;
}

export function getDb()    { return _db; }
export function getAuth_() { return _auth; }

// Legacy null exports for compatibility
export const auth = null;
export const db = null;
export const storage = null;
export const analytics = null;
// eslint-disable-next-line import/no-anonymous-default-export
export default null;

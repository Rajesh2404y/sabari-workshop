// All Firebase imports are dynamic — the SDK never enters the main JS bundle.
// This eliminates ~180 kB of Firebase parse cost from FCP and TBT.

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
  apiKey && !apiKey.includes("your_") &&
  projectId && !projectId.includes("your_")
);

export const isFirebaseStorageConfigured = Boolean(
  isFirebaseConfigured &&
  storageBucket && !storageBucket.includes("your_")
);

// Lazily resolved singletons
let _app = null, _auth = null, _db = null, _storage = null;

export async function getFirebaseApp() {
  if (_app) return _app;
  if (!isFirebaseConfigured) return null;
  const { initializeApp, getApps } = await import("firebase/app");
  _app = getApps().length ? getApps()[0] : initializeApp({
    apiKey, authDomain, databaseURL, projectId,
    storageBucket, messagingSenderId, appId, measurementId,
  });
  return _app;
}

export async function getFirebaseAuth() {
  if (_auth) return _auth;
  if (!isFirebaseConfigured) return null;
  const app = await getFirebaseApp();
  const { getAuth } = await import("firebase/auth");
  _auth = getAuth(app);
  return _auth;
}

export async function getFirebaseDb() {
  if (_db) return _db;
  if (!isFirebaseConfigured) return null;
  const app = await getFirebaseApp();
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
  const { getStorage } = await import("firebase/storage");
  _storage = getStorage(app);
  return _storage;
}

// Synchronous accessors for code that already awaited init
export function getDb()      { return _db; }
export function getAuth_()   { return _auth; }

// Legacy sync exports — null until init called, kept for compatibility
export let auth    = null;
export let db      = null;
export let storage = null;
export let analytics = null;
// eslint-disable-next-line import/no-anonymous-default-export
export default null;

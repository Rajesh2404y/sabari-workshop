import React, { createContext, useContext, useEffect, useState } from "react";
import { isFirebaseConfigured, getFirebaseAuth, getFirebaseDb } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false); // never blocks first render

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    let unsub = () => {};
    let cancelled = false;

    const initAuth = async () => {
      if (cancelled) return;
      try {
        const auth = await getFirebaseAuth();
        const db   = await getFirebaseDb();
        if (!auth || cancelled) return;
        const { onAuthStateChanged } = await import("firebase/auth");
        const { doc, getDoc }        = await import("firebase/firestore");
        unsub = onAuthStateChanged(auth, async (firebaseUser) => {
          setUser(firebaseUser);
          if (firebaseUser && db) {
            try {
              const snap = await getDoc(doc(db, "users", firebaseUser.uid));
              setProfile(snap.exists() ? snap.data() : null);
            } catch { setProfile(null); }
          } else {
            setProfile(null);
          }
          setLoading(false);
        });
      } catch { setLoading(false); }
    };

    // Defer until browser idle — never blocks FCP or TBT
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(initAuth, { timeout: 3000 });
      return () => { cancelled = true; cancelIdleCallback(id); unsub(); };
    }
    const id = setTimeout(initAuth, 500);
    return () => { cancelled = true; clearTimeout(id); unsub(); };
  }, []);

  async function signup(name, email, password, phone) {
    if (!isFirebaseConfigured) throw new Error("Firebase not configured");
    const auth = await getFirebaseAuth();
    const db   = await getFirebaseDb();
    const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
    const { doc, setDoc, serverTimestamp }                  = await import("firebase/firestore");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const userData = { name, email, phone, createdAt: serverTimestamp(), role: "customer" };
    await setDoc(doc(db, "users", cred.user.uid), userData);
    setProfile(userData);
    return cred.user;
  }

  async function login(email, password) {
    if (!isFirebaseConfigured) throw new Error("Firebase not configured");
    const auth = await getFirebaseAuth();
    const db   = await getFirebaseDb();
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const { doc, getDoc }                = await import("firebase/firestore");
    const cred = await signInWithEmailAndPassword(auth, email, password);
    try {
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      setProfile(snap.exists() ? snap.data() : null);
    } catch { setProfile(null); }
    return cred.user;
  }

  async function logout() {
    if (!isFirebaseConfigured) return;
    const auth = await getFirebaseAuth();
    const { signOut } = await import("firebase/auth");
    setProfile(null);
    setUser(null);
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signup, login, logout, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, isFirebaseConfigured } from "../firebase";

// Conditionally import Firebase auth functions only when configured
let onAuthStateChanged, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, signOut, updateProfile;
let docFn, setDoc, getDoc, serverTimestamp;

if (isFirebaseConfigured) {
  ({ onAuthStateChanged, signInWithEmailAndPassword,
     createUserWithEmailAndPassword, signOut, updateProfile }
    = require("firebase/auth"));
  ({ doc: docFn, setDoc, getDoc, serverTimestamp }
    = require("firebase/firestore"));
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser && db) {
        try {
          const snap = await getDoc(docFn(db, "users", firebaseUser.uid));
          setProfile(snap.exists() ? snap.data() : null);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function signup(name, email, password, phone) {
    if (!isFirebaseConfigured) throw new Error("Firebase not configured");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const userData = { name, email, phone, createdAt: serverTimestamp(), role: "customer" };
    await setDoc(docFn(db, "users", cred.user.uid), userData);
    setProfile(userData);
    return cred.user;
  }

  async function login(email, password) {
    if (!isFirebaseConfigured) throw new Error("Firebase not configured");
    const cred = await signInWithEmailAndPassword(auth, email, password);
    try {
      const snap = await getDoc(docFn(db, "users", cred.user.uid));
      setProfile(snap.exists() ? snap.data() : null);
    } catch {
      setProfile(null);
    }
    return cred.user;
  }

  function logout() {
    if (!isFirebaseConfigured) return Promise.resolve();
    setProfile(null);
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signup, login, logout, isFirebaseConfigured }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

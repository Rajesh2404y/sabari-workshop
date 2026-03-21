import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { isFirebaseConfigured, getFirebaseDb } from "../firebase";
import { sendAllNotifications, openOwnerWhatsApp } from "../services/notificationService";

const STORAGE_KEY      = "sabari_bookings";
const BOOKINGS_COLLECTION = "bookings";

function generateBookingId() {
  return "SBR-" + Date.now().toString(36).toUpperCase();
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, "")))
    errors.phone = "Enter a valid 10-digit Indian mobile number";
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.carBrand)    errors.carBrand    = "Select a car brand";
  if (!form.serviceType) errors.serviceType = "Select a service";
  return errors;
}

function isDuplicateLocal(form) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return existing.some(
      (b) => b.phone === form.phone && b.serviceType === form.serviceType
    );
  } catch { return false; }
}

function saveToLocal(booking) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch { /* non-blocking */ }
}

export function useBooking() {
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [notifStatus, setNotifStatus] = useState(null);
  const { user } = useAuth();

  async function submitBooking(form) {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return { success: false };
    }
    setErrors({});

    if (isDuplicateLocal(form)) {
      setErrors({ duplicate: "You already have a booking request for this service." });
      return { success: false };
    }

    setLoading(true);

    const booking = {
      ...form,
      bookingId: generateBookingId(),
      status:    "pending",
      userId:    user?.uid || null,
      createdAt: new Date().toISOString(),
    };

    let firestoreId = null;
    let saveTarget  = "local";
    let saveError   = null;

    if (isFirebaseConfigured) {
      try {
        const db = await getFirebaseDb();
        if (db) {
          const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
          const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
            ...booking,
            createdAt: serverTimestamp(),
          });
          firestoreId = docRef.id;
          saveTarget  = "firestore";
        }
      } catch (err) {
        saveError = err?.message || "Firestore error";
      }
    } else {
      saveError = "Firebase not configured";
    }

    saveToLocal({ ...booking, firestoreId, saveTarget, saveError });

    const notif = await sendAllNotifications(booking);
    setNotifStatus(notif);
    openOwnerWhatsApp(booking);

    setLoading(false);
    return { success: true, booking: { ...booking, firestoreId, saveTarget, saveError } };
  }

  return { submitBooking, errors, loading, notifStatus };
}

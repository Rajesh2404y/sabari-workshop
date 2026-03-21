import { useState } from "react";
import { db, isFirebaseConfigured } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendAllNotifications, openOwnerWhatsApp } from "../services/notificationService";
import { useAuth } from "../context/AuthContext";

const STORAGE_KEY = "sabari_bookings";

function generateBookingId() {
  return "SBR-" + Date.now().toString(36).toUpperCase();
}

function validate(form) {
  const errors = {};
  if (!form.name.trim())
    errors.name = "Name is required";
  if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, "")))
    errors.phone = "Enter a valid 10-digit Indian mobile number";
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.serviceType)
    errors.serviceType = "Select a service";
  return errors;
}

// Check localStorage for duplicate booking
function isDuplicateLocal(form) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return existing.some(
      (b) =>
        b.phone === form.phone &&
        b.serviceType === form.serviceType
    );
  } catch {
    return false;
  }
}

// Save to localStorage as offline backup
function saveToLocal(booking) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // non-blocking
  }
}

export function useBooking() {
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);
  const [notifStatus, setNotifStatus] = useState(null);
  const { user }                      = useAuth();

  async function submitBooking(form) {
    // 1. Validate
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return { success: false };
    }
    setErrors({});

    // 2. Check duplicate in localStorage
    if (isDuplicateLocal(form)) {
      setErrors({ duplicate: "You already have a booking request for this service." });
      return { success: false };
    }

    setLoading(true);

    const booking = {
      ...form,
      bookingId:      generateBookingId(),
      status:         "pending",
      userId:         user?.uid || null,
      createdAt:      new Date().toISOString(),
    };

    // 3. Save to Firebase Firestore
    let firestoreId = null;
    let saveTarget = "local";
    if (isFirebaseConfigured && db) {
      try {
        // Skip duplicate check via Firestore query (requires index + read permission)
        // Just attempt the write directly — it's faster and avoids extra reads
        const docRef = await addDoc(collection(db, "bookings"), {
          ...booking,
          createdAt: serverTimestamp(),
        });
        firestoreId = docRef.id;
        saveTarget = "firestore";
        console.log("[Firebase] Booking saved to Firestore:", docRef.id);
      } catch (err) {
        if (err.code === "permission-denied") {
          console.warn(
            "[Firebase] Firestore write blocked by security rules.\n" +
            "Fix: Go to Firebase Console → Firestore → Rules → paste:\n" +
            "rules_version = '2';\n" +
            "service cloud.firestore {\n" +
            "  match /databases/{database}/documents {\n" +
            "    match /{document=**} { allow read, write: if true; }\n" +
            "  }\n" +
            "}"
          );
        } else {
          console.error("[Firebase] Failed to save booking:", err.message);
        }
        // Always continue — fall back to localStorage
      }
    } else {
      console.warn("[Firebase] Not configured — saving to localStorage only.");
    }

    // 4. Always save to localStorage as backup
    saveToLocal({ ...booking, firestoreId, saveTarget });

    // 5. Send notifications (WhatsApp + EmailJS)
    const notif = await sendAllNotifications(booking);
    setNotifStatus(notif);

    // 6. Open WhatsApp for owner
    openOwnerWhatsApp(booking);

    setLoading(false);
    return { success: true, booking: { ...booking, firestoreId, saveTarget } };
  }

  return { submitBooking, errors, loading, notifStatus };
}

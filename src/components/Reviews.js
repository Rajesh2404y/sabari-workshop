import React, { useState, useEffect } from "react";
import { Star, Send, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { db, isFirebaseConfigured } from "../firebase";
import { useAuth } from "../context/AuthContext";

let collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp, where;
if (isFirebaseConfigured) {
  ({ collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp, where }
    = require("firebase/firestore"));
}

const FALLBACK = [
  { id: 1, name: "Arjun Kumar", rating: 5, text: "Excellent service! My car AC was fixed in under 2 hours. Very professional team.", car: "Maruti Swift" },
  { id: 2, name: "Priya Rajan", rating: 5, text: "Best workshop in Chennai. Honest service and quality work. Highly recommended!", car: "Hyundai i20" },
  { id: 3, name: "Suresh Babu", rating: 5, text: "Got my car serviced here for 3 years. Always reliable and affordable.", car: "Honda City" },
];

function Stars({ value, onChange, size = "w-5 h-5" }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button"
          onClick={() => onChange?.(n)}
          onMouseEnter={() => onChange && setHover(n)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? "cursor-pointer" : "cursor-default"}>
          <Star className={`${size} transition-colors ${n <= (hover || value) ? "fill-brand-yellow text-brand-yellow" : "text-gray-300"}`} />
        </button>
      ))}
    </div>
  );
}

export function ReviewForm({ bookingId, onSuccess }) {
  const { user, profile } = useAuth();
  const [rating, setRating]   = useState(0);
  const [text, setText]       = useState("");
  const [car, setCar]         = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [done, setDone]       = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0)            { setError("Please select a star rating"); return; }
    if (text.trim().length < 10) { setError("Review must be at least 10 characters"); return; }
    setError(""); setLoading(true);
    try {
      if (!isFirebaseConfigured || !db) throw new Error("Firebase not configured");
      if (bookingId) {
        const dup = await getDocs(query(collection(db, "reviews"), where("bookingId", "==", bookingId)));
        if (!dup.empty) { setError("You've already reviewed this booking."); setLoading(false); return; }
      }
      await addDoc(collection(db, "reviews"), {
        name:      profile?.name || user?.displayName || "Customer",
        userId:    user?.uid || null,
        bookingId: bookingId || null,
        rating, text: text.trim(),
        car: car.trim() || "Car Owner",
        createdAt: serverTimestamp(),
        approved: true,
      });
      setDone(true);
      onSuccess?.();
    } catch (err) {
      setError(err.message === "Firebase not configured"
        ? "Reviews require Firebase setup. Please configure Firebase in .env"
        : "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) return (
    <div className="text-center py-6">
      <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
      <p className="font-bold text-brand-dark">Thank you for your review!</p>
      <p className="text-gray-500 text-sm mt-1">Your feedback helps us improve.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Your Rating *</p>
        <Stars value={rating} onChange={setRating} size="w-7 h-7" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
        <input value={car} onChange={(e) => setCar(e.target.value)} placeholder="e.g. Maruti Swift"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3}
          placeholder="Share your experience with Sabari Auto Workshop..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red resize-none" />
      </div>
      {error && (
        <p className="flex items-center gap-1 text-red-500 text-xs">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
      <button type="submit" disabled={loading}
        className="w-full bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <><Send className="w-4 h-4" /> Submit Review</>}
      </button>
    </form>
  );
}

export function ReviewsList({ maxItems = 6 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setReviews(FALLBACK);
      setLoading(false);
      return;
    }
    async function load() {
      try {
        const snap = await getDocs(
          query(collection(db, "reviews"), where("approved", "==", true), orderBy("createdAt", "desc"), limit(maxItems))
        );
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setReviews(data.length > 0 ? data : FALLBACK);
      } catch {
        setReviews(FALLBACK);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [maxItems]);

  if (loading) return (
    <div className="flex justify-center py-10">
      <Loader2 className="w-6 h-6 animate-spin text-brand-red" />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {reviews.map((r) => (
        <div key={r.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <Stars value={r.rating} size="w-4 h-4" />
          <p className="text-gray-600 text-sm my-3">"{r.text}"</p>
          <p className="font-semibold text-brand-dark text-sm">{r.name}</p>
          <p className="text-gray-400 text-xs">{r.car} Owner</p>
        </div>
      ))}
    </div>
  );
}

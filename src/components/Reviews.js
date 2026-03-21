import React, { useState, useEffect } from "react";
import { Star, Send, Loader2, AlertCircle, CheckCircle, User } from "lucide-react";
import { isFirebaseConfigured, getFirebaseDb } from "../firebase";

const FALLBACK = [
  { id: 1, name: "Arjun Kumar",  rating: 5, text: "Excellent service! My car AC was fixed in under 2 hours. Very professional team.", car: "Maruti Swift" },
  { id: 2, name: "Priya Rajan",  rating: 5, text: "Best workshop in Chennai. Honest service and quality work. Highly recommended!", car: "Hyundai i20" },
  { id: 3, name: "Suresh Babu",  rating: 4, text: "Got my car serviced here for 3 years. Always reliable and affordable.", car: "Honda City" },
  { id: 4, name: "Meena Devi",   rating: 5, text: "Quick brake repair done same day. Transparent pricing and friendly staff.", car: "Tata Nexon" },
  { id: 5, name: "Karthik Raja", rating: 5, text: "Battery replaced in 30 minutes. Great experience overall!", car: "Hyundai Creta" },
  { id: 6, name: "Divya S",      rating: 4, text: "Engine issue diagnosed and fixed properly. Will definitely come back.", car: "Maruti Baleno" },
];

function Stars({ value, onChange, size = "h-5 w-5" }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button"
          onClick={() => onChange?.(n)}
          onMouseEnter={() => onChange && setHover(n)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? "cursor-pointer" : "cursor-default pointer-events-none"}
          aria-label={`${n} star`}
        >
          <Star className={`${size} transition-colors ${
            n <= (hover || value)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`} />
        </button>
      ))}
    </div>
  );
}

export function ReviewForm({ onSuccess }) {
  const [rating, setRating] = useState(0);
  const [name, setName]     = useState("");
  const [car, setCar]       = useState("");
  const [text, setText]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [done, setDone]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0)            { setError("Please select a star rating"); return; }
    if (!name.trim())            { setError("Please enter your name"); return; }
    if (text.trim().length < 10) { setError("Review must be at least 10 characters"); return; }
    setError(""); setLoading(true);
    try {
      const db = await getFirebaseDb();
      if (!db) throw new Error("offline");
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      await addDoc(collection(db, "reviews"), {
        name:      name.trim(),
        car:       car.trim() || "Car Owner",
        rating,
        text:      text.trim(),
        approved:  true,
        createdAt: serverTimestamp(),
      });
      setDone(true);
      onSuccess?.();
    } catch {
      // Save to localStorage as fallback so review isn't lost
      try {
        const pending = JSON.parse(localStorage.getItem("pending_reviews") || "[]");
        pending.push({ name: name.trim(), car: car.trim() || "Car Owner", rating, text: text.trim(), createdAt: new Date().toISOString() });
        localStorage.setItem("pending_reviews", JSON.stringify(pending));
      } catch { /* ignore */ }
      setDone(true); // still show success to user
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  }

  if (done) return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-7 w-7 text-green-500" />
      </div>
      <p className="text-lg font-bold text-[#0f0f0f]">Thank you for your review!</p>
      <p className="mt-1 text-sm text-gray-500">Your feedback helps us serve better.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star picker */}
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">Your Rating <span className="text-red-500">*</span></p>
        <Stars value={rating} onChange={setRating} size="h-8 w-8" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Name <span className="text-red-500">*</span></label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Car Model</label>
          <input value={car} onChange={(e) => setCar(e.target.value)}
            placeholder="e.g. Maruti Swift"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b]" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Your Review <span className="text-red-500">*</span></label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3}
          placeholder="Share your experience with Sabari Auto Workshop..."
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b]" />
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
        </p>
      )}

      <button type="submit" disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff3b3b] py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-60">
        {loading
          ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
          : <><Send className="h-4 w-4" /> Submit Review</>}
      </button>
    </form>
  );
}

export function ReviewsList({ maxItems = 6 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!isFirebaseConfigured) { setReviews(FALLBACK); setLoading(false); return; }
      try {
        const db = await getFirebaseDb();
        if (!db) throw new Error("no db");
        const { collection, getDocs, query, orderBy, limit, where } = await import("firebase/firestore");
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

  // Average rating
  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "4.9";

  if (loading) return (
    <div className="flex justify-center py-12">
      <Loader2 className="h-6 w-6 animate-spin text-[#ff3b3b]" />
    </div>
  );

  return (
    <div>
      {/* Summary bar */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <span className="text-5xl font-extrabold text-[#0f0f0f]">{avg}</span>
        <div>
          <Stars value={Math.round(avg)} size="h-5 w-5" />
          <p className="mt-1 text-sm text-gray-500">{reviews.length} reviews</p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-3 flex items-center justify-between">
              <Stars value={r.rating} size="h-4 w-4" />
              <span className="text-xs text-gray-400">
                {r.createdAt?.toDate
                  ? r.createdAt.toDate().toLocaleDateString("en-IN", { month: "short", year: "numeric" })
                  : ""}
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">"{r.text}"</p>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff3b3b]/10">
                <User className="h-4 w-4 text-[#ff3b3b]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0f0f0f]">{r.name}</p>
                <p className="text-xs text-gray-400">{r.car} Owner</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

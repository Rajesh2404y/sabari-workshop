import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { isFirebaseConfigured, getFirebaseDb } from "../firebase";
import {
  Car, Calendar, Clock, CheckCircle,
  Loader2, LogOut, User, Phone, Mail, Star, Wrench,
} from "lucide-react";
import { ReviewForm } from "../components/Reviews";

let collection, getDocs, query, where, orderBy;

const STATUS_STYLES = {
  confirmed: "bg-blue-100 text-blue-700",
  "in-progress": "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
  pending: "bg-gray-100 text-gray-600",
};

export default function Dashboard() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewFor, setReviewFor] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user || !isFirebaseConfigured) { setLoading(false); return; }
    async function load() {
      try {
        const db = await getFirebaseDb();
        if (!db) { setLoading(false); return; }
        ({ collection, getDocs, query, where, orderBy } = await import("firebase/firestore"));
        const snap = await getDocs(
          query(collection(db, "bookings"), where("userId", "==", user.uid), orderBy("createdAt", "desc"))
        );
        setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  if (!user) return null;

  const stats = {
    total: bookings.length,
    completed: bookings.filter((b) => b.status === "completed").length,
    pending: bookings.filter((b) => ["pending", "confirmed"].includes(b.status)).length,
    activeServices: new Set(bookings.map((b) => b.serviceType).filter(Boolean)).size,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-dark py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-xl font-bold text-white">
              {(profile?.name || user?.displayName || "U")[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{profile?.name || user?.displayName || "Customer"}</h1>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { icon: <Car className="h-5 w-5" />, label: "Total Bookings", value: stats.total, color: "text-blue-500" },
            { icon: <CheckCircle className="h-5 w-5" />, label: "Completed", value: stats.completed, color: "text-green-500" },
            { icon: <Clock className="h-5 w-5" />, label: "Upcoming", value: stats.pending, color: "text-yellow-500" },
            { icon: <Wrench className="h-5 w-5" />, label: "Services Used", value: stats.activeServices, color: "text-brand-red" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className={`mb-2 ${s.color}`}>{s.icon}</div>
              <p className="text-2xl font-bold text-brand-dark">{s.value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-bold text-brand-dark">Service History</h2>
            {!isFirebaseConfigured ? (
              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center">
                <p className="text-sm font-semibold text-yellow-700">Firebase not configured</p>
                <p className="mt-1 text-xs text-yellow-600">Add Firebase credentials to `.env` to see booking history</p>
              </div>
            ) : loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-brand-red" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="rounded-xl border border-gray-100 bg-white p-10 text-center">
                <Car className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <p className="font-semibold text-gray-500">No bookings yet</p>
                <p className="mt-1 text-sm text-gray-400">Your service history will appear here</p>
                <Link to="/booking" className="mt-4 inline-block rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                  Book a Service
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <p className="font-bold text-brand-dark">{b.serviceType}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{b.carBrand} · ID: {b.bookingId}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[b.status] || STATUS_STYLES.pending}`}>
                        {b.status || "Pending"}
                      </span>
                    </div>
                    <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {b.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {b.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">Our team shares quote details directly during confirmation.</span>
                      {b.status === "completed" && reviewFor !== b.id && (
                        <button
                          onClick={() => setReviewFor(b.id)}
                          className="flex items-center gap-1 rounded-full bg-brand-yellow px-3 py-1.5 text-xs font-bold text-brand-dark transition-colors hover:bg-yellow-400"
                        >
                          <Star className="h-3 w-3" /> Leave Review
                        </button>
                      )}
                    </div>
                    {reviewFor === b.id && (
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <ReviewForm bookingId={b.id} onSuccess={() => setReviewFor(null)} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="mb-4 text-lg font-bold text-brand-dark">My Profile</h2>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                {[
                  { icon: <User className="h-4 w-4 text-brand-red" />, label: "Name", value: profile?.name || user?.displayName || "-" },
                  { icon: <Mail className="h-4 w-4 text-brand-red" />, label: "Email", value: user?.email || "-" },
                  { icon: <Phone className="h-4 w-4 text-brand-red" />, label: "Phone", value: profile?.phone || "-" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="rounded-lg bg-gray-50 p-2">{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold text-brand-dark">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-brand-dark p-5">
              <p className="mb-3 text-sm font-bold text-white">Quick Actions</p>
              <div className="space-y-2">
                <Link to="/booking" className="flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                  <Calendar className="h-4 w-4" /> Book New Service
                </Link>
                <a href="tel:+919444484399" className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                  <Phone className="h-4 w-4" /> Request Callback
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

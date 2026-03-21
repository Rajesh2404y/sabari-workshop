import React, { useState } from "react";
import {
  Wrench,
  Phone,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
} from "lucide-react";
import { BOOKINGS_COLLECTION } from "../constants/firestore";
import { useBooking } from "../hooks/useBooking";

const SERVICE_TYPES = [
  "Basic Service",
  "Full Service",
  "Engine Repair",
  "AC Service",
  "Brake Repair",
  "Battery Replacement",
  "Denting & Painting",
  "Oil Change",
];

const CAR_BRANDS = [
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda",
  "Toyota", "Ford", "Volkswagen", "Kia", "Renault", "Other",
];

const TIME_SLOTS = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
];

const INITIAL = { name: "", phone: "", carBrand: "", serviceType: "", date: "", timeSlot: "" };

export default function Booking() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const { submitBooking, errors, loading } = useBooking();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitBooking(form);
    if (result.success) {
      setConfirmedBooking(result.booking);
      setSubmitted(true);
    }
  };

  if (submitted && confirmedBooking) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-20">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-7 w-7 text-green-500" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-[#0f0f0f]">
            Booking Confirmed
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Thank you, <strong>{confirmedBooking.name}</strong>. Our team will
            call you shortly with pricing and slot details.
          </p>
          <div className="mb-6 space-y-2.5 rounded-xl border border-gray-100 bg-gray-50 p-4 text-left text-sm">
            {[
              ["Name", confirmedBooking.name],
              ["Phone", confirmedBooking.phone],
              ["Car", confirmedBooking.carBrand],
              ["Service", confirmedBooking.serviceType],
              ...(confirmedBooking.date ? [["Date", confirmedBooking.date]] : []),
              ...(confirmedBooking.timeSlot ? [["Time", confirmedBooking.timeSlot]] : []),
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-gray-400">{label}</span>
                <span className="font-semibold text-[#0f0f0f]">{value}</span>
              </div>
            ))}
            {confirmedBooking.saveTarget === "firestore" &&
              confirmedBooking.firestoreId && (
                <p className="pt-1 text-xs font-medium text-green-600">
                  {"\u2713"} Saved to Firestore: {BOOKINGS_COLLECTION}/
                  {confirmedBooking.firestoreId}
                </p>
              )}
            {confirmedBooking.saveTarget !== "firestore" && (
              <p className="pt-1 text-xs font-medium text-amber-600">
                ⚠ Not saved to Firestore.{confirmedBooking.saveError ? ` Error: ${confirmedBooking.saveError}` : ""}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <a
              href="tel:+919444484399"
              className="flex-1 rounded-xl border border-gray-200 py-2.5 text-center text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-[#0f0f0f]"
            >
              Call Us
            </a>
            <button
              onClick={() => {
                setForm(INITIAL);
                setSubmitted(false);
                setConfirmedBooking(null);
              }}
              className="flex-1 rounded-xl bg-[#ff3b3b] py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
            >
              Book Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="bg-[#0f0f0f] py-16 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b3b]">
          Book Service
        </p>
        <h1 className="mb-3 text-4xl font-extrabold text-white">
          Quick Booking
        </h1>
        <p className="mx-auto max-w-sm text-sm text-gray-400">
          Share your details and our team will contact you with pricing and
          confirmation.
        </p>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          {errors.duplicate && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" /> {errors.duplicate}
            </div>
          )}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  <User className="mr-1 inline h-3.5 w-3.5 text-gray-400" />{" "}
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  <Phone className="mr-1 inline h-3.5 w-3.5 text-gray-400" />{" "}
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${
                    errors.phone ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  <Wrench className="mr-1 inline h-3.5 w-3.5 text-gray-400" />{" "}
                  Car Brand
                </label>
                <select
                  name="carBrand"
                  value={form.carBrand}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${
                    errors.carBrand ? "border-red-400" : "border-gray-200"
                  }`}
                >
                  <option value="">Select car brand</option>
                  {CAR_BRANDS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                {errors.carBrand && (
                  <p className="mt-1 text-xs text-red-500">{errors.carBrand}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    <Calendar className="mr-1 inline h-3.5 w-3.5 text-gray-400" />{" "}
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    <Clock className="mr-1 inline h-3.5 w-3.5 text-gray-400" />{" "}
                    Time Slot
                  </label>
                  <select
                    name="timeSlot"
                    value={form.timeSlot}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b]"
                  >
                    <option value="">Any time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  <Wrench className="mr-1 inline h-3.5 w-3.5 text-gray-400" />{" "}
                  Service Type
                </label>
                <select
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${
                    errors.serviceType ? "border-red-400" : "border-gray-200"
                  }`}
                >
                  <option value="">Select a service</option>
                  {SERVICE_TYPES.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.serviceType}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff3b3b] py-3.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4" /> Confirm Booking
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Our team will call you with pricing and confirm your service
                slot.
              </p>
            </form>
          </div>

          <div className="mt-5 flex gap-3">
            <a
              href="tel:+919444484399"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-[#0f0f0f]"
            >
              <Phone className="h-4 w-4" /> Call to Book
            </a>
            <a
              href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20want%20to%20book%20a%20service"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

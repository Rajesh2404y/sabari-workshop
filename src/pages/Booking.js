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

  // Format date nicely: 2026-04-10 → Fri, 10 Apr 2026
  const formatDate = (d) => {
    if (!d) return "";
    try {
      return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "short", day: "numeric", month: "short", year: "numeric",
      });
    } catch { return d; }
  };

  if (submitted && confirmedBooking) {
    const rows = [
      { label: "Customer",    value: confirmedBooking.name },
      { label: "Phone",       value: confirmedBooking.phone },
      { label: "Vehicle",     value: confirmedBooking.carBrand },
      { label: "Service",     value: confirmedBooking.serviceType },
      ...(confirmedBooking.date     ? [{ label: "Date",  value: formatDate(confirmedBooking.date) }] : []),
      ...(confirmedBooking.timeSlot ? [{ label: "Slot",  value: confirmedBooking.timeSlot }] : []),
    ];

    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-16">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* Green header strip */}
            <div className="bg-[#0f0f0f] px-8 py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-4 ring-green-500/20">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">Booking Confirmed</h2>
              <p className="mt-1 text-sm text-gray-400">
                Ref: <span className="font-mono font-semibold text-gray-300">{confirmedBooking.bookingId}</span>
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-6">
              <p className="mb-5 text-center text-sm text-gray-500">
                Hi <span className="font-semibold text-[#0f0f0f]">{confirmedBooking.name}</span>, your service request
                has been received. Our team will call you shortly to confirm pricing and slot.
              </p>

              {/* Details table */}
              <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
                {rows.map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</span>
                    <span className="text-sm font-semibold text-[#0f0f0f]">{value}</span>
                  </div>
                ))}
              </div>

              {/* Save status */}
              <div className="mt-4">
                {confirmedBooking.saveTarget === "firestore" ? (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-green-500" />
                    <p className="text-xs text-green-700">
                      Booking saved successfully
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
                    <span className="text-xs text-amber-700">Saved locally — will sync when online.</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <a href="tel:+919444484399"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-gray-400">
                  <Phone className="h-4 w-4" /> Call Us
                </a>
                <button
                  onClick={() => { setForm(INITIAL); setSubmitted(false); setConfirmedBooking(null); }}
                  className="flex-1 rounded-xl bg-[#ff3b3b] py-3 text-sm font-bold text-white transition-colors hover:bg-red-700">
                  New Booking
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">
            Questions? Call us at{" "}
            <a href="tel:+919444484399" className="font-semibold text-[#0f0f0f] hover:underline">+91 94444 84399</a>
          </p>
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

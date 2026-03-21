import React, { useState } from "react";
import { Wrench, Phone, User, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
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

const INITIAL = {
  name: "",
  phone: "",
  serviceType: "",
};

export default function Booking() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const { submitBooking, errors, loading } = useBooking();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      <div className="bg-white">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="w-full rounded-3xl border border-gray-100 bg-[#f7f7f7] p-8 text-center sm:p-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-[#0f0f0f]">Booking Confirmed</h1>
            <p className="mt-3 text-sm text-gray-600">
              Thank you, <strong>{confirmedBooking.name}</strong>. Our team will contact you with price details.
            </p>
            <div className="mx-auto mt-8 max-w-md space-y-3 rounded-2xl border border-gray-100 bg-white p-5 text-left">
              <div className="flex justify-between gap-4">
                <span className="text-sm text-gray-500">Name</span>
                <span className="text-sm font-semibold text-[#0f0f0f]">{confirmedBooking.name}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="text-sm font-semibold text-[#0f0f0f]">{confirmedBooking.phone}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-sm text-gray-500">Service</span>
                <span className="text-sm font-semibold text-[#0f0f0f]">{confirmedBooking.serviceType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="bg-[#0f0f0f] py-16 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Book Service</p>
        <h1 className="mb-3 text-4xl font-extrabold text-white">Quick Booking</h1>
        <p className="mx-auto max-w-md text-sm text-gray-400">Share your details and our team will contact you shortly.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#ff3b3b] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
          >
            <Phone className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>

      <div className="bg-[#ffc107] py-3 text-center">
        <p className="text-sm font-bold text-gray-900">Simple booking flow · Quick confirmation call · Clear service guidance</p>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-3xl bg-[#0f0f0f] p-8 text-white">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Why Book With Us</p>
            <h2 className="text-3xl font-bold">Simple and Fast Service Booking</h2>
            <div className="mt-6 space-y-4 text-sm text-gray-300">
              <p>1. Select the service you need.</p>
              <p>2. Share your contact details.</p>
              <p>3. Our team will call you with service guidance and quote details.</p>
            </div>
            <a
              href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
            >
              <Phone className="h-4 w-4" /> WhatsApp Instead
            </a>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  <User className="mr-1 inline h-4 w-4 text-gray-400" /> Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${errors.name ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  <Phone className="mr-1 inline h-4 w-4 text-gray-400" /> Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  <Wrench className="mr-1 inline h-4 w-4 text-gray-400" /> Service Type
                </label>
                <select
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${errors.serviceType ? "border-red-400" : "border-gray-200"}`}
                >
                  <option value="">Select service</option>
                  {SERVICE_TYPES.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                {errors.serviceType && <p className="mt-1 text-xs text-red-500">{errors.serviceType}</p>}
              </div>

              {errors.duplicate && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {errors.duplicate}
                </div>
              )}

              <p className="text-sm text-gray-500">
                Our team will contact you with price details and confirm the next available service slot.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff3b3b] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Submitting..." : <><ArrowRight className="h-4 w-4" /> Confirm Booking</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

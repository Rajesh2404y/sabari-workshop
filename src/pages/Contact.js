import React, { useState } from "react";
import { Phone, MapPin, Mail, MessageCircle, Send, CheckCircle } from "lucide-react";

const INITIAL = { name: "", phone: "", serviceType: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone.trim())) next.phone = "Enter a valid 10-digit number";
    if (!form.serviceType.trim()) next.serviceType = "Service type is required";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setSent(true);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0f0f0f] py-16 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Contact</p>
        <h1 className="mb-3 text-4xl font-extrabold text-white">Get In Touch</h1>
        <p className="mx-auto max-w-md text-sm text-gray-400">Call, WhatsApp, or send your service request and our team will contact you.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#ff3b3b] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>

      <div className="bg-[#ffc107] py-3 text-center">
        <p className="text-sm font-bold text-gray-900">Phone, email, and WhatsApp support for bookings and service questions</p>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="space-y-4">
            {[
              { Icon: Phone, title: "Phone", value: "+91 94444 84399", href: "tel:+919444484399" },
              { Icon: Mail, title: "Email", value: "sabariauto009@gmail.com", href: "mailto:sabariauto009@gmail.com" },
              { Icon: MapPin, title: "Location", value: "Anna Nagar, Chennai", href: "https://maps.google.com/?q=Anna+Nagar+Chennai" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#ff3b3b] hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff3b3b]/10">
                  <item.Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-gray-500">{item.title}</p>
                  <p className="text-sm font-semibold text-[#0f0f0f]">{item.value}</p>
                </div>
              </a>
            ))}

            <a
              href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff3b3b] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-[#0f0f0f]">Request a Callback</h2>

            {sent ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-lg font-semibold text-[#0f0f0f]">Request Sent</p>
                <p className="mt-2 text-sm text-gray-500">Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${errors.name ? "border-red-400" : "border-gray-200"}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Service Type</label>
                  <input
                    type="text"
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${errors.serviceType ? "border-red-400" : "border-gray-200"}`}
                    placeholder="For example: Basic Service"
                  />
                  {errors.serviceType && <p className="mt-1 text-xs text-red-500">{errors.serviceType}</p>}
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff3b3b] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <Send className="h-4 w-4" /> Send Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from "react";
import { Phone, MapPin, Mail, MessageCircle, Send, CheckCircle, Clock } from "lucide-react";

const INITIAL = { name: "", phone: "", serviceType: "" };

const CONTACT_ITEMS = [
  { Icon: Phone,          label: "Phone",    value: "+91 94444 84399",        href: "tel:+919444484399" },
  { Icon: MessageCircle,  label: "WhatsApp", value: "Chat with us instantly", href: "https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service" },
  { Icon: Mail,           label: "Email",    value: "sabariauto009@gmail.com", href: "mailto:sabariauto009@gmail.com" },
  { Icon: MapPin,         label: "Location", value: "No. 41, Gangai Nagar, Service Road, Kamban Street, Kallikuppam, Chennai – 600053", href: "https://maps.google.com/?q=No.+41+Gangai+Nagar+Service+Road+Kamban+Street+Kallikuppam+Chennai+600053" },
  { Icon: Clock,          label: "Hours",    value: "Mon–Sat: 8 AM – 8 PM",  href: null },
];

export default function Contact() {
  const [form, setForm]   = useState(INITIAL);
  const [sent, setSent]   = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim())                        next.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone.trim()))      next.phone = "Enter a valid 10-digit number";
    if (!form.serviceType.trim())                 next.serviceType = "Service type is required";
    if (Object.keys(next).length) { setErrors(next); return; }
    setSent(true);
  };

  return (
    <div className="bg-white">

      {/* Header */}
      <div className="bg-[#0f0f0f] py-16 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b3b]">Contact</p>
        <h1 className="mb-3 text-4xl font-extrabold text-white">Get In Touch</h1>
        <p className="mx-auto max-w-sm text-sm text-gray-400">
          Call, WhatsApp, or send a request — our team will respond quickly.
        </p>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

          {/* Contact details */}
          <div className="space-y-3">
            {CONTACT_ITEMS.map(({ Icon, label, value, href }) => {
              const inner = (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3b3b]/10 shrink-0">
                    <Icon className="h-4 w-4 text-[#ff3b3b]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">{label}</p>
                    <p className="text-sm font-semibold text-[#0f0f0f]">{value}</p>
                  </div>
                </>
              );
              return href ? (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 hover:border-[#ff3b3b] transition-colors">
                  {inner}
                </a>
              ) : (
                <div key={label} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4">
                  {inner}
                </div>
              );
            })}
          </div>

          {/* Callback form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-xl font-bold text-[#0f0f0f]">Request a Callback</h2>

            {sent ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-7 w-7 text-green-500" />
                </div>
                <p className="text-base font-semibold text-[#0f0f0f]">Request Sent</p>
                <p className="mt-1 text-sm text-gray-500">Our team will contact you shortly.</p>
                <button onClick={() => { setForm(INITIAL); setSent(false); }}
                  className="mt-5 text-sm text-[#ff3b3b] hover:underline">
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "name",        label: "Name",         type: "text", placeholder: "Your name" },
                  { name: "phone",       label: "Phone",        type: "tel",  placeholder: "10-digit mobile number", maxLength: 10 },
                  { name: "serviceType", label: "Service Type", type: "text", placeholder: "e.g. Basic Service" },
                ].map(({ name, label, type, placeholder, maxLength }) => (
                  <div key={name}>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">{label}</label>
                    <input type={type} name={name} value={form[name]} onChange={handleChange}
                      placeholder={placeholder} maxLength={maxLength}
                      className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] ${errors[name] ? "border-red-400" : "border-gray-200"}`} />
                    {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
                  </div>
                ))}
                <button type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff3b3b] py-3.5 text-sm font-bold text-white hover:bg-red-700 transition-colors">
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

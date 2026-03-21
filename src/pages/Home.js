import React from "react";
import { Link } from "react-router-dom";
import {
  Droplets, Wrench, Wind, Shield, Battery, Car,
  CheckCircle, ArrowRight, Users, Clock, Award, MessageCircle,
} from "lucide-react";

const SERVICES = [
  { Icon: Droplets, name: "Basic Service",        desc: "Routine maintenance to keep your car healthy and road-ready." },
  { Icon: Wrench,   name: "Engine Repair",         desc: "Inspection and repair for engine issues and warning signs." },
  { Icon: Wind,     name: "AC Service",            desc: "Cooling system checks and AC repair for better comfort." },
  { Icon: Shield,   name: "Brake Repair",          desc: "Brake inspection and repair for safer driving." },
  { Icon: Battery,  name: "Battery Replacement",   desc: "Battery testing and replacement for reliable starts." },
  { Icon: Car,      name: "Denting & Painting",    desc: "Bodywork restoration and paint finishing for your vehicle." },
];

const WHY_US = [
  { Icon: Award,        title: "Experienced Mechanics", desc: "Certified mechanics with years of hands-on workshop experience." },
  { Icon: CheckCircle,  title: "Honest Service",        desc: "Clear guidance and transparent process before any work begins." },
  { Icon: Clock,        title: "Fast Turnaround",       desc: "Quick service to reduce downtime and get you back on the road." },
  { Icon: Users,        title: "Trusted Locally",       desc: "A dependable workshop serving customers across Chennai." },
];

export default function Home() {
  return (
    <div className="bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b3b]">
            Anna Nagar, Chennai
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Trusted Car Service<br />You Can Rely On
          </h1>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-400">
            Professional car repairs and maintenance by certified mechanics. Fast, honest, and affordable.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/booking"
              className="rounded-xl bg-[#ff3b3b] px-7 py-3 text-sm font-bold text-white hover:bg-red-700 transition-colors">
              Book Service
            </Link>
            <a href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3 text-sm font-semibold text-white hover:border-white/40 transition-colors">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <div className="mt-10 flex justify-center gap-10">
            {[["500+", "Cars Serviced"], ["10+", "Years Experience"], ["4.9★", "Customer Rating"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-xl font-bold text-white">{num}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b3b]">What We Do</p>
            <h2 className="text-3xl font-bold text-[#0f0f0f]">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ Icon, name, desc }) => (
              <div key={name}
                className="rounded-2xl border border-gray-100 bg-white p-6 hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3b3b]/10">
                  <Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-[#0f0f0f]">{name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">{desc}</p>
                <a href={`https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20${encodeURIComponent(name)}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff3b3b] hover:text-red-700 transition-colors">
                  Get Quote <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-[#0f0f0f] hover:border-[#0f0f0f] transition-colors">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b3b]">Why Us</p>
            <h2 className="text-3xl font-bold text-[#0f0f0f]">Professional Service You Can Trust</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3b3b]/10">
                  <Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-[#0f0f0f]">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0f0f0f] px-8 py-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">Ready to Book a Service?</h2>
            <p className="mx-auto mb-7 max-w-md text-sm text-gray-400">
              Share your details and our team will contact you with service guidance and pricing.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/booking"
                className="rounded-xl bg-[#ff3b3b] px-7 py-3 text-sm font-bold text-white hover:bg-red-700 transition-colors">
                Book Service Now
              </Link>
              <a href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3 text-sm font-semibold text-white hover:border-white/40 transition-colors">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

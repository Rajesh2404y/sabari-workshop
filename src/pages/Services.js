import React from "react";
import { Link } from "react-router-dom";
import {
  Droplets, Wrench, Wind, Shield, Battery, Car, Settings, Zap,
  ArrowRight, MessageCircle, CheckCircle,
} from "lucide-react";

const SERVICES = [
  {
    Icon: Settings,
    name: "Basic Service",
    desc: "Essential periodic maintenance to keep your car clean, smooth, and road-ready.",
    includes: ["Oil & fluid check", "Filter inspection", "General inspection", "Service recommendations"],
  },
  {
    Icon: Wrench,
    name: "Full Service",
    desc: "Complete workshop care with detailed inspection and performance review.",
    includes: ["Full inspection", "Mechanical checks", "Performance review", "Service guidance"],
    tag: "Popular",
  },
  {
    Icon: Wind,
    name: "AC Service",
    desc: "Cooling performance checks and AC repair for better cabin comfort.",
    includes: ["Cooling test", "Vent inspection", "AC system check", "Repair advice"],
  },
  {
    Icon: Shield,
    name: "Brake Repair",
    desc: "Brake diagnosis and repair for safer stopping performance.",
    includes: ["Brake inspection", "Pad & disc check", "Fluid review", "Safety check"],
  },
  {
    Icon: Battery,
    name: "Battery Replacement",
    desc: "Battery health checks and replacement for reliable starts.",
    includes: ["Battery test", "Terminal check", "Replacement support", "Electrical review"],
  },
  {
    Icon: Car,
    name: "Denting & Painting",
    desc: "Bodywork restoration and paint finishing to refresh your car.",
    includes: ["Dent review", "Bodywork support", "Paint matching", "Finish inspection"],
  },
  {
    Icon: Zap,
    name: "Engine Repair",
    desc: "Engine inspection and repair for performance issues and warning signs.",
    includes: ["Diagnostics", "Engine inspection", "Repair support", "Performance test"],
    tag: "Expert Care",
  },
  {
    Icon: Droplets,
    name: "Oil Change",
    desc: "Quick engine oil and filter replacement to keep your engine running clean.",
    includes: ["Oil drain & refill", "Filter replacement", "Level check", "Fluid top-up"],
  },
];

const WA_BASE = "https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20details%20for%20";

export default function Services() {
  return (
    <div className="bg-white">

      {/* Header */}
      <div className="bg-[#0f0f0f] py-16 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b3b]">What We Offer</p>
        <h1 className="mb-3 text-4xl font-extrabold text-white">Our Services</h1>
        <p className="mx-auto max-w-md text-sm text-gray-400">
          Trusted car care by certified mechanics. Contact us for the right solution for your vehicle.
        </p>
      </div>

      {/* Services Grid */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map(({ Icon, name, desc, includes, tag }) => (
              <div key={name}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-md transition-shadow">
                {tag && (
                  <span className="mb-3 inline-flex w-fit rounded-lg bg-[#fff1f1] px-2.5 py-1 text-xs font-semibold text-[#ff3b3b]">
                    {tag}
                  </span>
                )}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3b3b]/10">
                  <Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-[#0f0f0f]">{name}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">{desc}</p>
                <ul className="mb-5 space-y-1.5">
                  {includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[#ff3b3b]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-2">
                  <Link to="/booking"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0f0f0f] py-2.5 text-sm font-semibold text-white hover:bg-[#222] transition-colors">
                    Book Now <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={`${WA_BASE}${encodeURIComponent(name)}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-[#0f0f0f] hover:border-[#0f0f0f] transition-colors">
                    <MessageCircle className="h-4 w-4" /> Get Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

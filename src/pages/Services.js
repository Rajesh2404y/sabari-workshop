import React from "react";
import { Link } from "react-router-dom";
import {
  Droplets, Wrench, Wind, Shield, Battery, Car, Settings, Zap,
  ArrowRight, MessageCircle, CheckCircle,
} from "lucide-react";

const SERVICES = [
  {
    Icon: Settings, name: "Basic Service",
    desc: "Essential periodic maintenance to keep your car clean, smooth, and road-ready.",
    includes: ["Oil & fluid check", "Filter inspection", "General inspection", "Service recommendations"],
  },
  {
    Icon: Wrench, name: "Full Service", tag: "Popular",
    desc: "Complete workshop care with detailed inspection and performance review.",
    includes: ["Full inspection", "Mechanical checks", "Performance review", "Service guidance"],
  },
  {
    Icon: Wind, name: "AC Service",
    desc: "Cooling performance checks and AC repair for better cabin comfort.",
    includes: ["Cooling test", "Vent inspection", "AC system check", "Repair advice"],
  },
  {
    Icon: Shield, name: "Brake Repair",
    desc: "Brake diagnosis and repair for safer stopping performance.",
    includes: ["Brake inspection", "Pad & disc check", "Fluid review", "Safety check"],
  },
  {
    Icon: Battery, name: "Battery Replacement",
    desc: "Battery health checks and replacement for reliable starts.",
    includes: ["Battery test", "Terminal check", "Replacement support", "Electrical review"],
  },
  {
    Icon: Car, name: "Denting & Painting",
    desc: "Bodywork restoration and paint finishing to refresh your car.",
    includes: ["Dent review", "Bodywork support", "Paint matching", "Finish inspection"],
  },
  {
    Icon: Zap, name: "Engine Repair", tag: "Expert Care",
    desc: "Engine inspection and repair for performance issues and warning signs.",
    includes: ["Diagnostics", "Engine inspection", "Repair support", "Performance test"],
  },
  {
    Icon: Droplets, name: "Oil Change",
    desc: "Quick engine oil and filter replacement to keep your engine running clean.",
    includes: ["Oil drain & refill", "Filter replacement", "Level check", "Fluid top-up"],
  },
];

const WA = "https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20details%20for%20";

export default function Services() {
  return (
    <div className="bg-white">

      {/* Header */}
      <div className="bg-[#0f0f0f] py-16 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">What We Offer</p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white">Our Services</h1>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-400">
          Trusted car care by certified mechanics. Contact us for the right solution for your vehicle.
        </p>
      </div>

      {/* Grid */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map(({ Icon, name, desc, includes, tag }) => (
              <div key={name}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                {tag && (
                  <span className="mb-3 inline-flex w-fit rounded-lg bg-[#fff1f1] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#ff3b3b]">
                    {tag}
                  </span>
                )}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff3b3b]/8 ring-1 ring-[#ff3b3b]/10">
                  <Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-[#0f0f0f]">{name}</h3>
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
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0f0f0f] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a1a1a]">
                    Book Now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a href={`${WA}${encodeURIComponent(name)}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-gray-400">
                    <MessageCircle className="h-3.5 w-3.5" /> Get Quote
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

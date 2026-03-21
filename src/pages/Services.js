import React from "react";
import { Link } from "react-router-dom";
import {
  Droplets,
  Wrench,
  Wind,
  Shield,
  Battery,
  Car,
  ArrowRight,
  MessageCircle,
  Phone,
  CheckCircle,
} from "lucide-react";

const SERVICES = [
  {
    Icon: Droplets,
    name: "Basic Service",
    desc: "Essential periodic maintenance to keep your car clean, smooth, and road-ready.",
    includes: ["Oil and fluid check", "Filter inspection", "General inspection", "Service recommendations"],
  },
  {
    Icon: Wrench,
    name: "Full Service",
    desc: "Complete workshop care for cars that need a detailed service visit and inspection.",
    includes: ["Full inspection", "Mechanical checks", "Performance review", "Service guidance"],
    tag: "Popular",
  },
  {
    Icon: Wind,
    name: "AC Service",
    desc: "Cooling performance checks, AC inspection, and repair support for better cabin comfort.",
    includes: ["Cooling test", "Vent inspection", "AC system check", "Repair advice"],
  },
  {
    Icon: Shield,
    name: "Brake Repair",
    desc: "Brake diagnosis and repair support for safer stopping performance and confidence on the road.",
    includes: ["Brake inspection", "Pad and disc check", "Fluid review", "Safety recommendation"],
  },
  {
    Icon: Battery,
    name: "Battery Replacement",
    desc: "Battery health checks and replacement support to keep your car starting reliably.",
    includes: ["Battery test", "Terminal check", "Replacement support", "Electrical review"],
  },
  {
    Icon: Car,
    name: "Denting & Painting",
    desc: "Bodywork restoration, dent correction, and paint finishing to refresh your car's appearance.",
    includes: ["Dent review", "Bodywork support", "Paint matching", "Finish inspection"],
  },
  {
    Icon: Wrench,
    name: "Engine Repair",
    desc: "Detailed engine inspection and repair support for performance issues, warning signs, and noises.",
    includes: ["Diagnostics", "Engine inspection", "Repair support", "Performance testing"],
    tag: "Expert Care",
  },
];

const WA = "https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20details%20for%20";

export default function Services() {
  return (
    <div className="bg-white">
      <div className="bg-[#0f0f0f] py-16 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ff3b3b]">What We Offer</p>
        <h1 className="mb-3 text-4xl font-extrabold text-white">Our Services</h1>
        <p className="mx-auto max-w-md text-sm text-gray-400">
          Trusted car care by certified mechanics. Explore our available services and contact us for the right solution.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20service%20details"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#ff3b3b] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
          </a>
          <a
            href="tel:+919444484399"
            className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:border-white/40"
          >
            <Phone className="h-4 w-4" /> Request Callback
          </a>
        </div>
      </div>

      <div className="bg-[#f3f4f6] py-3 text-center">
        <p className="text-sm font-medium text-gray-700">Trusted service support, clean process, and quick customer response.</p>
      </div>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div key={service.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6">
                {service.tag && (
                  <div className="mb-4 inline-flex w-fit rounded-lg bg-[#fff1f1] px-3 py-1 text-xs font-semibold text-[#ff3b3b]">
                    {service.tag}
                  </div>
                )}

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1f1]">
                  <service.Icon className="h-6 w-6 text-[#ff3b3b]" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-gray-900">{service.name}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{service.desc}</p>

                <ul className="mb-6 space-y-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[#ff3b3b]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3">
                  <Link
                    to="/booking"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f0f0f] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222222]"
                  >
                    Book Now <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`${WA}${encodeURIComponent(service.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-[#0f0f0f]"
                  >
                    <MessageCircle className="h-4 w-4" /> Get Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#fafafa] py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-2 text-2xl font-bold text-[#0f0f0f]">Need Help Choosing a Service?</h2>
          <p className="mb-7 text-sm text-gray-600">
            Call or WhatsApp us and our team will guide you to the right service based on your car's condition.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20help%20choosing%20a%20service"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#ff3b3b] px-7 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </a>
            <a
              href="tel:+919444484399"
              className="flex items-center gap-2 rounded-xl border border-gray-300 px-7 py-3 font-semibold text-[#0f0f0f] transition-colors hover:border-[#0f0f0f]"
            >
              <Phone className="h-5 w-5" /> Request Callback
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

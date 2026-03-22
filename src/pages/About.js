import React from "react";
import { Link } from "react-router-dom";
import {
  Award, CheckCircle, Users, Clock, Shield, Car,
  Phone, MessageCircle, ArrowRight, MapPin,
} from "lucide-react";

const STATS = [
  { num: "500+", label: "Cars Serviced" },
  { num: "10+",  label: "Years Experience" },
  { num: "15+",  label: "Expert Mechanics" },
  { num: "4.9★", label: "Customer Rating" },
];

const VALUES = [
  { Icon: Award,       title: "Certified Mechanics",  desc: "All our mechanics are trained and certified with 10+ years of hands-on experience." },
  { Icon: CheckCircle, title: "Honest Guidance",      desc: "We explain every repair clearly before work begins so you know what your car needs." },
  { Icon: Shield,      title: "Genuine Parts Only",   desc: "We use OEM and branded spare parts to ensure quality and long-lasting repairs." },
  { Icon: Clock,       title: "Quick Turnaround",     desc: "Most services are reviewed and scheduled quickly so you are back on the road fast." },
  { Icon: Users,       title: "Customer First",       desc: "Hundreds of happy customers trust us. We treat every car like our own." },
  { Icon: Car,         title: "All Car Brands",       desc: "We service Maruti, Hyundai, Honda, Toyota, Tata, Mahindra, and more." },
];

const PROMISES = [
  "Genuine spare parts only — no compromises",
  "Free vehicle inspection on every visit",
  "Pickup and drop support available",
  "Warranty on major repairs",
  "Service guidance before work begins",
  "Transparent communication at every step",
];

export default function About() {
  return (
    <div className="bg-white">

      {/* Header */}
      <div className="bg-[#0f0f0f] py-16 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Our Story</p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white">About Sabari Auto Workshop</h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-400">
          Serving Chennai's car owners with honest, reliable, and trusted car care since 2010.
        </p>
      </div>

      {/* Story */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Who We Are</p>
              <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#0f0f0f]">
                Chennai's Trusted Car Workshop
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Founded in 2010, Sabari Auto Workshop has become a go-to service center for car owners across Chennai.
                Located in Kallikuppam, Chennai, we have built our reputation on quality workmanship, honest guidance, and dependable service.
              </p>
              <p className="mb-8 text-sm leading-relaxed text-gray-600">
                Our team uses modern diagnostic tools and proven workshop processes to support everything from routine
                service visits to major repair work. We focus on helping customers understand what their car needs before moving forward.
              </p>

              <ul className="mb-8 space-y-3">
                {PROMISES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff3b3b]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff3b3b]/10">
                  <MapPin className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0f0f0f]">No. 41, Gangai Nagar, Kallikuppam, Chennai – 600053</p>
                  <p className="text-xs text-gray-500">Mon–Sat: 8 AM–8 PM · Sun: 9 AM–5 PM</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ num, label }) => (
                <div key={label}
                  className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-[#0f0f0f] p-8 text-center">
                  <p className="mb-2 text-4xl font-extrabold tracking-tight text-[#ff3b3b]">{num}</p>
                  <p className="text-sm font-medium text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">What We Stand For</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0f0f0f]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ Icon, title, desc }) => (
              <div key={title}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff3b3b]/8 ring-1 ring-[#ff3b3b]/10">
                  <Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <div>
                  <h3 className="mb-1.5 text-[15px] font-bold tracking-tight text-[#0f0f0f]">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f0f0f] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white">
            Ready to Experience the Difference?
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-400">
            Book a service today or call us and we will help you choose the right service for your car.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/booking"
              className="flex items-center gap-2 rounded-xl bg-[#ff3b3b] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700">
              Book a Service <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href="tel:+919444484399"
              className="flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30">
              <Phone className="h-4 w-4" /> Call Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import {
  Wrench, Wind, Shield, Battery, Car, Droplets,
  CheckCircle, ArrowRight, Users, Clock, Award,
  Phone, MessageCircle, MapPin, Mail,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import { useFeaturedCarModel } from "../hooks/useFeaturedCarModel";

const SERVICES = [
  { Icon: Droplets, name: "Basic Service", desc: "Routine maintenance to keep your car healthy and road-ready." },
  { Icon: Wrench, name: "Engine Repair", desc: "Inspection and repair support for engine issues and warning signs." },
  { Icon: Wind, name: "AC Service", desc: "Cooling system checks and AC repair support for better comfort." },
  { Icon: Shield, name: "Brake Repair", desc: "Brake inspection and repair support for safer driving." },
  { Icon: Battery, name: "Battery Replacement", desc: "Battery testing and replacement support for reliable starts." },
  { Icon: Car, name: "Denting & Painting", desc: "Bodywork restoration and paint finishing for your vehicle." },
];

const WHY_US = [
  { Icon: Award, title: "Experienced Mechanics", desc: "Certified mechanics with years of workshop experience." },
  { Icon: CheckCircle, title: "Honest Service", desc: "Clear explanations and professional guidance before work begins." },
  { Icon: Clock, title: "Fast Turnaround", desc: "Quick service coordination to reduce downtime for your car." },
  { Icon: Users, title: "Trusted by Customers", desc: "A dependable workshop serving customers across Chennai." },
];

export default function Home() {
  const { featuredModel, activeModel, loading } = useFeaturedCarModel();

  return (
    <div className="bg-white">
      <HeroSection activeModel={activeModel} featuredModel={featuredModel} loading={loading} />

      <div className="bg-[#ffc107] py-3 text-center">
        <p className="text-sm font-bold text-gray-900">Trusted service support · Clean workshop process · Quick response from our team</p>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Services</p>
            <h2 className="text-3xl font-bold text-[#0f0f0f]">Main Services</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
              Core workshop services presented clearly, with quick guidance and booking support for every visit.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ Icon, name, desc }) => (
              <div
                key={name}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff3b3b]/10">
                  <Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#0f0f0f]">{name}</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">{desc}</p>
                <a
                  href={`https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20details%20for%20${encodeURIComponent(name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff3b3b] transition-colors hover:text-red-700"
                >
                  Get Quote <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Why Choose Us</p>
            <h2 className="text-3xl font-bold text-[#0f0f0f]">Professional Service You Can Trust</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff3b3b]/10">
                  <Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <h3 className="mb-2 text-base font-bold text-[#0f0f0f]">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0f0f0f] px-6 py-10 text-center sm:px-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Book Service</p>
            <h2 className="text-3xl font-bold text-white">Need Service for Your Car?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400">
              Share your details and our team will contact you with service guidance and booking confirmation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/booking"
                className="rounded-full bg-[#ff3b3b] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Book Service
              </Link>
              <a
                href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#f7f7f7] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">Contact</p>
            <h2 className="text-3xl font-bold text-[#0f0f0f]">Get In Touch</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
              Reach us by phone, email, or WhatsApp for service support and booking assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Phone, title: "Phone", value: "+91 94444 84399", href: "tel:+919444484399" },
              { Icon: Mail, title: "Email", value: "sabariauto009@gmail.com", href: "mailto:sabariauto009@gmail.com" },
              { Icon: MapPin, title: "Location", value: "Anna Nagar, Chennai", href: "https://maps.google.com/?q=Anna+Nagar+Chennai" },
              { Icon: MessageCircle, title: "WhatsApp", value: "Chat with us instantly", href: "https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="rounded-2xl border border-gray-100 bg-white p-6 transition-colors hover:border-[#ff3b3b]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff3b3b]/10">
                  <item.Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <h3 className="mb-1 text-sm font-bold uppercase tracking-[0.12em] text-gray-500">{item.title}</h3>
                <p className="text-sm font-semibold text-[#0f0f0f]">{item.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

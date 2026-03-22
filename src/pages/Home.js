import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Droplets, Wrench, Wind, Shield, Battery, Car,
  CheckCircle, ArrowRight, Users, Clock, Award, MessageCircle, Phone,
} from "lucide-react";

const ReviewsList = lazy(() =>
  import("../components/Reviews").then((m) => ({ default: m.ReviewsList }))
);

const SERVICES = [
  { Icon: Droplets, name: "Basic Service",      desc: "Routine maintenance to keep your car healthy and road-ready." },
  { Icon: Wrench,   name: "Engine Repair",       desc: "Inspection and repair for engine issues and warning signs." },
  { Icon: Wind,     name: "AC Service",          desc: "Cooling system checks and AC repair for better comfort." },
  { Icon: Shield,   name: "Brake Repair",        desc: "Brake inspection and repair for safer driving." },
  { Icon: Battery,  name: "Battery Replacement", desc: "Battery testing and replacement for reliable starts." },
  { Icon: Car,      name: "Denting & Painting",  desc: "Bodywork restoration and paint finishing for your vehicle." },
];

const WHY_US = [
  { Icon: Award,       title: "Experienced Mechanics", desc: "Certified mechanics with years of hands-on workshop experience." },
  { Icon: CheckCircle, title: "Honest Service",        desc: "Clear guidance and transparent process before any work begins." },
  { Icon: Clock,       title: "Fast Turnaround",       desc: "Quick service to reduce downtime and get you back on the road." },
  { Icon: Users,       title: "Trusted Locally",       desc: "A dependable workshop serving customers across Chennai." },
];

function SectionLabel({ children }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">
      {children}
    </p>
  );
}

export default function Home() {
  const [showWorkshopImage, setShowWorkshopImage] = useState(true);
  const [reviewsReady, setReviewsReady] = useState(false);
  const reviewsRef = useRef(null);

  useEffect(() => {
    if (!reviewsRef.current || reviewsReady) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReviewsReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(reviewsRef.current);
    return () => observer.disconnect();
  }, [reviewsReady]);

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center bg-[#0f0f0f] text-center"
        style={{ height: "580px", contain: "layout" }}
      >
        {/* subtle red glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#ff3b3b]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-2xl px-6">
          <SectionLabel>Kallikuppam, Chennai – 600053</SectionLabel>
          <h1 className="mb-5 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl">
            Trusted Car Service<br />
            <span className="text-[#ff3b3b]">You Can Rely On</span>
          </h1>
          <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-gray-400">
            Professional repairs and maintenance by certified mechanics.
            Fast, honest, and affordable.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/booking"
              className="rounded-xl bg-[#ff3b3b] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700">
              Book a Service
            </Link>
            <a href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          <div className="mt-12 flex justify-center gap-10 border-t border-white/10 pt-8">
            {[["500+", "Cars Serviced"], ["10+", "Years Experience"], ["4.9★", "Customer Rating"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-2xl font-extrabold tracking-tight text-white">{num}</p>
                <p className="mt-0.5 text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="cv-auto bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionLabel>Inside The Workshop</SectionLabel>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#0f0f0f]">
              Real Repairs, Trusted Hands
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              A look inside Sabari Auto Workshop where our team handles engine checks,
              repair work, and routine maintenance with care.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-gray-600">
              From diagnostics to battery replacement and engine service, we keep every
              job transparent and workshop-ready from start to finish.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="rounded-xl bg-[#ff3b3b] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700"
              >
                Book Workshop Visit
              </Link>
              <a
                href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20want%20to%20check%20my%20car"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-gray-400"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-gray-100 shadow-xl shadow-black/5">
            {showWorkshopImage ? (
              <img
                src="/workshop-engine1.jpeg"
                alt="Sabari Auto Workshop engine repair"
                className="h-full w-full object-cover"
                width="600"
                height="400"
                loading="eager"
                fetchpriority="high"
                onError={() => setShowWorkshopImage(false)}
              />
            ) : (
              <div className="flex min-h-[320px] items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#111111] p-8 text-center">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff3b3b]">
                    Image Slot Ready
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Add your workshop photo as{" "}
                    <span className="font-semibold text-white">public/workshop-engine.jpg</span>{" "}
                    to display it here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="cv-auto bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0f0f0f]">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ Icon, name, desc }) => (
              <div key={name}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-lg">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff3b3b]/8 ring-1 ring-[#ff3b3b]/10">
                  <Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-[#0f0f0f]">{name}</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-500">{desc}</p>
                <a href={`https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20${encodeURIComponent(name)}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff3b3b] transition-colors hover:text-red-700">
                  Get Quote <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-gray-400">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="cv-auto bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0f0f0f]">Built on Trust & Quality</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map(({ Icon, title, desc }) => (
              <div key={title}
                className="rounded-2xl border border-gray-100 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff3b3b]/8 ring-1 ring-[#ff3b3b]/10">
                  <Icon className="h-5 w-5 text-[#ff3b3b]" />
                </div>
                <h3 className="mb-2 text-[15px] font-bold tracking-tight text-[#0f0f0f]">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section ref={reviewsRef} className="cv-auto bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0f0f0f]">What Our Customers Say</h2>
          </div>
          {reviewsReady ? (
            <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-gray-200" />}>
              <ReviewsList maxItems={6} />
            </Suspense>
          ) : (
            <div className="h-64 rounded-2xl bg-gray-100" />
          )}
          <div className="mt-10 text-center">
            <Link to="/reviews"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-gray-400">
              Write a Review <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cv-auto py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0f0f0f] px-8 py-16 text-center">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#ff3b3b]/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#ff3b3b]/5 blur-3xl" />
            </div>
            <div className="relative">
              <SectionLabel>Get Started</SectionLabel>
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white">Ready to Book a Service?</h2>
              <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-400">
                Share your details and our team will contact you with service guidance and pricing.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/booking"
                  className="rounded-xl bg-[#ff3b3b] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700">
                  Book Service Now
                </Link>
                <a href="tel:+919444484399"
                  className="flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30">
                  <Phone className="h-4 w-4" /> Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

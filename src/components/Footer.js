import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Phone, MapPin, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3b3b]">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div className="leading-none">
              <div className="text-lg font-black tracking-tight text-[#0f0f0f]">
                Sabari <span className="text-[#ff3b3b]">Auto</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">Workshop</p>
            </div>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-gray-600">
            Professional car service and repair support in Anna Nagar, Chennai. Simple service booking and trusted workshop assistance.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f0f0f]">Quick Links</h4>
          <div className="space-y-3">
            {[
              { label: "Home", path: "/" },
              { label: "Services", path: "/services" },
              { label: "Book Service", path: "/booking" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="block text-sm text-gray-600 transition-colors hover:text-[#ff3b3b]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f0f0f]">Contact</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <a href="tel:+919444484399" className="flex items-start gap-3 transition-colors hover:text-[#ff3b3b]">
              <Phone className="mt-0.5 h-4 w-4 text-[#ff3b3b]" /> +91 94444 84399
            </a>
            <a href="mailto:sabariauto009@gmail.com" className="flex items-start gap-3 transition-colors hover:text-[#ff3b3b]">
              <Mail className="mt-0.5 h-4 w-4 text-[#ff3b3b]" /> sabariauto009@gmail.com
            </a>
            <a
              href="https://maps.google.com/?q=Anna+Nagar+Chennai"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 transition-colors hover:text-[#ff3b3b]"
            >
              <MapPin className="mt-0.5 h-4 w-4 text-[#ff3b3b]" /> Anna Nagar, Chennai
            </a>
          </div>
          <a
            href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ff3b3b] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-gray-500 sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Sabari Auto Workshop. All rights reserved.</p>
          <p>Trusted car service in Chennai.</p>
        </div>
      </div>
    </footer>
  );
}

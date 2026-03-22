import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Phone, MapPin, Mail, MessageCircle } from "lucide-react";

const NAV = [
  { label: "Home",         path: "/" },
  { label: "Services",     path: "/services" },
  { label: "Book Service", path: "/booking" },
  { label: "Contact",      path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">

        {/* Brand */}
        <div>
          <Link to="/" className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff3b3b]">
              <Wrench className="h-4 w-4 text-white" />
            </div>
            <div className="leading-none">
              <p className="text-base font-black tracking-tight text-[#0f0f0f]">
                Sabari <span className="text-[#ff3b3b]">Auto</span>
              </p>
              <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400">Workshop</p>
            </div>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-gray-500">
            Professional car service and repair in Kallikuppam, Chennai. Trusted by 500+ customers since 2010.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0f0f0f]">Quick Links</h4>
          <div className="space-y-2.5">
            {NAV.map((item) => (
              <Link key={item.path} to={item.path}
                className="block text-sm text-gray-500 hover:text-[#ff3b3b] transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0f0f0f]">Contact</h4>
          <div className="space-y-2.5 text-sm text-gray-500">
            <a href="tel:+919444484399" className="flex items-center gap-2.5 hover:text-[#ff3b3b] transition-colors">
              <Phone className="h-4 w-4 text-[#ff3b3b] shrink-0" /> +91 94444 84399
            </a>
            <a href="mailto:sabariauto009@gmail.com" className="flex items-center gap-2.5 hover:text-[#ff3b3b] transition-colors">
              <Mail className="h-4 w-4 text-[#ff3b3b] shrink-0" /> sabariauto009@gmail.com
            </a>
            <a href="https://maps.google.com/?q=No.+41+Gangai+Nagar+Service+Road+Kamban+Street+Kallikuppam+Chennai+600053" target="_blank" rel="noreferrer"
              className="flex items-center gap-2.5 hover:text-[#ff3b3b] transition-colors">
              <MapPin className="h-4 w-4 text-[#ff3b3b] shrink-0" /> No. 41, Gangai Nagar, Kallikuppam, Chennai – 600053
            </a>
          </div>
          <a href="https://wa.me/919444484399?text=Hi%20Sabari%20Auto%2C%20I%20need%20car%20service"
            target="_blank" rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ff3b3b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Sabari Auto Workshop. All rights reserved.</p>
          <p className="text-xs text-gray-400">Chennai, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}

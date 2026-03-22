import React from "react";
import { MapPin, ExternalLink } from "lucide-react";

const MAPS_LINK = "https://maps.google.com/?q=No.+41+Gangai+Nagar+Service+Road+Kamban+Street+Kallikuppam+Chennai+600053";

export default function WorkshopMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff3b3b]/10">
          <MapPin className="h-7 w-7 text-[#ff3b3b]" />
        </div>
        <div>
          <p className="font-bold text-[#0f0f0f]">Sabari Auto Workshop</p>
          <p className="mt-0.5 text-sm text-gray-500">Kallikuppam, Chennai – 600053</p>
          <p className="mt-1 text-xs text-gray-400">Mon–Sat: 8 AM–8 PM · Sun: 9 AM–5 PM</p>
        </div>
        <a href={MAPS_LINK} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#ff3b3b] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">
          <ExternalLink className="h-4 w-4" /> Open in Google Maps
        </a>
      </div>
    </div>
  );
}

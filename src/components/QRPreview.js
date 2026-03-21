import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone, X, Wifi } from "lucide-react";

const LOCAL_IP = process.env.REACT_APP_LOCAL_IP || "10.18.167.234";
const PORT = "3000";
const url = `http://${LOCAL_IP}:${PORT}`;

export default function QRPreview() {
  const [open, setOpen] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-dark text-white p-3 rounded-full shadow-xl hover:bg-brand-red transition-colors flex items-center gap-2 pr-4"
        title="Scan QR to open on mobile"
      >
        <Smartphone className="w-5 h-5" />
        <span className="text-sm font-semibold">Mobile Preview</span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center relative animate-slide-up">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 mb-2">
              <Wifi className="w-5 h-5 text-brand-red" />
              <h3 className="font-bold text-brand-dark text-lg">Open on Mobile</h3>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Make sure your phone is on the <strong>same Wi-Fi</strong> as this PC, then scan:
            </p>

            {/* QR Code */}
            <div className="flex justify-center mb-4">
              <div className="p-3 border-4 border-brand-dark rounded-xl">
                <QRCodeSVG
                  value={url}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#1A1A1A"
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-1">Or open this URL on your phone:</p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-brand-red font-semibold text-sm hover:underline break-all"
            >
              {url}
            </a>

            <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
              ⚠️ This QR only works on your local network. Run <code className="font-mono bg-yellow-100 px-1 rounded">npm start</code> first.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

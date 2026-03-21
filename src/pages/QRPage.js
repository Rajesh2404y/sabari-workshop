import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone, Download, Share2, Copy, CheckCheck, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// ── Change this to your real domain once deployed ──────────────────────────
const SITE_URL = "https://sabariauto.in";

const pages = [
  { label: "Home",         path: "/",         desc: "Main website homepage" },
  { label: "Services",     path: "/services",  desc: "View all available workshop services" },
  { label: "Book Service", path: "/booking",   desc: "Book a car service online" },
  { label: "Contact Us",   path: "/contact",   desc: "Call, WhatsApp or visit us" },
];

export default function QRPage() {
  const [selected, setSelected] = useState(pages[0]);
  const [copied, setCopied] = useState(false);

  const fullUrl = `${SITE_URL}${selected.path}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = document.getElementById("qr-svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 400, 400);
      ctx.drawImage(img, 0, 0, 400, 400);
      const a = document.createElement("a");
      a.download = `sabari-auto-qr-${selected.label.toLowerCase().replace(/ /g, "-")}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Sabari Auto Workshop", url: fullUrl });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-brand-dark py-14 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Smartphone className="w-4 h-4" />
          Mobile Access
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Open on Your Phone</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Scan the QR code with your phone camera to instantly open Sabari Auto Workshop on mobile
        </p>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* ── QR Code Card ─────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-sm text-gray-500 mb-1 font-medium">Scanning opens:</p>
              <p className="text-brand-red font-bold text-lg mb-6">{selected.label}</p>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="p-4 border-4 border-brand-dark rounded-2xl bg-white shadow-inner">
                  <QRCodeSVG
                    id="qr-svg"
                    value={fullUrl}
                    size={220}
                    bgColor="#ffffff"
                    fgColor="#1A1A1A"
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: "",
                      excavate: false,
                    }}
                  />
                </div>
              </div>

              {/* URL display */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6">
                <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-600 truncate flex-1 text-left">{fullUrl}</span>
                <button
                  onClick={handleCopy}
                  className="text-brand-red hover:text-red-700 transition-colors shrink-0"
                  title="Copy link"
                >
                  {copied ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 bg-brand-dark text-white py-3 rounded-xl text-sm font-semibold hover:bg-brand-gray transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download QR
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Link
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                📱 Point your phone camera at the QR code — no app needed
              </p>
            </div>

            {/* ── Page Selector ────────────────────────────────────────── */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-brand-dark mb-2">Choose a Page to Share</h2>
              <p className="text-gray-500 text-sm mb-6">
                Select which page of the website you want the QR code to open on mobile.
              </p>

              {pages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => setSelected(page)}
                  className={`w-full text-left flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    selected.path === page.path
                      ? "border-brand-red bg-brand-red/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div>
                    <p className={`font-semibold text-sm ${selected.path === page.path ? "text-brand-red" : "text-brand-dark"}`}>
                      {page.label}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{page.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selected.path === page.path ? "border-brand-red bg-brand-red" : "border-gray-300"
                  }`}>
                    {selected.path === page.path && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </button>
              ))}

              {/* How to scan instructions */}
              <div className="bg-brand-dark rounded-xl p-5 mt-6">
                <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-brand-yellow" />
                  How to Scan
                </h3>
                <ol className="space-y-2 text-gray-400 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="bg-brand-red text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    Open your phone's default Camera app
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-brand-red text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    Point it at the QR code on screen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-brand-red text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    Tap the notification banner that appears
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-brand-red text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                    The website opens instantly in your browser!
                  </li>
                </ol>
                <p className="text-gray-500 text-xs mt-3">
                  Works on iPhone, Android, and all modern phones — no app required.
                </p>
              </div>

              <Link
                to="/booking"
                className="flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors w-full mt-2"
              >
                Book a Service Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

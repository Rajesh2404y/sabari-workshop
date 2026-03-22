import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const Footer       = lazy(() => import("./components/Footer"));

// All pages lazy-loaded — each becomes its own JS chunk
const Services     = lazy(() => import("./pages/Services"));
const Booking      = lazy(() => import("./pages/Booking"));
const Contact      = lazy(() => import("./pages/Contact"));
const About        = lazy(() => import("./pages/About"));
const Reviews      = lazy(() => import("./pages/Reviews"));
const QRPage       = lazy(() => import("./pages/QRPage"));
const Dashboard    = lazy(() => import("./pages/Dashboard"));
const AdminCoupons = lazy(() => import("./pages/admin/AdminCoupons"));

// Chatbot lazy-loaded AND deferred — loads after page is interactive
// This prevents it from contributing to TBT or blocking FCP
const Chatbot = lazy(() => import("./components/Chatbot"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-7 h-7 border-[3px] border-[#ff3b3b] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [chatReady, setChatReady] = useState(false);

  useEffect(() => {
    if (chatReady) return undefined;

    const activateChat = () => setChatReady(true);
    const events = ["pointerdown", "keydown", "touchstart", "scroll"];

    events.forEach((eventName) =>
      window.addEventListener(eventName, activateChat, { once: true, passive: true })
    );

    const id = setTimeout(activateChat, 15000);

    return () => {
      clearTimeout(id);
      events.forEach((eventName) =>
        window.removeEventListener(eventName, activateChat)
      );
    };
  }, [chatReady]);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"              element={<Home />} />
                <Route path="/services"      element={<Services />} />
                <Route path="/booking"       element={<Booking />} />
                <Route path="/contact"       element={<Contact />} />
                <Route path="/about"         element={<About />} />
                <Route path="/reviews"       element={<Reviews />} />
                <Route path="/qr"            element={<QRPage />} />
                <Route path="/dashboard"     element={<Dashboard />} />
                <Route path="/admin/coupons" element={<AdminCoupons />} />
              </Routes>
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          {/* Chatbot deferred until browser is idle — never blocks FCP/TBT */}
          {chatReady && (
            <Suspense fallback={null}>
              <Chatbot />
            </Suspense>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

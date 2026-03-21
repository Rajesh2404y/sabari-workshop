import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home         = lazy(() => import("./pages/Home"));
const Services     = lazy(() => import("./pages/Services"));
const Booking      = lazy(() => import("./pages/Booking"));
const Contact      = lazy(() => import("./pages/Contact"));
const About        = lazy(() => import("./pages/About"));
const QRPage       = lazy(() => import("./pages/QRPage"));
const Dashboard    = lazy(() => import("./pages/Dashboard"));
const AdminFeaturedCar = lazy(() => import("./pages/admin/AdminFeaturedCar"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"             element={<Home />} />
                <Route path="/services"     element={<Services />} />
                <Route path="/booking"      element={<Booking />} />
                <Route path="/contact"      element={<Contact />} />
                <Route path="/about"        element={<About />} />
                <Route path="/qr"           element={<QRPage />} />
                <Route path="/dashboard"    element={<Dashboard />} />
                <Route path="/admin/featured-car" element={<AdminFeaturedCar />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

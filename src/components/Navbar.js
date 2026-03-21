import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wrench, Phone, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AuthModal = lazy(() => import("./AuthModal"));

const NAV = [
  { label: "Home",         href: "/" },
  { label: "Services",     href: "/services" },
  { label: "Book Service", href: "/booking" },
  { label: "Reviews",      href: "/reviews" },
  { label: "Contact",      href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const location              = useLocation();
  const { user, profile, logout } = useAuth();

  useEffect(() => { setOpen(false); setUserMenu(false); }, [location]);

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
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

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV.map((item) => (
              <Link key={item.href} to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-[#0f0f0f]" : "text-gray-500 hover:text-[#0f0f0f]"
                }`}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <a href="tel:+919444484399"
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-[#0f0f0f] hover:border-gray-400 transition-colors">
              <Phone className="h-3.5 w-3.5" /> Call
            </a>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-[#0f0f0f] hover:bg-gray-50 transition-colors">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff3b3b] text-[10px] font-bold text-white">
                    {(profile?.name || user.displayName || "U")[0].toUpperCase()}
                  </div>
                  <span className="max-w-[80px] truncate">{profile?.name || user.displayName || "Account"}</span>
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      <LayoutDashboard className="h-4 w-4 text-[#ff3b3b]" /> Dashboard
                    </Link>
                    <button onClick={logout}
                      className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50">
                      <LogOut className="h-4 w-4 text-gray-400" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#ff3b3b] px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition-colors">
                <User className="h-3.5 w-3.5" /> Sign In
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="rounded-lg p-2 text-[#0f0f0f] hover:bg-gray-100 transition-colors md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div id="mobile-menu" className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
            <div className="space-y-1 mb-4">
              {NAV.map((item) => (
                <Link key={item.href} to={item.href}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.href) ? "bg-gray-100 text-[#0f0f0f]" : "text-gray-600 hover:bg-gray-50"
                  }`}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-2">
              <a href="tel:+919444484399"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-[#0f0f0f]">
                <Phone className="h-4 w-4" /> Call
              </a>
              {user ? (
                <Link to="/dashboard"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#ff3b3b] py-2.5 text-sm font-bold text-white">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              ) : (
                <button onClick={() => { setShowAuth(true); setOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#ff3b3b] py-2.5 text-sm font-bold text-white">
                  <User className="h-4 w-4" /> Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuth && (
        <Suspense fallback={null}>
          <AuthModal onClose={() => setShowAuth(false)} />
        </Suspense>
      )}
    </>
  );
}

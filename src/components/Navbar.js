import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wrench, Phone, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Book Service", href: "/booking" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const location = useLocation();
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    setOpen(false);
    setUserMenu(false);
  }, [location]);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0 flex items-center gap-3">
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

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-[#0f0f0f]" : "text-gray-500 hover:text-[#0f0f0f]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://wa.me/919444484399"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-[#0f0f0f] transition-colors hover:border-[#0f0f0f]"
            >
              WhatsApp
            </a>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-[#0f0f0f] transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff3b3b] text-xs font-bold text-white">
                    {(profile?.name || user.displayName || "U")[0].toUpperCase()}
                  </div>
                  <span className="max-w-[90px] truncate">{profile?.name || user.displayName || "Account"}</span>
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      <LayoutDashboard className="h-4 w-4 text-[#ff3b3b]" /> Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4 text-gray-400" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#ff3b3b] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
              >
                <User className="h-3.5 w-3.5" /> Sign In
              </button>
            )}
          </div>

          <button
            className="rounded-lg p-2 text-[#0f0f0f] transition-colors hover:bg-gray-100 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active ? "bg-gray-100 text-[#0f0f0f]" : "text-gray-600 hover:bg-gray-50 hover:text-[#0f0f0f]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://wa.me/919444484399"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-[#0f0f0f]"
              >
                WhatsApp
              </a>
              <a
                href="tel:+919444484399"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0f0f0f] px-4 py-3 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4" /> +91 94444 84399
              </a>
            </div>
          </div>
        )}
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}

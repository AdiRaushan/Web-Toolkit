/**
 * Navbar.jsx
 * Floating glassmorphism navigation bar for the multi-tool dashboard.
 * Uses the WebToolkit logo from assets.
 * Shows branding + navigation links using React Router.
 */

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Monitor, Search, Menu, X } from "lucide-react";
import logo from "../../assets/webtoolkit-logo.png";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/demo", label: "Demo Creator", icon: Monitor },
    { to: "/audit", label: "Website Audit", icon: Search },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[200] w-[95%] max-w-5xl transition-all duration-500 rounded-2xl
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.04] border border-slate-200/60"
            : "bg-white/60 backdrop-blur-lg border border-white/40"
        }`}
    >
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-[60px]">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <img
              src={logo}
              alt="WebToolkit"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600/10 text-blue-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/60"
                    }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100/60 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 border-t border-slate-200/40">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${
                    isActive
                      ? "bg-blue-600/10 text-blue-700"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/**
 * Navbar.jsx
 * Floating glassmorphism navigation bar for the multi-tool dashboard.
 * Uses the WebToolkit favicon diamond icon + text brand.
 * Shows branding + navigation links using React Router.
 * Supports `autoHide` prop: when true, the navbar hides off-screen
 * and only slides in when the user hovers at the top of the viewport.
 */

import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Monitor, Search, Menu, X } from "lucide-react";
import favicon from "/toolkit-favicon.svg";

const Navbar = ({ autoHide = false }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(!autoHide);

  const isDashboard = location.pathname === "/";
  const isHero = isDashboard && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoHide) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const onMouseMove = (e) => {
      if (e.clientY <= 80) setVisible(true);
      else if (e.clientY > 150) setVisible(false);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [autoHide]);

  const navLinks = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/demo", label: "Demo", icon: Monitor },
    { to: "/audit", label: "Audit", icon: Search },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 z-[200] w-[92%] sm:w-auto transition-all duration-500 rounded-full px-2 py-1.5 shadow-xl
          ${
            isHero
              ? "bg-white/10 backdrop-blur-xl border border-white/20 shadow-blue-900/10"
              : scrolled
                ? "bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-slate-200/40"
                : "bg-white border border-slate-100 shadow-slate-200/20"
          }`}
        style={{
          transform: `translateX(-50%) translateY(${visible ? "0" : "-120px"})`,
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4 px-3 sm:px-4 h-11 sm:h-12 w-full sm:w-auto">
          {/* Logo/Brand */}
          <Link
            to="/assets/logo.png"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <img
              src={favicon}
              alt="WebToolkit"
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
            <span
              className={`font-extrabold text-xs sm:text-base tracking-tight transition-colors ${
                isHero ? "text-white" : "text-slate-900"
              }`}
            >
              Web
              <span className={isHero ? "text-white" : "text-blue-500"}>
                -Toolkit
              </span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center">
            {navLinks.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
                    ${
                      isHero
                        ? isActive
                          ? "bg-white text-blue-600 shadow-md"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                        : isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-px bg-slate-200/50 hidden md:block mx-1" />

          {/* Action Button (Desktop Only) */}
          <Link
            to="/demo"
            className={`hidden md:flex px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-105
              ${
                isHero
                  ? "bg-white text-blue-700 hover:shadow-lg"
                  : "bg-slate-900 text-white hover:bg-black"
              }`}
          >
            Get Started
          </Link>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              isHero
                ? "text-white hover:bg-white/10"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[190] md:hidden transition-all duration-500 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 transition-all duration-500 transform ${
            mobileOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-white" : "text-slate-400"}
                  />
                  {label}
                </Link>
              );
            })}
            <Link
              to="/demo"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-2xl text-base font-extrabold shadow-lg"
            >
              Start Free Audit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

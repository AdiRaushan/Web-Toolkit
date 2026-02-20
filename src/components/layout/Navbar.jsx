/**
 * Navbar.jsx
 * Top navigation bar for the multi-tool dashboard.
 * Shows branding + navigation links using React Router.
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap, LayoutDashboard, Monitor, Search } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/demo", label: "Demo Creator", icon: Monitor },
    { to: "/audit", label: "Website Audit", icon: Search },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <Zap size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg tracking-tight">
                Web<span className="text-indigo-400">Toolkit</span>
              </span>
              <span className="block text-[10px] text-slate-500 font-medium tracking-widest uppercase -mt-0.5">
                Creator Studio
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                    ${
                      isActive
                        ? "bg-indigo-500/15 text-indigo-400 shadow-inner"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                >
                  <Icon size={16} />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

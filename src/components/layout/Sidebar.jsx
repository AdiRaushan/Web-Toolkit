/**
 * Sidebar.jsx
 * Optional sidebar component for future expansion.
 * Currently provides quick-action links and tool info.
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Monitor, Search, Home, Settings, HelpCircle } from "lucide-react";

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { to: "/", label: "Dashboard", icon: Home, description: "Main overview" },
    {
      to: "/demo",
      label: "Demo Creator",
      icon: Monitor,
      description: "Generate landing pages",
    },
    {
      to: "/audit",
      label: "Website Audit",
      icon: Search,
      description: "SEO & conversion check",
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[250]"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className="fixed top-0 left-0 bottom-0 w-72 bg-slate-900 border-r border-slate-800 z-[260] shadow-2xl transform transition-transform duration-300">
        <div className="p-6">
          <h3 className="text-white font-bold text-lg mb-1">Navigation</h3>
          <p className="text-slate-500 text-xs mb-6">Quick access to tools</p>

          <div className="space-y-2">
            {menuItems.map(({ to, label, icon: Icon, description }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={onClose}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-indigo-500/15 border border-indigo-500/30"
                        : "hover:bg-slate-800/60 border border-transparent"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                      ${
                        isActive
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-800 text-slate-400 group-hover:text-white"
                      }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <span
                      className={`block text-sm font-semibold ${
                        isActive ? "text-indigo-400" : "text-slate-300"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {description}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
          <p className="text-slate-600 text-xs">
            WebToolkit v1.0 • Creator Studio
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

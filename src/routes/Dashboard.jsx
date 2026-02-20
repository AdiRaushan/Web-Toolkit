/**
 * Dashboard.jsx
 * Main landing page for the WebToolkit Creator Studio.
 * Provides two primary actions: Demo Creator & Website Audit.
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Monitor,
  Search,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Star,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_70%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <Sparkles size={14} className="text-indigo-400" />
              <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">
                Creator Studio v1.0
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-center text-white tracking-tight leading-tight mb-6">
            Build Websites
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              In Minutes
            </span>
          </h1>

          <p className="text-slate-400 text-center text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
            Create stunning landing pages instantly or audit any website for SEO
            & conversion improvements — all from one powerful toolkit.
          </p>

          {/* Tool Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Demo Creator Card */}
            <Link
              to="/demo"
              className="group relative bg-slate-900/80 border border-slate-800/80 rounded-2xl p-8 hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all">
                  <Monitor size={24} className="text-white" />
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  Create Instant Demo
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Generate professional landing pages with customizable
                  templates. Choose from 8+ niches, 10 navbar styles, and 10
                  hero layouts.
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "8+ Niches",
                    "URL Auto-Fill",
                    "Live Preview",
                    "Export Ready",
                  ].map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm group-hover:gap-3 transition-all">
                  <span>Start Creating</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>

            {/* Audit Tool Card */}
            <Link
              to="/audit"
              className="group relative bg-slate-900/80 border border-slate-800/80 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 group-hover:scale-105 transition-all">
                  <Search size={24} className="text-white" />
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  Website Audit Report
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Instant SEO, security, and conversion analysis for any
                  website. Get actionable recommendations to improve
                  performance.
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "SEO Score",
                    "HTTPS Check",
                    "CTA Analysis",
                    "Fix Suggestions",
                  ].map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm group-hover:gap-3 transition-all">
                  <span>Run Audit</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Star, label: "Templates", value: "8+" },
              { icon: Zap, label: "Hero Styles", value: "10" },
              { icon: TrendingUp, label: "Audit Checks", value: "12+" },
              { icon: Shield, label: "SEO Rules", value: "15+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon size={20} className="text-slate-600 mx-auto mb-2" />
                <span className="block text-2xl font-black text-white">
                  {value}
                </span>
                <span className="block text-xs text-slate-500 uppercase tracking-wider font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800/60 py-6">
        <p className="text-center text-slate-600 text-xs">
          WebToolkit Creator Studio • Built with React + Vite
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

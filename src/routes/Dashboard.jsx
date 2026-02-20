/**
 * Dashboard.jsx
 * Premium SaaS landing page for WebToolkit Creator Studio.
 * Two AI-powered tools: Website Template Maker & Website Audit System.
 * Built for agencies, freelancers, and outreach specialists.
 */

import React, { useState, useEffect, useRef } from "react";
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
  Clock,
  AlertTriangle,
  FileX,
  Mail,
  Eye,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Palette,
  MousePointerClick,
  Wrench,
  Globe,
  Smartphone,
  CheckCircle,
  Users,
  Rocket,
  Target,
  Send,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Layers,
  Play,
} from "lucide-react";
import toolkitFavicon from "/toolkit-favicon.svg";
import heroImg from "../assets/hero-img.png";

/* ─── Color tokens ─── */
const C = {
  primary: "#1E40AF",
  accentFrom: "#3B82F6",
  accentTo: "#6366F1",
  dark: "#0F172A",
  muted: "#475569",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E2E8F0",
};

/* ─── Animated counter hook ─── */
const useCounter = (end, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return [count, ref];
};

/* ─── Scroll fade-in hook ─── */
const useFadeIn = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition =
      "opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

/* ─── Section Wrapper ─── */
const Section = ({ children, className = "", id }) => {
  const ref = useFadeIn();
  return (
    <section ref={ref} id={id} className={`px-5 sm:px-8 lg:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
};

/* ─── Heading ─── */
const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="text-center mb-16">
    {eyebrow && (
      <span
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
        style={{
          background: `${C.primary}10`,
          color: C.primary,
          border: `1px solid ${C.primary}20`,
        }}
      >
        <Sparkles size={13} />
        {eyebrow}
      </span>
    )}
    <h2
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5"
      style={{ color: C.dark }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        style={{ color: C.muted }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

/* ═════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════ */
const Dashboard = () => {
  const [openFaq, setOpenFaq] = useState(null);

  /* animated counters for hero */
  const [templates, templatesRef] = useCounter(50, 1800);
  const [audits, auditsRef] = useCounter(1200, 2200);
  const [hours, hoursRef] = useCounter(340, 2000);

  return (
    <div style={{ background: C.bg, fontFamily: "'Inter', sans-serif" }}>
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ height: "100vh", maxHeight: "100vh" }}
      >
        {/* ── Sky Gradient Background ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #3B8BF6 0%, #6BB3FE 30%, #96CFFF 50%, #c2e3ff 65%, #e8f3ff 80%, #F8FAFC 100%)",
          }}
        />

        {/* ── Soft cloud / light effects ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[5%] w-[600px] h-[300px] rounded-full bg-white/30 blur-[100px]" />
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[250px] rounded-full bg-white/25 blur-[80px]" />
          <div className="absolute top-[25%] left-[40%] w-[500px] h-[200px] rounded-full bg-white/20 blur-[90px]" />
        </div>

        {/* ── Hero Pill Navbar (inside hero) ── */}
        <div className="relative z-30 pt-4 flex justify-center">
          <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-2 py-1.5 shadow-lg shadow-blue-900/10">
            <Link to="/" className="flex items-center gap-2 px-3 py-1.5 mr-2">
              <img src={toolkitFavicon} alt="WebToolkit" className="w-6 h-6" />
              <span className="text-white font-extrabold text-sm tracking-tight hidden sm:inline">
                WebToolkit
              </span>
            </Link>
            {[
              { to: "/", label: "Dashboard" },
              { to: "/demo", label: "Demo" },
              { to: "/audit", label: "Audit" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 text-white/80 hover:text-white hover:bg-white/15"
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-5 bg-white/20 mx-1" />
            <Link
              to="/demo"
              className="ml-1 px-5 py-1.5 rounded-full bg-white text-blue-700 text-xs font-bold uppercase tracking-wide shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* ── Main Centered Content ── */}
        <div className="relative z-20 flex flex-col items-center text-center pt-6 sm:pt-8 lg:pt-10 px-5 sm:px-8">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-3 max-w-4xl">
            <span className="text-white/90" style={{ fontWeight: 400 }}>
              The rise{" "}
            </span>
            <span className="text-white" style={{ fontWeight: 400 }}>
              of{" "}
            </span>
            <span className="text-white font-extrabold">your websites</span>
            <br />
            <span className="text-white font-extrabold">begins here</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-sm sm:text-base max-w-lg leading-relaxed mb-5">
            A turnkey way to build & audit websites, designed with the global
            standards of digital excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link
              to="/demo"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-blue-700 font-bold text-sm shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
            >
              <Rocket size={15} />
              Open the Demo Creator
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
              href="#how-it-works"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white font-bold text-sm hover:bg-white/20 transition-all duration-300"
            >
              <Play size={13} />
              Join our Community
            </a>
          </div>
        </div>

        {/* ── Hero Landscape Image + Floating Cards Zone ── */}
        <div className="relative z-10 flex justify-center px-5 sm:px-8 lg:px-12">
          <div className="relative max-w-5xl w-full">
            {/* Landscape Hero Image */}
            <div className="relative w-full">
              <img
                src={heroImg}
                alt="WebToolkit Dashboard"
                className="w-full h-[280px] sm:h-[360px] lg:h-[440px] object-cover rounded-3xl shadow-2xl shadow-blue-900/20"
              />

              {/* Transparent Grid Overlay */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Subtle gradient overlay for card readability */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* ── Floating UI Cards (on top of image) ── */}

            {/* Card 1: Sites Audited (top-left) */}
            <div className="absolute top-[6%] left-[2%] lg:left-[3%] w-[160px] sm:w-[180px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/15 p-3 border border-white/60 animate-float-slow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Search size={12} className="text-blue-600" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">
                  Sites Audited
                </span>
              </div>
              <div className="flex items-end gap-1 h-10 mb-1.5">
                {[35, 50, 40, 65, 55, 80, 70, 92].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{
                      height: `${h}%`,
                      background:
                        i >= 6
                          ? "linear-gradient(to top, #3B82F6, #6366F1)"
                          : "#E2E8F0",
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp size={10} className="text-green-500" />
                <span className="text-[9px] font-bold text-green-600">
                  1,200+
                </span>
                <span className="text-[8px] text-slate-400 ml-auto">
                  this month
                </span>
              </div>
            </div>

            {/* Card 2: Clients Converted (top-right) */}
            <div className="absolute top-[5%] right-[2%] lg:right-[3%] w-[170px] sm:w-[185px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/15 p-3 border border-white/60 animate-float-medium">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users size={12} className="text-purple-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-800">
                    Clients Converted
                  </span>
                  <span className="block text-[8px] text-slate-400">
                    from audit outreach
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-500 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold text-slate-700 block">
                    +127% reply rate
                  </span>
                  <span className="text-[8px] text-slate-400">
                    vs cold outreach
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Templates Built (bottom-left) */}
            <div className="absolute bottom-[8%] left-[2%] lg:left-[4%] w-[150px] sm:w-[165px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/15 p-3 border border-white/60 animate-float-medium">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Monitor size={12} className="text-emerald-600" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">
                  Templates
                </span>
              </div>
              <span className="text-xl font-black text-slate-900 block">
                50+
                <span className="text-[10px] font-medium text-slate-400 ml-1">
                  niches
                </span>
              </span>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles size={10} className="text-blue-500" />
                <span className="text-[9px] font-bold text-blue-600">
                  AI-generated
                </span>
                <span className="text-[8px] text-slate-400 ml-auto">
                  in seconds
                </span>
              </div>
            </div>

            {/* Card 4: SEO Score (bottom-right) */}
            <div className="absolute bottom-[8%] right-[2%] lg:right-[4%] w-[150px] sm:w-[165px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/15 p-3 border border-white/60 animate-float-slow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Shield size={12} className="text-amber-600" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">
                  SEO Score
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray="94.2"
                      strokeDashoffset="7.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-900">
                    92
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                    A+
                  </span>
                  <span className="block text-[8px] text-slate-400 mt-0.5">
                    Excellent
                  </span>
                </div>
              </div>
            </div>

            {/* Card 5: Hours Saved (center) */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[120px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/15 p-3 border border-white/60 animate-float-slow hidden md:block">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Clock size={12} className="text-indigo-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-800">
                  Time Saved
                </span>
              </div>
              <span className="text-lg font-black text-slate-900 block text-center">
                340+
                <span className="text-[9px] font-medium text-slate-400 ml-0.5">
                  hrs
                </span>
              </span>
              <span className="text-[8px] text-slate-400 block text-center">
                per agency / month
              </span>
            {/* ── Trust Indicator Row (Bottom Right Corner of Image) ── */}
            <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end text-right bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-lg hidden sm:flex">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex -space-x-1.5">
                  {[
                    "from-blue-400 to-indigo-500",
                    "from-fuchsia-400 to-purple-500",
                    "from-amber-400 to-orange-500",
                    "from-emerald-400 to-teal-500",
                  ].map((g, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${g} border-2 border-white shadow-sm`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-[10px] font-bold text-white mt-0.5">Trusted by 500+ agencies</span>
            </div>
          </div>
        </div>

        {/* Pagination dots (Moved below image container but kept minimal) */}
        <div className="relative z-20 flex justify-center mt-4 pb-2">
           <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-blue-600" : "bg-slate-300"}`} />
            ))}
          </div>
        </div>

        {/* ── Downward V-Curve ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: "60px", display: "block" }}
          >
            <path d="M0,0 Q720,120 1440,0 L1440,120 L0,120 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ═══════════════ 2. PROBLEM ═══════════════ */}
      <Section className="py-20 lg:py-28" id="problem">
        <SectionHeading
          eyebrow="The Problem"
          title={
            <>
              Most Agencies Lose Deals <br className="hidden sm:block" />
              Before They Even Reply.
            </>
          }
          subtitle="Your outreach is competing with hundreds of others. Without a quick way to prove value, your messages get ignored."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: FileX,
              label: "No quick website mockup",
              desc: "Prospects can't visualize what you'd build them.",
            },
            {
              icon: Clock,
              label: "Manual audits take hours",
              desc: "Time you could spend closing deals, wasted on analysis.",
            },
            {
              icon: Mail,
              label: "Outreach feels generic",
              desc: "Cookie-cutter messages blend into the inbox noise.",
            },
            {
              icon: Eye,
              label: "Prospects ignore messages",
              desc: "Without a hook, your pitch gets scrolled past.",
            },
          ].map(({ icon: Icon, label, desc }, i) => (
            <div
              key={i}
              className="group rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                boxShadow: `0 1px 3px ${C.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors"
                style={{ background: "#FEE2E2", color: "#EF4444" }}
              >
                <Icon size={22} />
              </div>
              <h3
                className="text-base font-bold mb-2"
                style={{ color: C.dark }}
              >
                {label}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 3. SOLUTION ═══════════════ */}
      <Section className="py-20 lg:py-28" id="solution">
        <SectionHeading
          eyebrow="The Solution"
          title={
            <>
              Two Smart Tools.{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${C.accentFrom}, ${C.accentTo})`,
                }}
              >
                One Growth System.
              </span>
            </>
          }
          subtitle="Everything you need to turn cold outreach into signed clients."
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Card 1: Template Maker */}
          <div
            className="group rounded-[20px] p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            {/* Accent top bar */}
            <div
              className="absolute top-0 left-0 w-full h-1.5 rounded-t-[20px]"
              style={{
                background: `linear-gradient(90deg, ${C.accentFrom}, ${C.accentTo})`,
              }}
            />

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: `linear-gradient(135deg, ${C.accentFrom}, ${C.accentTo})`,
                boxShadow: `0 8px 24px ${C.accentFrom}25`,
              }}
            >
              <Monitor size={26} className="text-white" />
            </div>

            <h3
              className="text-2xl font-extrabold mb-3"
              style={{ color: C.dark }}
            >
              Website Template Maker
            </h3>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: C.muted }}
            >
              Generate clean, modern website previews tailored to your
              prospect's niche in minutes.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Layers, text: "Industry-based templates" },
                { icon: Palette, text: "Editable sections" },
                { icon: Globe, text: "Instant preview link" },
                { icon: Smartphone, text: "Mobile responsive" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 py-2">
                  <Icon size={16} style={{ color: C.accentFrom }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: C.dark }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Time Saved Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: `${C.accentFrom}08`,
                border: `1px solid ${C.accentFrom}15`,
              }}
            >
              <Clock size={14} style={{ color: C.accentFrom }} />
              <span className="text-xs font-bold" style={{ color: C.primary }}>
                Saves 8–12 hours per client
              </span>
            </div>

            <div className="mt-8">
              <Link
                to="/demo"
                className="group/cta inline-flex items-center gap-2 font-bold text-sm hover:gap-3 transition-all"
                style={{ color: C.accentFrom }}
              >
                Start Creating{" "}
                <ArrowRight
                  size={16}
                  className="group-hover/cta:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Card 2: Audit System */}
          <div
            className="group rounded-[20px] p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1.5 rounded-t-[20px]"
              style={{
                background: `linear-gradient(90deg, ${C.accentTo}, #8B5CF6)`,
              }}
            />

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: `linear-gradient(135deg, ${C.accentTo}, #8B5CF6)`,
                boxShadow: `0 8px 24px ${C.accentTo}25`,
              }}
            >
              <Search size={26} className="text-white" />
            </div>

            <h3
              className="text-2xl font-extrabold mb-3"
              style={{ color: C.dark }}
            >
              Website Audit System
            </h3>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: C.muted }}
            >
              Analyze any website instantly and generate actionable improvement
              reports.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: BarChart3, text: "Performance score" },
                { icon: Palette, text: "Design analysis" },
                { icon: MousePointerClick, text: "Conversion insights" },
                { icon: Wrench, text: "Technical suggestions" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 py-2">
                  <Icon size={16} style={{ color: C.accentTo }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: C.dark }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: `${C.accentTo}08`,
                border: `1px solid ${C.accentTo}15`,
              }}
            >
              <Zap size={14} style={{ color: C.accentTo }} />
              <span className="text-xs font-bold" style={{ color: C.accentTo }}>
                Audit in under 60 seconds
              </span>
            </div>

            <div className="mt-8">
              <Link
                to="/audit"
                className="group/cta inline-flex items-center gap-2 font-bold text-sm hover:gap-3 transition-all"
                style={{ color: C.accentTo }}
              >
                Run Audit{" "}
                <ArrowRight
                  size={16}
                  className="group-hover/cta:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 4. HOW IT WORKS ═══════════════ */}
      <Section className="py-20 lg:py-28" id="how-it-works">
        <SectionHeading
          eyebrow="How It Works"
          title="Three Steps to Closing More Clients"
          subtitle="A streamlined workflow that turns cold prospects into paying clients."
        />

        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-[60px] left-[16.66%] right-[16.66%] h-[2px]"
            style={{
              background: `linear-gradient(90deg, ${C.accentFrom}, ${C.accentTo})`,
              opacity: 0.2,
            }}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Globe,
                title: "Enter Prospect Website",
                desc: "Paste any website URL and our system instantly analyzes the prospect's online presence.",
                color: C.accentFrom,
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Generate Template or Audit",
                desc: "Choose to create a stunning website preview or a comprehensive audit report in seconds.",
                color: C.primary,
              },
              {
                step: "03",
                icon: Send,
                title: "Send Preview & Close Deal",
                desc: "Share the personalized preview with your prospect and watch your reply rates soar.",
                color: C.accentTo,
              },
            ].map(({ step, icon: Icon, title, desc, color }, i) => (
              <div key={i} className="relative text-center group">
                {/* Step Circle */}
                <div className="relative mx-auto mb-8">
                  <div
                    className="w-[120px] h-[120px] mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `${color}08`,
                      border: `2px solid ${color}20`,
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                        boxShadow: `0 8px 24px ${color}30`,
                      }}
                    >
                      <Icon size={28} className="text-white" />
                    </div>
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                    }}
                  >
                    {step}
                  </div>
                </div>

                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: C.dark }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-xs mx-auto"
                  style={{ color: C.muted }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ 5. BENEFITS GRID ═══════════════ */}
      <Section className="py-20 lg:py-28" id="benefits">
        <SectionHeading
          eyebrow="Why It Works"
          title="Measurable Impact on Your Growth"
          subtitle="Real results that agencies and freelancers experience every day."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: TrendingUp,
              title: "3X Reply Rate",
              desc: "Increase outreach response with personalized previews.",
              color: C.accentFrom,
            },
            {
              icon: Clock,
              title: "Save 10+ Hours Weekly",
              desc: "Automate what used to take days of manual work.",
              color: "#22c55e",
            },
            {
              icon: Rocket,
              title: "Close Deals Faster",
              desc: "Move prospects from cold to signed in record time.",
              color: C.accentTo,
            },
            {
              icon: Sparkles,
              title: "Automate First Impression",
              desc: "Create stunning first touchpoints automatically.",
              color: "#F59E0B",
            },
            {
              icon: Target,
              title: "Stand Out in Inbox",
              desc: "Break through the noise with visual-first outreach.",
              color: C.primary,
            },
            {
              icon: Users,
              title: "Scale Outreach Smarter",
              desc: "Handle more prospects without hiring more people.",
              color: "#8B5CF6",
            },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={i}
              className="group rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ background: `${color}10`, color }}
              >
                <Icon size={22} />
              </div>
              <h3
                className="text-base font-bold mb-2"
                style={{ color: C.dark }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 6. FAQ ═══════════════ */}
      <Section className="py-20 lg:py-28" id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our platform."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: "Is this for agencies only?",
              a: "Not at all! While it's built with agencies in mind, freelancers, consultants, and anyone who does client outreach will find these tools incredibly useful.",
            },
            {
              q: "Do I need coding skills?",
              a: "Zero coding required. Simply enter a URL, choose your options, and the tools generate everything automatically. It's designed to be as simple as filling out a form.",
            },
            {
              q: "Can I customize templates?",
              a: "Absolutely. Every template is fully editable — change colors, content, images, layouts, and more using our visual customizer panel. Make it match any brand perfectly.",
            },
            {
              q: "How accurate is the audit?",
              a: "Our audit system checks 12+ ranking factors including SEO, performance, security, mobile-friendliness, and conversion elements. It provides actionable scores and specific fix suggestions.",
            },
            {
              q: "Is it mobile friendly?",
              a: "Yes! Both the platform itself and all generated templates are fully responsive and look great on any device — phones, tablets, and desktops.",
            },
          ].map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-[16px] overflow-hidden transition-all duration-300"
              style={{
                background: C.card,
                border: `1px solid ${openFaq === i ? `${C.accentFrom}30` : C.border}`,
                boxShadow:
                  openFaq === i ? `0 4px 20px ${C.accentFrom}08` : "none",
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-7 py-5 text-left transition-colors"
              >
                <span
                  className="text-sm sm:text-base font-bold pr-4"
                  style={{ color: C.dark }}
                >
                  {q}
                </span>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    background:
                      openFaq === i ? `${C.accentFrom}10` : `${C.border}60`,
                    color: openFaq === i ? C.accentFrom : C.muted,
                  }}
                >
                  {openFaq === i ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openFaq === i ? "200px" : "0",
                  opacity: openFaq === i ? 1 : 0,
                }}
              >
                <p
                  className="px-7 pb-6 text-sm leading-relaxed"
                  style={{ color: C.muted }}
                >
                  {a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 7. FINAL CTA ═══════════════ */}
      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div
          className="max-w-5xl mx-auto relative rounded-[24px] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.accentFrom}, ${C.accentTo})`,
          }}
        >
          {/* Decorative */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-white" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl bg-white" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative text-center py-16 px-8 sm:py-20 sm:px-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Ready to Turn Outreach
              <br className="hidden sm:block" /> Into Revenue?
            </h2>
            <p className="text-blue-100/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join hundreds of agencies already closing more deals with smart
              website previews and instant audits.
            </p>
            <Link
              to="/demo"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
              style={{ background: C.card, color: C.primary }}
            >
              Start Using the Tools
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. FOOTER ═══════════════ */}
      <footer className="relative overflow-hidden pt-16 pb-10">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${C.bg}, ${C.primary}06)`,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={toolkitFavicon}
                  alt="WebToolkit"
                  className="w-11 h-11"
                />
                <div>
                  <span
                    className="text-xl font-extrabold"
                    style={{ color: C.dark }}
                  >
                    Web<span style={{ color: C.accentFrom }}>Toolkit</span>
                  </span>
                  <span
                    className="block text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: C.muted }}
                  >
                    Creator Studio
                  </span>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed mb-6 max-w-xs"
                style={{ color: C.muted }}
              >
                Empowering agencies and freelancers to close more clients with
                AI-powered website tools.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      background: `${C.primary}08`,
                      color: C.muted,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: C.dark }}
              >
                Tools
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Website Template Maker", to: "/demo" },
                  { label: "Website Audit System", to: "/audit" },
                ].map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="group flex items-center gap-2 text-sm font-medium transition-colors hover:translate-x-0.5 duration-200"
                    style={{ color: C.muted }}
                  >
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: C.accentFrom }}
                    />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: C.dark }}
              >
                Contact
              </h4>
              <a
                href="mailto:hello@webtoolkit.studio"
                className="text-sm font-medium transition-colors"
                style={{ color: C.muted }}
              >
                hello@webtoolkit.studio
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            <span className="text-xs" style={{ color: `${C.muted}80` }}>
              © {new Date().getFullYear()} WebToolkit Creator Studio. All rights
              reserved.
            </span>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((text) => (
                <a
                  key={text}
                  href="#"
                  className="text-xs font-medium transition-colors hover:underline"
                  style={{ color: `${C.muted}80` }}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

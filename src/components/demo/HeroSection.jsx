import React from "react";
import {
  Zap,
  Video,
  Star,
  CheckCircle,
  TrendingUp,
  Monitor,
  Users,
  Target,
} from "lucide-react";

const HeroSection = ({ customBrand, theme }) => {
  return (
    <div
      className={`relative overflow-hidden w-full 
      ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) ? "min-h-screen flex items-center" : "pt-36 pb-20 lg:pt-48 lg:pb-28"}
      ${customBrand.navbarStyle === "transparent" ? "bg-slate-900" : "bg-gradient-to-b from-white via-slate-50/50 to-white"}
      `}
    >
      {/* Pattern / Backgrounds — Premium Mesh Gradient */}
      {!["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/30 via-transparent to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-rose-100/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        </>
      )}

      {/* --- FULLSCREEN IMAGE HERO --- */}
      {customBrand.heroStyle === "fullscreen" && (
        <div className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-10`}
          ></div>
          <img
            src={customBrand.heroImage}
            className="w-full h-full object-cover"
            alt="Hero"
          />
        </div>
      )}

      {/* --- VIDEO BACKGROUND HERO --- */}
      {customBrand.heroStyle === "video" && (
        <div className="absolute inset-0 z-0 bg-slate-900">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover opacity-60"
            alt="Video Background"
          />
        </div>
      )}

      {/* --- CAROUSEL HERO --- */}
      {customBrand.heroStyle === "carousel" && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/20 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover"
            alt="Carousel"
          />
          <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2">
            <div className="w-12 h-1 bg-white rounded-full"></div>
            <div className="w-3 h-1 bg-white/50 rounded-full"></div>
            <div className="w-3 h-1 bg-white/50 rounded-full"></div>
          </div>
        </div>
      )}

      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 relative z-10 ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) ? "text-white" : ""}`}
      >
        {/* --- CENTERED STYLE --- */}
        {customBrand.heroStyle === "centered" && (
          <div className="text-center max-w-4xl mx-auto">
            <div
              className={`inline-flex items-center gap-2 py-2 px-5 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-8 border ${theme.lightBorder}`}
            >
              <Zap size={14} />
              {customBrand.tagline}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
              {customBrand.heroTitle} <br />
              <span className={`${theme.text} relative`}>
                {customBrand.heroSpan}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 opacity-20"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 7 Q50 0 100 4 Q150 8 200 1"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
              {customBrand.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                className={`${theme.bg} text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all shadow-xl ${theme.shadow}`}
              >
                Get Started
              </button>
              <button
                className={`bg-white text-slate-800 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all`}
              >
                Learn More
              </button>
            </div>
            <div className="relative">
              <div
                className={`absolute -inset-4 ${theme.bg} rounded-3xl opacity-10 blur-2xl`}
              ></div>
              <img
                src={customBrand.heroImage}
                alt="Hero Visual"
                className="relative w-full rounded-2xl shadow-2xl border border-slate-200/60 max-h-[520px] object-cover"
              />
            </div>
          </div>
        )}

        {/* --- FULLSCREEN / VIDEO / CAROUSEL CONTENT --- */}
        {["fullscreen", "video", "carousel"].includes(
          customBrand.heroStyle,
        ) && (
          <div className="max-w-3xl relative">
            <div
              className={`inline-flex items-center gap-2 py-2 px-4 border border-white/20 rounded-full backdrop-blur-md text-white/90 text-xs font-bold uppercase tracking-wider mb-8 bg-white/5`}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              {customBrand.tagline}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05] drop-shadow-lg">
              {customBrand.heroTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                {customBrand.heroSpan}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200/90 mb-12 leading-relaxed font-medium max-w-2xl drop-shadow-md">
              {customBrand.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className={`${theme.bg} border-2 border-transparent text-white px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all shadow-xl`}
              >
                Start Now
              </button>
              <button
                className={`border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-all`}
              >
                Watch Video
              </button>
            </div>
            {/* Scroll indicator */}
            <div className="absolute -bottom-20 left-0 flex flex-col items-center gap-2 text-white/40">
              <span className="text-[10px] uppercase tracking-widest">
                Scroll
              </span>
              <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1">
                <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}

        {/* --- GRID STYLE --- */}
        {customBrand.heroStyle === "grid" && (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
              >
                {customBrand.tagline}
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                {customBrand.heroTitle} <br />
                <span className={theme.text}>{customBrand.heroSpan}</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-md">
                {customBrand.heroDesc}
              </p>
              <div className="flex gap-4">
                <button
                  className={`${theme.bg} text-white px-8 py-4 rounded-xl shadow-lg font-bold text-sm uppercase tracking-wider hover:scale-105 transition-all`}
                >
                  Explore More
                </button>
                <button
                  className={`bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-sm border-2 border-slate-200 hover:border-slate-300 transition-all`}
                >
                  View Plans
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(
                customBrand.gridImages || [
                  customBrand.heroImage,
                  customBrand.heroImage,
                  customBrand.heroImage,
                  customBrand.heroImage,
                ]
              ).map((img, i) => (
                <div
                  key={i}
                  className={`relative group overflow-hidden rounded-2xl shadow-lg ${i === 0 || i === 3 ? "mt-8" : ""} ${i === 3 ? "mt-[-1rem]" : ""}`}
                >
                  <img
                    src={
                      img ||
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
                    }
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={`Grid ${i}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- FORM LEFT STYLE --- */}
        {customBrand.heroStyle === "form_left" && (
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-2xl border border-slate-100/80 z-20 relative">
              <div
                className={`absolute top-0 left-0 w-full h-1.5 ${theme.bg} rounded-t-2xl`}
              ></div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.lightBg} ${theme.text} text-[10px] font-bold uppercase tracking-widest mb-4`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                Limited Spots
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Get Started Today
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Fill in your details for a free consultation
              </p>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-indigo-300 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-indigo-300 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-indigo-300 transition-colors"
                />
                <button
                  className={`w-full ${theme.bg} text-white p-4 rounded-xl font-bold uppercase text-sm tracking-wider hover:scale-[1.02] transition-all shadow-lg ${theme.shadow}`}
                >
                  Join Now — It's Free
                </button>
              </form>
              <p className="text-center text-slate-400 text-[11px] mt-3">
                🔒 Your data is safe with us
              </p>
            </div>
            <div className="lg:col-span-7 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1]">
                {customBrand.heroTitle}{" "}
                <span className={theme.text}>{customBrand.heroSpan}</span>
              </h1>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-lg">
                {customBrand.heroDesc}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: Zap,
                    label: "Fast Results",
                    desc: "See progress in weeks",
                  },
                  {
                    icon: Target,
                    label: "Precise",
                    desc: "Targeted approach",
                  },
                  {
                    icon: Users,
                    label: "Expert Led",
                    desc: "Top-tier faculty",
                  },
                ].map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <Icon className={`${theme.text} mb-2`} size={22} />
                    <span className="font-bold text-slate-800 text-sm block">
                      {label}
                    </span>
                    <span className="text-slate-400 text-xs">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- DIAGONAL STYLE --- */}
        {customBrand.heroStyle === "diagonal" && (
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="z-20">
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
              >
                <TrendingUp size={14} />
                Trending Now
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 leading-[1.05]">
                {customBrand.heroTitle}
              </h1>
              <h2
                className={`text-4xl md:text-6xl font-black ${theme.text} mb-8`}
              >
                {customBrand.heroSpan}
              </h2>
              <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed">
                {customBrand.heroDesc}
              </p>
              <div className="flex gap-4">
                <button
                  className={`${theme.bg} text-white px-10 py-4 rounded-none skew-x-[-8deg] font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-all ${theme.shadow}`}
                >
                  <span className="skew-x-[8deg] inline-block">
                    Start Journey
                  </span>
                </button>
                <button
                  className={`bg-white text-slate-800 px-8 py-4 rounded-none skew-x-[-8deg] font-bold text-sm uppercase border-2 border-slate-200 hover:border-slate-300 transition-all`}
                >
                  <span className="skew-x-[8deg] inline-block">Learn More</span>
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100 lg:block hidden skew-x-[-8deg] origin-top translate-x-24 overflow-hidden shadow-2xl">
              <img
                src={customBrand.heroImage}
                className="w-full h-full object-cover skew-x-[8deg] scale-[1.2] translate-x-[-80px]"
                alt="Diagonal Hero"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10 skew-x-[8deg]"></div>
            </div>
          </div>
        )}

        {/* --- MONITOR / DIGITAL STYLE --- */}
        {customBrand.heroStyle === "monitor" && (
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-8 border ${theme.lightBorder}`}
            >
              <Monitor size={14} />
              {customBrand.tagline}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
              {customBrand.heroTitle}{" "}
              <span className={theme.text}>{customBrand.heroSpan}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed">
              {customBrand.heroDesc}
            </p>

            {/* Monitor frame — more polished */}
            <div className="relative mx-auto max-w-lg md:max-w-2xl">
              <div className="absolute -inset-8 bg-gradient-to-b from-indigo-100/40 to-transparent rounded-3xl blur-2xl"></div>
              <div className="relative bg-slate-800 rounded-t-2xl p-1.5 border-2 border-slate-700 shadow-2xl">
                {/* Browser dots */}
                <div className="flex items-center gap-1.5 px-3 py-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <div className="flex-1 mx-3 h-6 bg-slate-700 rounded-md flex items-center px-3">
                    <span className="text-[10px] text-slate-400 truncate">
                      {customBrand.tagline || "yourwebsite.com"}
                    </span>
                  </div>
                </div>
                <div className="rounded-b-lg overflow-hidden">
                  <img
                    src={customBrand.heroImage}
                    className="w-full h-[200px] md:h-[340px] object-cover"
                    alt="Website preview"
                  />
                </div>
              </div>
              <div className="relative mx-auto bg-slate-700 rounded-b-2xl h-5 max-w-[70%] border-2 border-t-0 border-slate-600">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-16 h-2 bg-slate-600"></div>
              </div>
              {/* Stand */}
              <div className="mx-auto w-20 h-6 bg-gradient-to-b from-slate-600 to-slate-500 rounded-b-lg"></div>
            </div>
          </div>
        )}

        {/* --- SPLIT / DEFAULT STYLE --- */}
        {(customBrand.heroStyle === "split" || !customBrand.heroStyle) && (
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-5 text-center lg:text-left pt-10 lg:pt-0">
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
              >
                <Star size={14} />
                {customBrand.tagline}
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-[3.2rem] font-black tracking-tight text-slate-900 mb-6 leading-[1.1]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {customBrand.heroTitle} <br />
                <span className={theme.text}>{customBrand.heroSpan}</span>
              </h1>

              <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                {customBrand.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <button
                  className={`${theme.bg} text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all shadow-xl ${theme.shadow}`}
                >
                  Talk to an Expert
                </button>
                <button
                  className={`bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:border-slate-300 hover:shadow-lg transition-all`}
                >
                  Get Guidance
                </button>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "18+ Years Exp.", icon: CheckCircle },
                  { label: "Computer/Paper", icon: CheckCircle },
                  { label: "45,000+ Students", icon: CheckCircle },
                  { label: "1-on-1 Sessions", icon: CheckCircle },
                ].map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-slate-600 font-semibold"
                  >
                    <Icon size={16} className={theme.text} /> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Form / Visual */}
            <div className="lg:col-span-7 flex flex-col md:flex-row items-center justify-center lg:justify-end relative mt-12 lg:mt-0 h-full min-h-[500px]">
              {/* Person/Background Image for Split */}
              <div className="absolute left-0 top-0 w-[88%] h-full hidden md:block rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={
                    customBrand.heroImage ||
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Hero Visual"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
              </div>

              {/* Form Container - Overlapping */}
              <div
                className={`relative bg-white/95 backdrop-blur-sm p-7 rounded-2xl shadow-2xl border ${theme.lightBorder} z-20 w-full max-w-md md:translate-x-10 md:translate-y-6`}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1.5 ${theme.bg} rounded-t-2xl`}
                ></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Speak to Our Expert
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  Get a free consultation for your study abroad journey.
                </p>

                <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-300 transition-colors text-sm`}
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-300 transition-colors text-sm`}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Service Interest
                    </label>
                    <select
                      className={`w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-300 transition-colors text-slate-600 text-sm`}
                    >
                      <option>IELTS Coaching</option>
                      <option>Study Abroad</option>
                      <option>PTE / TOEFL</option>
                    </select>
                  </div>
                  <button
                    className={`w-full ${theme.bg} text-white font-bold py-4 rounded-xl uppercase tracking-wider hover:scale-[1.02] transition-all shadow-lg ${theme.shadow}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    Get Instant Call Back
                  </button>
                </form>
                <p className="text-center text-slate-400 text-[11px] mt-3">
                  🔒 Your data is safe with us
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- CLASSIC STYLE --- */}
        {customBrand.heroStyle === "classic" && (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
              >
                <Star size={14} /> Top Rated
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                {customBrand.heroTitle} <br />
                <span className={theme.text}>{customBrand.heroSpan}</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium max-w-md">
                {customBrand.heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`${theme.bg} text-white px-10 py-4 rounded-xl shadow-lg font-bold text-sm uppercase tracking-wider hover:scale-105 hover:shadow-2xl transition-all ${theme.shadow}`}
                >
                  Get Started
                </button>
                <button className="flex items-center gap-3 text-slate-700 font-bold hover:opacity-80 transition-opacity">
                  <div
                    className={`w-12 h-12 rounded-full ${theme.lightBg} flex items-center justify-center shadow-sm border ${theme.lightBorder}`}
                  >
                    <Video size={18} className={theme.text} />
                  </div>
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div
                className={`absolute -inset-6 ${theme.bg} rounded-3xl opacity-10 blur-3xl`}
              ></div>
              <img
                src={customBrand.heroImage}
                className="relative rounded-2xl shadow-2xl border border-slate-200/60 w-full h-[450px] object-cover"
                alt="Classic Hero"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white"></div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-white"></div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white"></div>
                </div>
                <div>
                  <span className="text-sm font-black text-slate-800">
                    <span className={theme.text}>1,200+</span>
                  </span>
                  <span className="block text-xs text-slate-400">
                    Students Enrolled
                  </span>
                </div>
              </div>
              {/* Rating badge */}
              <div className="absolute -top-3 -right-3 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">4.9</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;

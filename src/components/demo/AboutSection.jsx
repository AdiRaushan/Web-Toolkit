import React from "react";
import { Users, CheckCircle, ArrowRight } from "lucide-react";

const AboutSection = ({ sectionDesigns, customBrand, theme }) => {
  const aboutVariant = sectionDesigns.about;
  const aboutDesc =
    customBrand.aboutDescription ||
    "We are passionate about delivering excellence. With years of experience and a dedicated team, we've built a legacy of trust, innovation, and results that speak for themselves.";
  const founderName = customBrand.founderName || "Our Leader";
  const founderTitle = customBrand.founderTitle || "Founder & CEO";
  const aboutImage =
    customBrand.heroImage ||
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";

  return (
    <div
      className={`py-24 relative overflow-hidden ${aboutVariant === "split_50" ? "" : "bg-white"}`}
      id="about"
    >
      <div
        className={
          aboutVariant === "split_50"
            ? ""
            : "max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        }
      >
        {/* ── Variant: img_left ── */}
        {aboutVariant === "img_left" && (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div
                className={`absolute -inset-4 ${theme.bg} rounded-3xl opacity-10 blur-2xl`}
              ></div>
              <img
                src={aboutImage}
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                alt="About"
              />
            </div>
            <div>
              <div
                className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
              >
                <Users size={14} /> About Us
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The Story Behind <br />
                <span className={theme.text}>{customBrand.logoText}</span>
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed font-medium">
                {aboutDesc}
              </p>
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div
                  className={`w-12 h-12 rounded-full ${theme.bg} flex items-center justify-center text-white font-bold`}
                >
                  {founderName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{founderName}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    {founderTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Variant: img_right ── */}
        {(aboutVariant === "img_right" || !aboutVariant) && (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
              >
                <Users size={14} /> About Our Academy
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Empowering Minds <br />
                <span className={theme.text}>Changing Futures</span>
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed font-medium">
                {aboutDesc}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Personalized Learning Path",
                  "Expert Guidance & Mentorship",
                  "Results-Driven Methodology",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-slate-700 font-bold"
                  >
                    <CheckCircle className={theme.text} size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className={`flex items-center gap-2 font-bold ${theme.text} hover:opacity-80 transition-opacity`}
              >
                Learn more about our journey <ArrowRight size={18} />
              </button>
            </div>
            <div className="relative mt-12 lg:mt-0">
              <div
                className={`absolute -inset-10 ${theme.bg} rounded-full opacity-10 blur-3xl`}
              ></div>
              <div className="relative bg-slate-100 rounded-3xl overflow-hidden aspect-square shadow-2xl">
                <img
                  src={aboutImage}
                  className="w-full h-full object-cover"
                  alt="About"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Variant: centered_bg ── */}
        {aboutVariant === "centered_bg" && (
          <div className="text-center max-w-4xl mx-auto py-12">
            <div className="inline-block p-1 bg-slate-900 rounded-2xl mb-12 shadow-2xl">
              <img
                src={aboutImage}
                className="w-full max-h-[400px] rounded-xl object-cover"
                alt="About"
              />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6">
              {customBrand.logoText}'s Mission
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed font-medium mb-10">
              {aboutDesc}
            </p>
            <div className="flex justify-center gap-12">
              <div>
                <span className={`block text-3xl font-black ${theme.text}`}>
                  15k+
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Success Stories
                </span>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div>
                <span className={`block text-3xl font-black ${theme.text}`}>
                  25+
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Expert Mentors
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Variant: split_50 ── */}
        {aboutVariant === "split_50" && (
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            <div className="lg:w-1/2 relative bg-slate-900 overflow-hidden">
              <img
                src={aboutImage}
                className="w-full h-full object-cover opacity-60"
                alt="About"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="absolute bottom-12 left-12">
                <div className="text-white text-5xl font-black mb-2">
                  20+ Years
                </div>
                <div className="text-white/60 font-bold uppercase tracking-widest">
                  Of Educational Excellence
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 bg-slate-50 p-12 lg:p-24 flex flex-col justify-center">
              <h2 className="text-4xl font-black text-slate-900 mb-8">
                Who We Are
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-12">
                {aboutDesc}
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div
                    className={`w-10 h-10 rounded-full ${theme.bg} flex-shrink-0 flex items-center justify-center text-white font-bold`}
                  >
                    01
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Our Founder's Vision
                    </h4>
                    <p className="text-slate-500 text-sm">
                      {founderName} started {customBrand.logoText} with a simple
                      goal: provide better futures.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div
                    className={`w-10 h-10 rounded-full ${theme.bg} flex-shrink-0 flex items-center justify-center text-white font-bold`}
                  >
                    02
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Proven Results</h4>
                    <p className="text-slate-500 text-sm">
                      We don't just teach; we ensure our students reach their
                      destination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Variant: minimal_typo ── */}
        {aboutVariant === "minimal_typo" && (
          <div className="pb-12">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900/10 uppercase mb-8 leading-none">
              About Us / About Us
            </h2>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-snug">
                  <span className={theme.text}>“</span>
                  {aboutDesc}
                  <span className={theme.text}>”</span>
                </p>
                <div className="mt-12 flex items-center gap-6">
                  <img
                    src={aboutImage}
                    className="w-20 h-20 rounded-full object-cover grayscale hover:grayscale-0 transition-all cursor-crosshair shadow-lg"
                    alt="Founder"
                  />
                  <div>
                    <h4 className="text-xl font-black text-slate-900">
                      {founderName}
                    </h4>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                      {founderTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;

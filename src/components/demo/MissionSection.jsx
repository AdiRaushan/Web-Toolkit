import React from "react";
import { Target, Shield, Heart } from "lucide-react";

const MissionSection = ({ sectionDesigns, customBrand, theme }) => {
  const missionVariant = sectionDesigns.mission;
  const missionDesc =
    customBrand.missionDescription ||
    "To empower every student with the tools, knowledge, and confidence they need to achieve their dreams of studying abroad and building a successful global career.";

  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden" id="mission">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
          >
            <Target size={14} /> Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Driven by Purpose
          </h2>
        </div>

        {/* ── Variant: classic ── */}
        {(missionVariant === "classic" || !missionVariant) && (
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
            <div
              className={`w-24 h-24 rounded-2xl ${theme.bg} flex-shrink-0 flex items-center justify-center text-white shadow-2xl ${theme.shadow}`}
            >
              <Target size={48} />
            </div>
            <div>
              <p className="text-2xl text-slate-700 leading-relaxed font-medium italic">
                "{missionDesc}"
              </p>
            </div>
          </div>
        )}

        {/* ── Variant: boxes ── */}
        {missionVariant === "boxes" && (
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Vision",
                text: "To be the most trusted name in overseas education global coaching.",
              },
              {
                icon: Heart,
                title: "Our Values",
                text: "Integrity, excellence, and student-first approach in everything we do.",
              },
              {
                icon: Shield,
                title: "Our Mission",
                text: missionDesc,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 group hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${theme.lightBg} ${theme.text} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Variant: split_dark ── */}
        {missionVariant === "split_dark" && (
          <div className="bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 lg:p-20 text-white">
              <h3 className="text-3xl font-black mb-6">Our Core Mission</h3>
              <p className="text-xl text-slate-300 leading-relaxed opacity-90">
                {missionDesc}
              </p>
            </div>
            <div className="md:w-1/2 bg-indigo-600 p-12 lg:p-20 text-white flex flex-col justify-center">
              <div className="grid grid-cols-1 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Academic Integrity</h4>
                    <p className="text-white/70 text-sm">
                      We maintain the highest standards of ethics in our
                      teaching process.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Student Dedication</h4>
                    <p className="text-white/70 text-sm">
                      Your success is our only metric. We work until you win.
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

export default MissionSection;

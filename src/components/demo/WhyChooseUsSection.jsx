import React from "react";
import {
  Star,
  CheckCircle,
  Zap,
  Shield,
  Coffee,
  Award,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { WHY_CHOOSE_US_DATA } from "../../data/demoData";

const WhyChooseUsSection = ({ sectionDesigns, activeBrandId, theme }) => {
  const variant = sectionDesigns.whyChooseUs;
  const data = WHY_CHOOSE_US_DATA[activeBrandId] || WHY_CHOOSE_US_DATA.coaching;

  const getIcon = (idx) => {
    const icons = [Star, Award, Target, Trophy, Users, Shield, Zap, Sparkles];
    const Icon = icons[idx % icons.length];
    return <Icon size={24} />;
  };

  return (
    <div className="py-24 bg-white relative overflow-hidden" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
          >
            <Sparkles size={14} /> Why Students Love Us
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            The Edge You Need <br /> To{" "}
            <span className={theme.text}>Succeed</span>
          </h2>
        </div>

        {/* ── Variant: grid_cards ── */}
        {(variant === "grid_cards" || !variant) && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100/80 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${theme.bg} text-white flex items-center justify-center mb-6 shadow-lg ${theme.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all`}
                >
                  {getIcon(i)}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-bold">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Variant: side_by_side ── */}
        {variant === "side_by_side" && (
          <div className="grid lg:grid-cols-2 gap-12">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex gap-6 p-6 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-full ${theme.lightBg} ${theme.text} flex-shrink-0 flex items-center justify-center`}
                >
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Variant: minimalist ── */}
        {variant === "minimalist" && (
          <div className="divide-y divide-slate-100">
            {data.map((item, i) => (
              <div
                key={i}
                className="py-8 flex flex-col md:flex-row md:items-center justify-between group cursor-default"
              >
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-black text-slate-200 group-hover:text-slate-900 transition-colors">
                    0{i + 1}
                  </span>
                  <h4 className="text-2xl font-bold text-slate-800">
                    {item.title}
                  </h4>
                </div>
                <p className="md:w-1/2 text-slate-500 font-medium mt-4 md:mt-0">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhyChooseUsSection;

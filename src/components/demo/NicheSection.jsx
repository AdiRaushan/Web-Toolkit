import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Trophy,
  Globe,
  Zap,
  MapPin,
  Clock,
  Star,
  Activity,
  Mic,
  BookOpen,
  PenTool as PenToolIcon,
  Headphones,
  FileText,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

const NicheSection = ({
  sectionDesigns,
  activeBrandId,
  getNicheConfig,
  customBrand,
  theme,
}) => {
  const variant = sectionDesigns.niche;
  const config = getNicheConfig(activeBrandId);
  const items = customBrand.nicheItems || [];
  const NicheIcon = config.icon || Star;

  return (
    <div className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Dynamic Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
          >
            <NicheIcon size={14} />
            {config.sectionName}
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our <span className={theme.text}>{config.sectionName}</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            {config.subtitle ||
              "Master every aspect with our industry-leading curriculum."}
          </p>
        </div>

        {/* ── COURSES LAYOUT ── */}
        {config.type === "courses" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, idx) => {
              const IconComp = item.icon || CheckCircle;
              return (
                <div
                  key={idx}
                  className={`bg-white border border-slate-100 p-8 hover:shadow-2xl hover:${theme.lightBorder} transition-all duration-300 group text-center rounded-2xl relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 ${theme.bg} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`w-16 h-16 mx-auto ${theme.lightBg} ${theme.text} rounded-2xl flex items-center justify-center mb-6 group-hover:${theme.bg} group-hover:text-white transition-colors shadow-sm group-hover:shadow-lg ${theme.shadow} duration-300`}
                  >
                    <IconComp size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">
                    {item.courseName}
                  </h4>
                  <span
                    className={`inline-block text-xs font-bold ${theme.text} ${theme.lightBg} px-3 py-1 rounded-full mb-4 border ${theme.lightBorder}`}
                  >
                    <Clock size={10} className="inline mr-1" />
                    {item.duration}
                  </span>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 font-medium">
                    {item.desc}
                  </p>
                  <a
                    href="#"
                    className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                  >
                    Enroll Now <ArrowRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* ── SERVICES LAYOUT ── */}
        {config.type === "services" && (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item, idx) => {
              const IconComp = item.icon || Zap;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex gap-6 items-start relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 ${theme.bg} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`w-14 h-14 flex-shrink-0 ${theme.lightBg} ${theme.text} rounded-2xl flex items-center justify-center group-hover:${theme.bg} group-hover:text-white transition-colors shadow-sm`}
                  >
                    <IconComp size={24} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      {item.serviceName}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 font-medium">
                      {item.desc}
                    </p>
                    <a
                      href="#"
                      className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                    >
                      Learn More <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── PROPERTIES LAYOUT ── */}
        {config.type === "properties" && (
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={item.propertyImage}
                    alt={item.location}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className={`absolute top-4 right-4 ${theme.bg} text-white px-4 py-2 rounded-xl font-black text-lg shadow-lg ${theme.shadow}`}
                  >
                    {item.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className={theme.text} />
                    <h4 className="text-xl font-bold text-slate-900">
                      {item.location}
                    </h4>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 font-medium">
                    {item.details}
                  </p>
                  <a
                    href="#"
                    className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                  >
                    View Property <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TREATMENTS LAYOUT ── */}
        {config.type === "treatments" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, idx) => {
              const IconComp = item.icon || Activity;
              return (
                <div
                  key={idx}
                  className={`bg-white border border-slate-100 p-8 hover:shadow-2xl hover:${theme.lightBorder} transition-all duration-300 group text-center rounded-2xl relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 ${theme.bg} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`w-16 h-16 mx-auto ${theme.lightBg} ${theme.text} rounded-2xl flex items-center justify-center mb-6 group-hover:${theme.bg} group-hover:text-white transition-colors shadow-sm group-hover:shadow-lg ${theme.shadow} duration-300`}
                  >
                    <IconComp size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {item.treatmentName}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 font-medium">
                    {item.desc}
                  </p>
                  <a
                    href="#"
                    className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                  >
                    Book Appointment <ArrowRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* ── MEMBERSHIP LAYOUT ── */}
        {config.type === "membership" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group relative ${idx === 1 ? `ring-2 ${theme.border}` : ""}`}
              >
                {idx === 1 && (
                  <div
                    className={`${theme.bg} text-white text-center py-2 text-xs font-bold uppercase tracking-widest`}
                  >
                    Most Popular
                  </div>
                )}
                <div className="p-8 text-center">
                  <div
                    className={`w-14 h-14 mx-auto ${theme.lightBg} ${theme.text} rounded-2xl flex items-center justify-center mb-4 group-hover:${theme.bg} group-hover:text-white transition-colors`}
                  >
                    {item.icon ? <item.icon size={24} /> : <Zap size={24} />}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">
                    {item.planName}
                  </h4>
                  <div className="mb-6">
                    <span className={`text-3xl font-black ${theme.text}`}>
                      {item.price}
                    </span>
                  </div>
                  <ul className="space-y-3 text-left mb-8">
                    {item.features?.map((f, fi) => (
                      <li
                        key={fi}
                        className="flex items-center gap-2 text-sm text-slate-600 font-medium"
                      >
                        <CheckCircle
                          size={16}
                          className={`${theme.text} flex-shrink-0`}
                        />{" "}
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${idx === 1 ? `${theme.bg} text-white shadow-lg ${theme.shadow} hover:scale-[1.02]` : `border ${theme.border} ${theme.text} hover:${theme.bg} hover:text-white`}`}
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PROJECTS LAYOUT ── */}
        {config.type === "projects" && (
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={item.projectImage}
                    alt={item.projectTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span
                      className={`inline-block ${theme.bg} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2`}
                    >
                      Case Study
                    </span>
                    <h4 className="text-white font-bold text-lg leading-snug">
                      {item.projectTitle}
                    </h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 font-medium">
                    {item.desc}
                  </p>
                  <a
                    href="#"
                    className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                  >
                    View Case Study <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NicheSection;

/**
 * ImprovementPresentation.jsx
 * A slide-style presentation that shows how to improve the audited website.
 * Each "slide" focuses on one area: SEO, Speed, Conversion, Branding, Mobile.
 * Light theme to match the Dashboard design system.
 */

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Zap,
  MousePointerClick,
  Palette,
  Smartphone,
  CheckCircle,
  XCircle,
  ArrowRight,
  Presentation,
} from "lucide-react";

/**
 * Build slides from the audit report data.
 */
const buildSlides = (report, url) => {
  if (!report) return [];

  const { basic, conversion, issues, suggestions } = report;

  const slides = [
    // Slide 1 — Overview
    {
      icon: Presentation,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      title: "Website Improvement Plan",
      subtitle: url,
      content: (
        <div className="space-y-6">
          <p className="text-slate-500 text-sm leading-relaxed">
            Based on our analysis, here's a step-by-step improvement roadmap to
            boost your website's SEO ranking, conversion rate, and user trust.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Issues Found",
                value: report.totalIssues,
                color: "text-amber-600",
              },
              {
                label: "Current Score",
                value: `${report.score}/100`,
                color: "text-blue-600",
              },
              {
                label: "Grade",
                value: report.grade,
                color: report.score >= 70 ? "text-green-600" : "text-red-600",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200/60"
              >
                <span className={`text-2xl font-black ${s.color}`}>
                  {s.value}
                </span>
                <span className="block text-xs text-slate-400 mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 2 — SEO Basics
    {
      icon: Search,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      title: "SEO Fundamentals",
      subtitle: "Search Engine Optimization",
      content: (
        <div className="space-y-4">
          <p className="text-slate-500 text-sm">
            Fix these core SEO elements to improve your Google ranking:
          </p>
          <div className="space-y-3">
            {[
              {
                label: "Title Tag",
                ok: basic.title,
                fix: "Add a descriptive <title> tag (50-60 characters) with your main keyword.",
              },
              {
                label: "Meta Description",
                ok: basic.metaDescription,
                fix: "Write a compelling meta description (150-160 chars) that encourages clicks.",
              },
              {
                label: "H1 Heading",
                ok: basic.h1Present,
                fix: "Include exactly one H1 tag with your primary keyword for clear page hierarchy.",
              },
              {
                label: "Image Alt Text",
                ok: basic.imagesMissingAlt === 0,
                fix: `${basic.imagesMissingAlt} images are missing alt text. Add descriptive alt attributes for accessibility & SEO.`,
              },
              {
                label: "HTTPS Security",
                ok: basic.https,
                fix: "Install an SSL certificate. Google penalizes non-HTTPS sites in rankings.",
              },
              {
                label: "Mobile Viewport",
                ok: basic.viewport,
                fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> for mobile responsiveness.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60"
              >
                {item.ok ? (
                  <CheckCircle
                    size={18}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                ) : (
                  <XCircle
                    size={18}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                )}
                <div>
                  <span className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </span>
                  {!item.ok && (
                    <p className="text-xs text-slate-400 mt-1">{item.fix}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 3 — Conversion
    {
      icon: MousePointerClick,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      title: "Conversion Optimization",
      subtitle: "Turn visitors into customers",
      content: (
        <div className="space-y-4">
          <p className="text-slate-500 text-sm">
            These conversion elements determine whether visitors take action:
          </p>
          <div className="space-y-3">
            {[
              {
                label: "Call-to-Action Button",
                ok: conversion.ctaFound,
                fix: 'Add a prominent CTA button above the fold with action-oriented text like "Get Started", "Book Now", or "Contact Us".',
                impact: "High",
              },
              {
                label: "Contact Form",
                ok: conversion.contactForm,
                fix: "Add a simple contact/lead capture form. Keep it to 3-4 fields max for higher conversion rates.",
                impact: "High",
              },
              {
                label: "Clickable Phone Number",
                ok: conversion.clickablePhone,
                fix: 'Wrap your phone number in <a href="tel:+1234567890"> so mobile users can tap to call instantly.',
                impact: "Medium",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 bg-slate-50 rounded-lg border border-slate-200/60"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.ok ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                    <span className="text-sm font-semibold text-slate-800">
                      {item.label}
                    </span>
                  </div>
                  {!item.ok && (
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.impact === "High" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}
                    >
                      {item.impact} Impact
                    </span>
                  )}
                </div>
                {!item.ok && (
                  <p className="text-xs text-slate-400 ml-6">{item.fix}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 4 — Performance & Speed
    {
      icon: Zap,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      title: "Performance & Speed",
      subtitle: "Faster = Higher Rankings",
      content: (
        <div className="space-y-4">
          <p className="text-slate-500 text-sm">
            Speed directly impacts bounce rate and SEO. Here's what to optimize:
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Optimize Images",
                desc: "Compress images using WebP format. Large images are the #1 cause of slow loading. Use lazy loading for images below the fold.",
                priority: "Critical",
              },
              {
                title: "Minify CSS & JS",
                desc: "Remove unnecessary whitespace, comments, and unused code. Use tools like Terser for JS and CSSNano for CSS.",
                priority: "High",
              },
              {
                title: "Enable Caching",
                desc: "Set browser cache headers so returning visitors load faster. Static assets should cache for at least 30 days.",
                priority: "High",
              },
              {
                title: "Reduce HTTP Requests",
                desc: "Combine CSS/JS files where possible. Each external resource adds latency. Aim for under 50 requests.",
                priority: "Medium",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                className="p-4 bg-slate-50 rounded-lg border border-slate-200/60"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-800">
                    {tip.title}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${tip.priority === "Critical" ? "bg-red-50 text-red-600" : tip.priority === "High" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}
                  >
                    {tip.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 5 — Branding & Trust
    {
      icon: Palette,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-50",
      title: "Branding & Trust Signals",
      subtitle: "Build credibility at first glance",
      content: (
        <div className="space-y-4">
          <p className="text-slate-500 text-sm">
            Trust signals can increase conversion by up to 42%. Add these
            elements:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                title: "Social Proof",
                desc: "Add customer testimonials with real names and photos.",
              },
              {
                title: "Trust Badges",
                desc: "Show certifications, SSL seals, and partner logos.",
              },
              {
                title: "Clear Branding",
                desc: "Consistent colors, fonts, and logo placement build recognition.",
              },
              {
                title: "Contact Visibility",
                desc: "Show phone, email, and address in header/footer.",
              },
              {
                title: "Case Studies",
                desc: "Showcase real results with before/after metrics.",
              },
              {
                title: "FAQ Section",
                desc: "Answer common objections to reduce friction.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200/60"
              >
                <span className="text-sm font-semibold text-slate-800 block mb-1">
                  {item.title}
                </span>
                <span className="text-xs text-slate-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 6 — Mobile Optimization
    {
      icon: Smartphone,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      title: "Mobile Experience",
      subtitle: "60%+ traffic is mobile",
      content: (
        <div className="space-y-4">
          <p className="text-slate-500 text-sm">
            Mobile-first design is essential. Ensure these are in place:
          </p>
          <div className="space-y-3">
            {[
              {
                label: "Responsive Layout",
                desc: "All content should adapt to screen sizes without horizontal scrolling.",
                ok: basic.viewport,
              },
              {
                label: "Touch-Friendly Buttons",
                desc: "Buttons should be at least 44x44px with adequate spacing between them.",
                ok: null,
              },
              {
                label: "Readable Font Sizes",
                desc: "Body text minimum 16px. No pinch-to-zoom should be required.",
                ok: null,
              },
              {
                label: "Fast Mobile Load",
                desc: "Target under 3 seconds on 3G. Compress assets aggressively.",
                ok: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60"
              >
                {item.ok === true ? (
                  <CheckCircle
                    size={16}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                ) : item.ok === false ? (
                  <XCircle
                    size={16}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                ) : (
                  <ArrowRight
                    size={16}
                    className="text-slate-400 mt-0.5 flex-shrink-0"
                  />
                )}
                <div>
                  <span className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 7 — Action Plan Summary
    {
      icon: CheckCircle,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      title: "Your Action Plan",
      subtitle: "Prioritized next steps",
      content: (
        <div className="space-y-4">
          <p className="text-slate-500 text-sm">
            Here's your prioritized improvement roadmap:
          </p>
          <div className="space-y-2">
            {(suggestions.length > 0
              ? suggestions
              : [
                  "Add a proper title tag and meta description",
                  "Install SSL certificate for HTTPS",
                  "Add a clear call-to-action above the fold",
                  "Optimize images and enable compression",
                  "Add social proof and trust signals",
                  "Make phone number clickable on mobile",
                ]
            ).map((suggestion, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60"
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-blue-600">
                    {idx + 1}
                  </span>
                </div>
                <span className="text-sm text-slate-600">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return slides;
};

const ImprovementPresentation = ({ report, url }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = buildSlides(report, url);

  if (!slides.length) return null;

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
      {/* Presentation Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Presentation size={18} className="text-blue-500" />
          <span className="text-slate-900 font-bold text-sm">
            Improvement Presentation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {currentSlide + 1} / {slides.length}
          </span>
          {/* Progress dots */}
          <div className="flex gap-1 ml-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? "bg-blue-500 w-6" : "bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="p-8 min-h-[420px]">
        {/* Slide Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-12 h-12 rounded-xl ${slide.iconBg} flex items-center justify-center`}
          >
            <Icon size={22} className={slide.iconColor} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{slide.title}</h3>
            <p className="text-xs text-slate-400">{slide.subtitle}</p>
          </div>
        </div>

        {/* Slide Body */}
        <div className="transition-all duration-300">{slide.content}</div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-slate-200/60 flex items-center justify-between">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <button
          onClick={() =>
            setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))
          }
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ImprovementPresentation;

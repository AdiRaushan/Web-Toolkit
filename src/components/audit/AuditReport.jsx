/**
 * AuditReport.jsx
 * Displays the full audit report with grouped sections:
 * Basic SEO, Conversion, and Suggestions.
 */

import React from "react";
import {
  Shield,
  FileText,
  Type,
  Smartphone,
  Image,
  Hash,
  MousePointerClick,
  Mail,
  Phone,
  Check,
  X,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
} from "lucide-react";

/**
 * Single check item row.
 */
const CheckRow = ({ icon: Icon, label, passed, detail }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-700/40 last:border-0">
    <div className="flex items-center gap-3">
      <Icon size={16} className="text-slate-400" />
      <span className="text-sm text-slate-300">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {detail && (
        <span className="text-xs text-slate-500 hidden sm:inline">
          {detail}
        </span>
      )}
      {passed ? (
        <div className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center">
          <Check size={14} className="text-green-400" />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center">
          <X size={14} className="text-red-400" />
        </div>
      )}
    </div>
  </div>
);

const AuditReport = ({ report, url }) => {
  if (!report) return null;

  const { basic, conversion, extra, issues, suggestions } = report;

  return (
    <div className="space-y-6">
      {/* Audited URL */}
      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 flex items-center gap-3">
        <ExternalLink size={16} className="text-indigo-400" />
        <span className="text-sm text-slate-300 truncate">{url}</span>
      </div>

      {/* Basic SEO Checks */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
          <FileText size={18} className="text-indigo-400" />
          Basic SEO Audit
        </h3>
        <div>
          <CheckRow icon={Shield} label="HTTPS Enabled" passed={basic.https} />
          <CheckRow
            icon={Type}
            label="Title Tag Present"
            passed={basic.title}
            detail={
              basic.titleText ? `"${basic.titleText.substring(0, 40)}..."` : ""
            }
          />
          <CheckRow
            icon={FileText}
            label="Meta Description"
            passed={basic.metaDescription}
          />
          <CheckRow
            icon={Hash}
            label="H1 Heading Present"
            passed={basic.h1Present}
            detail={
              basic.h1Count > 1 ? `(${basic.h1Count} found — should be 1)` : ""
            }
          />
          <CheckRow
            icon={Image}
            label="All Images Have Alt Text"
            passed={basic.imagesMissingAlt === 0}
            detail={
              basic.imagesMissingAlt > 0
                ? `${basic.imagesMissingAlt} missing`
                : ""
            }
          />
          <CheckRow
            icon={Smartphone}
            label="Mobile Viewport Meta"
            passed={basic.viewport}
          />
        </div>
      </div>

      {/* Conversion Checks */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
          <MousePointerClick size={18} className="text-purple-400" />
          Conversion Audit
        </h3>
        <div>
          <CheckRow
            icon={MousePointerClick}
            label="CTA Button Found"
            passed={conversion.ctaFound}
          />
          <CheckRow
            icon={Mail}
            label="Contact Form Detected"
            passed={conversion.contactForm}
          />
          <CheckRow
            icon={Phone}
            label="Phone Clickable (tel: link)"
            passed={conversion.clickablePhone}
          />
        </div>
      </div>

      {/* Issues List */}
      {issues.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-400" />
            Issues Found ({issues.length})
          </h3>
          <div className="space-y-2">
            {issues.map((issue, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 py-2 border-b border-slate-700/30 last:border-0"
              >
                <span className="text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                  {issue.type}
                </span>
                <span className="text-sm text-slate-300">{issue.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-emerald-400" />
            Suggested Fixes
          </h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 py-2 border-b border-slate-700/30 last:border-0"
              >
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-sm text-slate-400">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditReport;

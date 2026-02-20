/**
 * AuditForm.jsx
 * URL input form for the website audit tool.
 * Handles URL validation, loading state, and error display.
 * Light theme to match the Dashboard design system.
 */

import React, { useState } from "react";
import { Globe, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

const AuditForm = ({ onSubmit, isLoading, error }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
          <Globe size={28} className="text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Website Audit Tool
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Enter any website URL to get an instant SEO, security, and conversion
          audit report with actionable recommendations.
        </p>
      </div>

      {/* URL Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Globe
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g., example.com or https://example.com"
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all text-sm disabled:opacity-50 shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span className="hidden sm:inline">Scanning...</span>
              </>
            ) : (
              <>
                <span>Audit</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200/60 rounded-xl">
          <AlertCircle
            size={18}
            className="text-red-500 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-red-600 text-sm font-medium">{error}</p>
            <p className="text-red-400 text-xs mt-1">
              Try a different URL or check if the website is accessible.
            </p>
          </div>
        </div>
      )}

      {/* Quick Examples */}
      {!isLoading && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <span className="text-slate-400 text-xs">Try:</span>
          {["google.com", "github.com", "stripe.com"].map((example) => (
            <button
              key={example}
              onClick={() => setUrl(example)}
              className="text-xs text-blue-600/80 hover:text-blue-700 bg-blue-50/60 px-3 py-1 rounded-full border border-blue-200/40 hover:border-blue-300 transition-all"
            >
              {example}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditForm;

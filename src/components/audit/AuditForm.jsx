/**
 * AuditForm.jsx
 * URL input form for the website audit tool.
 * Handles URL validation, loading state, and error display.
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
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
          <Globe size={28} className="text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Website Audit Tool
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g., example.com or https://example.com"
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
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
        <div className="mt-4 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <AlertCircle
            size={18}
            className="text-red-400 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-red-400 text-sm font-medium">{error}</p>
            <p className="text-red-400/60 text-xs mt-1">
              Try a different URL or check if the website is accessible.
            </p>
          </div>
        </div>
      )}

      {/* Quick Examples */}
      {!isLoading && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <span className="text-slate-600 text-xs">Try:</span>
          {["google.com", "github.com", "stripe.com"].map((example) => (
            <button
              key={example}
              onClick={() => setUrl(example)}
              className="text-xs text-indigo-400/80 hover:text-indigo-300 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/40 hover:border-indigo-500/30 transition-all"
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

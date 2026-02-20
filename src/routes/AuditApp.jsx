/**
 * AuditApp.jsx
 * Website Audit Tool route page.
 * Uses the same light theme as the Dashboard for consistency.
 * Allows users to enter a URL, runs SEO/conversion audit,
 * and displays a score + detailed report.
 * Includes "Generate Demo From This" button to redirect
 * to DemoApp with pre-filled scraped data.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Monitor, Loader2, Presentation } from "lucide-react";
import AuditForm from "../components/audit/AuditForm";
import ScoreCard from "../components/audit/ScoreCard";
import AuditReport from "../components/audit/AuditReport";
import ImprovementPresentation from "../components/audit/ImprovementPresentation";
import { fetchWebsiteData } from "../services/scrapeService";
import { runAudit } from "../services/auditService";

const AuditApp = () => {
  const navigate = useNavigate();

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [auditResult, setAuditResult] = useState(null);
  const [scrapedData, setScrapedData] = useState(null);
  const [auditedUrl, setAuditedUrl] = useState("");
  const [rawHtml, setRawHtml] = useState("");

  /**
   * Handle audit submission.
   * Fetches the website HTML, runs the audit, and stores scraped data.
   */
  const handleAudit = async (url) => {
    setIsLoading(true);
    setError("");
    setAuditResult(null);
    setScrapedData(null);

    try {
      const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
      setAuditedUrl(normalizedUrl);

      // Fetch the website data using scrape service
      const data = await fetchWebsiteData(url);
      setScrapedData(data);

      // We need raw HTML for audit — fetch it again via proxy
      const CORS_PROXIES = [
        "https://api.allorigins.win/raw?url=",
        "https://corsproxy.io/?",
        "https://api.codetabs.com/v1/proxy?quest=",
      ];

      let html = "";
      for (const proxy of CORS_PROXIES) {
        try {
          const response = await fetch(
            `${proxy}${encodeURIComponent(normalizedUrl)}`,
            { signal: AbortSignal.timeout(10000) },
          );
          if (response.ok) {
            html = await response.text();
            break;
          }
        } catch {
          continue;
        }
      }

      if (!html) {
        throw new Error("Could not fetch website HTML for audit.");
      }

      setRawHtml(html);

      // Run the audit
      const report = runAudit(html, normalizedUrl);
      setAuditResult(report);
    } catch (err) {
      setError(err.message || "Audit failed. Please try a different URL.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Navigate to Demo Creator with pre-filled scraped data.
   */
  const handleGenerateDemo = () => {
    if (scrapedData) {
      navigate("/demo", {
        state: { prefillData: scrapedData },
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "#F8FAFC" }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back to Dashboard */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        {/* Audit Form (always visible) */}
        <AuditForm onSubmit={handleAudit} isLoading={isLoading} error={error} />

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mt-12 text-center">
            <Loader2
              size={32}
              className="text-blue-500 animate-spin mx-auto mb-4"
            />
            <p className="text-slate-600 text-sm">Scanning website...</p>
            <p className="text-slate-400 text-xs mt-1">
              Checking SEO, security, and conversion elements
            </p>
          </div>
        )}

        {/* Audit Results */}
        {auditResult && !isLoading && (
          <div className="mt-12 space-y-8">
            {/* Score + Generate Demo Row */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <ScoreCard
                  score={auditResult.score}
                  grade={auditResult.grade}
                  totalIssues={auditResult.totalIssues}
                />
              </div>
              <div className="md:col-span-2 flex flex-col justify-center">
                {/* Generate Demo Button */}
                {scrapedData && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-6">
                    <h3 className="text-slate-900 font-bold text-lg mb-2">
                      Want a landing page for this website?
                    </h3>
                    <p className="text-slate-500 text-sm mb-4">
                      We detected the brand info, color scheme, and niche.
                      Generate a professional demo page instantly with all data
                      pre-filled.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {scrapedData.title && (
                        <span className="text-xs bg-white text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                          {scrapedData.title.substring(0, 30)}
                        </span>
                      )}
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize">
                        {scrapedData.niche}
                      </span>
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        {scrapedData.brandColor}
                      </span>
                    </div>
                    <button
                      onClick={handleGenerateDemo}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                      <Monitor size={16} />
                      Generate Demo From This
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Improvement Presentation */}
            <ImprovementPresentation report={auditResult} url={auditedUrl} />

            {/* Full Report */}
            <AuditReport report={auditResult} url={auditedUrl} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200/60 py-6 mt-12">
        <p className="text-center text-slate-400 text-xs">
          Website Audit Tool • WebToolkit Creator Studio
        </p>
      </div>
    </div>
  );
};

export default AuditApp;

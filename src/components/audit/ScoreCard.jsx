/**
 * ScoreCard.jsx
 * Displays the overall audit score with a circular gauge,
 * grade badge, and summary stats.
 * Light theme to match the Dashboard design system.
 */

import React from "react";

/**
 * Get color scheme based on score range.
 */
const getScoreStyle = (score) => {
  if (score >= 90)
    return {
      color: "#22c55e",
      bg: "bg-green-50",
      text: "text-green-600",
      label: "Excellent",
    };
  if (score >= 80)
    return {
      color: "#3b82f6",
      bg: "bg-blue-50",
      text: "text-blue-600",
      label: "Good",
    };
  if (score >= 70)
    return {
      color: "#eab308",
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      label: "Needs Work",
    };
  if (score >= 50)
    return {
      color: "#f97316",
      bg: "bg-orange-50",
      text: "text-orange-600",
      label: "Poor",
    };
  return {
    color: "#ef4444",
    bg: "bg-red-50",
    text: "text-red-600",
    label: "Critical",
  };
};

const ScoreCard = ({ score = 0, grade = "F", totalIssues = 0 }) => {
  const style = getScoreStyle(score);
  const circumference = 2 * Math.PI * 50; // radius = 50
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-8 text-center shadow-sm">
      {/* Circular Score Gauge */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 120 120"
        >
          {/* Background ring */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="8"
          />
          {/* Score ring */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={style.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Score Number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900">{score}</span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>
      </div>

      {/* Grade Badge */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span
          className={`${style.bg} ${style.text} px-4 py-1.5 rounded-full text-sm font-bold border`}
          style={{ borderColor: `${style.color}30` }}
        >
          Grade: {grade}
        </span>
      </div>

      {/* Label */}
      <p className={`${style.text} font-semibold text-lg mb-1`}>
        {style.label}
      </p>

      {/* Issues count */}
      <p className="text-slate-400 text-sm">
        {totalIssues} issue{totalIssues !== 1 ? "s" : ""} found
      </p>
    </div>
  );
};

export default ScoreCard;

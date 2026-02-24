"use client";

/**
 * Demo Page — Next.js wrapper for the original DemoApp component.
 * DemoApp.jsx contains all 4256 lines of section variants, theme system,
 * customizer sidebar, onboarding form, and niche-specific sections.
 * We wrap it here with "use client" for Next.js compatibility.
 */

import React from "react";
import DemoApp from "../../routes/DemoApp";

export default function DemoPage() {
  return <DemoApp />;
}

import React from "react";
import {
  X,
  PenTool,
  Globe,
  Loader2,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Star,
  Monitor,
  Users,
  Zap,
  TrendingUp,
  MapPin,
} from "lucide-react";
import {
  COLOR_PALETTES,
  FONT_PAIRS,
  SECTION_VARIANTS,
  DEFAULT_BRANDS,
} from "../../data/demoData";

const CustomizerSidebar = ({
  showCustomizer,
  setShowCustomizer,
  scrapeUrl,
  setScrapeUrl,
  scrapeLoading,
  handleUrlScrape,
  handleImproveCopy,
  improveLoading,
  scrapeError,
  scrapeSuccess,
  activeBrandId,
  handleBrandChange,
  customBrand,
  handleInputChange,
  colorPaletteId,
  setColorPaletteId,
  fontPairId,
  setFontPairId,
  sectionDesigns,
  updateSectionDesign,
  setCustomBrand,
  getNicheConfig,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[380px] bg-slate-900 text-white z-[100] shadow-2xl border-l border-slate-700/80 transition-transform duration-300 ease-in-out overflow-y-auto ${
        showCustomizer ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-5">
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-700/60">
          <h3 className="font-bold text-base flex items-center gap-2">
            <PenTool size={16} className="text-indigo-400" /> Customizer
          </h3>
          <button
            onClick={() => setShowCustomizer(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Close Panel"
          >
            <X size={16} />
          </button>
        </div>

        {/* --- URL Auto-Fill Bar --- */}
        <div className="mb-5 p-3 bg-slate-800/60 rounded-xl border border-slate-700/40">
          <div className="flex gap-2 items-center mb-2">
            <Globe size={12} className="text-indigo-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Auto-Fill from URL
            </span>
          </div>
          <div className="flex gap-2 mb-2">
            <input
              value={scrapeUrl}
              onChange={(e) => setScrapeUrl(e.target.value)}
              placeholder="example.com"
              disabled={scrapeLoading}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none disabled:opacity-50"
              onKeyDown={(e) => e.key === "Enter" && handleUrlScrape()}
            />
            <button
              onClick={handleUrlScrape}
              disabled={scrapeLoading || !scrapeUrl.trim()}
              className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              {scrapeLoading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Globe size={12} />
              )}
            </button>
          </div>
          <button
            onClick={handleImproveCopy}
            disabled={improveLoading}
            className="w-full px-3 py-2 bg-purple-600/80 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
            title="Rewrite headline & description into high-converting copy"
          >
            {improveLoading ? (
              <>
                <Loader2 size={12} className="animate-spin" /> Improving...
              </>
            ) : (
              <>
                <Sparkles size={12} /> Improve Hero Copy
              </>
            )}
          </button>
          {scrapeError && (
            <div className="mt-2 flex items-center gap-2 text-red-400 text-[11px]">
              <AlertCircle size={11} /> {scrapeError}
            </div>
          )}
          {scrapeSuccess && (
            <div className="mt-2 flex items-center gap-2 text-emerald-400 text-[11px]">
              <CheckCircle size={11} /> {scrapeSuccess}
            </div>
          )}
        </div>

        {/* Presets */}
        <div className="mb-5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Brand Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(DEFAULT_BRANDS).map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandChange(brand.id)}
                className={`px-3 py-2 rounded-lg font-bold text-xs transition-all text-left ${
                  activeBrandId === brand.id
                    ? "text-white shadow-lg ring-1 ring-white/20"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                }`}
                style={{
                  backgroundColor:
                    activeBrandId === brand.id
                      ? brand.themeColor === "emerald"
                        ? "#10b981"
                        : brand.themeColor === "orange"
                          ? "#f97316"
                          : brand.themeColor === "blue"
                            ? "#2563eb"
                            : "#dc2626"
                      : undefined,
                }}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Edit Fields */}
        <div className="space-y-3 text-xs">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Brand Details
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Logo Main
              </label>
              <input
                value={customBrand.logoText}
                onChange={(e) => handleInputChange("logoText", e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Logo Highlight
              </label>
              <input
                value={customBrand.logoSpan}
                onChange={(e) => handleInputChange("logoSpan", e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-500 mb-1 text-[11px]">
              Tagline
            </label>
            <input
              value={customBrand.tagline}
              onChange={(e) => handleInputChange("tagline", e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Phone
              </label>
              <input
                value={customBrand.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Email
              </label>
              <input
                value={customBrand.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-500 mb-1 text-[11px]">
              Address
            </label>
            <input
              value={customBrand.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
            />
          </div>

          {/* Hero Content */}
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2">
            Hero Content
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Title
              </label>
              <input
                value={customBrand.heroTitle}
                onChange={(e) => handleInputChange("heroTitle", e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                placeholder="First Line"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Highlight
              </label>
              <input
                value={customBrand.heroSpan}
                onChange={(e) => handleInputChange("heroSpan", e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                placeholder="Highlight Line"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-500 mb-1 text-[11px]">
              Description
            </label>
            <textarea
              value={customBrand.heroDesc}
              onChange={(e) => handleInputChange("heroDesc", e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs h-16 resize-none"
            />
          </div>

          {/* Grid Images */}
          {customBrand.heroStyle === "grid" && (
            <div className="space-y-2">
              <label className="block text-slate-500 mb-1 text-[11px]">
                Grid Images (4)
              </label>
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  value={
                    (customBrand.gridImages && customBrand.gridImages[index]) ||
                    ""
                  }
                  onChange={(e) => {
                    const newGridImages = [...(customBrand.gridImages || [])];
                    while (newGridImages.length <= index) {
                      newGridImages.push(customBrand.heroImage || "");
                    }
                    newGridImages[index] = e.target.value;
                    setCustomBrand((prev) => ({
                      ...prev,
                      gridImages: newGridImages,
                    }));
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                  placeholder={`Image URL ${index + 1}`}
                />
              ))}
            </div>
          )}

          <div>
            <label className="block text-slate-500 mb-1 text-[11px]">
              Hero Image URL
            </label>
            <input
              value={customBrand.heroImage || ""}
              onChange={(e) => handleInputChange("heroImage", e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Design & Layout */}
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2">
            Design & Layout
          </label>

          {/* Color Palette */}
          <div>
            <label className="block text-slate-500 mb-2 text-[11px]">
              Color Palette
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {COLOR_PALETTES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setColorPaletteId(p.id)}
                  className={`rounded-lg p-1.5 border-2 transition-all ${colorPaletteId === p.id ? "border-white scale-105 shadow-lg" : "border-slate-700 opacity-70 hover:opacity-100"}`}
                  title={p.label}
                >
                  <div className="flex h-5 rounded overflow-hidden">
                    <div
                      className="flex-1"
                      style={{ backgroundColor: p.primary }}
                    />
                    <div
                      className="flex-1"
                      style={{ backgroundColor: p.secondary }}
                    />
                    <div
                      className="w-2"
                      style={{ backgroundColor: p.accent }}
                    />
                  </div>
                  <div className="text-[8px] text-slate-400 mt-1 truncate">
                    {p.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Color (legacy) */}
          <div>
            <label className="block text-slate-500 mb-2 text-[11px]">
              Theme Color
            </label>
            <div className="flex gap-3">
              {["red", "blue", "emerald", "orange"].map((c) => (
                <button
                  key={c}
                  onClick={() => handleInputChange("themeColor", c)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    customBrand.themeColor === c
                      ? "border-white scale-110 shadow-lg"
                      : "border-slate-600 opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c === "emerald" ? "#10b981" : c }}
                />
              ))}
            </div>
          </div>

          {/* Font Pair */}
          <div>
            <label className="block text-slate-500 mb-2 text-[11px]">
              Font Style
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {FONT_PAIRS.map((fp) => (
                <button
                  key={fp.id}
                  onClick={() => setFontPairId(fp.id)}
                  className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all text-left ${fontPairId === fp.id ? "bg-indigo-600 text-white ring-1 ring-indigo-400" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
                >
                  <span style={{ fontFamily: fp.heading }}>{fp.label}</span>
                  <span
                    className="block text-[8px] opacity-60"
                    style={{ fontFamily: fp.body }}
                  >
                    {fp.heading} + {fp.body}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navbar Style */}
          <div>
            <label className="block text-slate-500 mb-1 text-[11px]">
              Navbar Style
            </label>
            <select
              value={customBrand.navbarStyle || "standard"}
              onChange={(e) => handleInputChange("navbarStyle", e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
            >
              <option value="standard">Standard (Top Bar)</option>
              <option value="minimal">Minimal (Clean)</option>
              <option value="dark">Dark Mode</option>
              <option value="transparent">Transparent Overlay</option>
              <option value="centered">Centered Logo</option>
              <option value="floating">Floating Pill</option>
              <option value="glass">Glassmorphism</option>
              <option value="gradient">Gradient Header</option>
              <option value="stack">Stacked (Logo Top)</option>
              <option value="borderless">Borderless Pure</option>
            </select>
          </div>

          {/* Hero Style */}
          <div>
            <label className="block text-slate-500 mb-1 text-[11px]">
              Hero Style
            </label>
            <select
              value={customBrand.heroStyle || "split"}
              onChange={(e) => handleInputChange("heroStyle", e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
            >
              <option value="split">Split (Image Right)</option>
              <option value="centered">Centered (Focus)</option>
              <option value="classic">Classic (Simple)</option>
              <option value="fullscreen">Full Screen Image</option>
              <option value="video">Video Background</option>
              <option value="carousel">Carousel / Slider</option>
              <option value="grid">Image Grid</option>
              <option value="form_left">Lead Gen (Form Left)</option>
              <option value="monitor">Digital Showcase</option>
              <option value="diagonal">Diagonal Split</option>
            </select>
          </div>

          {/* ── Section Design Variants ── */}
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-4">
            Section Layouts
          </label>
          {Object.entries(SECTION_VARIANTS).map(([section, variants]) => (
            <div key={section}>
              <label className="block text-slate-500 mb-1 text-[11px] capitalize">
                {section === "whyChooseUs"
                  ? "Why Choose Us"
                  : section === "niche"
                    ? getNicheConfig(activeBrandId).sectionName
                    : section}{" "}
                Style
              </label>
              <select
                value={sectionDesigns[section]}
                onChange={(e) => updateSectionDesign(section, e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
              >
                {variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* About Us Section */}
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-4">
            About Us Section
          </label>
          <div>
            <label className="block text-slate-500 mb-1 text-[11px]">
              About Description
            </label>
            <textarea
              value={customBrand.aboutDescription || ""}
              onChange={(e) =>
                handleInputChange("aboutDescription", e.target.value)
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs h-20 resize-none"
              placeholder="Describe your business, your story, and what makes you unique..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Founder Name
              </label>
              <input
                value={customBrand.founderName || ""}
                onChange={(e) =>
                  handleInputChange("founderName", e.target.value)
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Founder Title
              </label>
              <input
                value={customBrand.founderTitle || ""}
                onChange={(e) =>
                  handleInputChange("founderTitle", e.target.value)
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                placeholder="CEO & Founder"
              />
            </div>
          </div>

          {/* Our Mission Section */}
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-4">
            Our Mission Section
          </label>
          <div>
            <label className="block text-slate-500 mb-1 text-[11px]">
              Mission Statement
            </label>
            <textarea
              value={customBrand.missionDescription || ""}
              onChange={(e) =>
                handleInputChange("missionDescription", e.target.value)
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs h-20 resize-none"
              placeholder="What is your mission? What drives your business?"
            />
          </div>

          {/* Why Choose Us — Locked Notice */}
          <div className="pt-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Why Choose Us
            </label>
            <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/40">
              <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold mb-1">
                <AlertCircle size={12} />
                LOCKED — Auto-Generated
              </div>
              <p className="text-slate-500 text-[10px] leading-relaxed">
                This section auto-loads premium bullet points based on your
                selected category. It cannot be edited to ensure professional
                consistency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizerSidebar;

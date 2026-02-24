import { useState, useMemo, useCallback } from "react";
import {
  DEFAULT_BRANDS,
  FONT_PAIRS,
  COLOR_PALETTES,
  CATEGORY_FONT_MAP,
  CATEGORY_PALETTE_MAP,
  NICHE_SECTION_CONFIG,
  SECTION_VARIANTS,
} from "../data/demoData";
import { fetchWebsiteData } from "../services/scrapeService";
import { improveHeroCopy } from "../services/improveCopyService";

// ═══════════════════════════════════════════════════════════
// THEME SYSTEM — Uses STATIC Tailwind classes (not dynamic hex)
// This is critical: Tailwind can only compile classes it can
// find in source code at build time.
// ═══════════════════════════════════════════════════════════
const THEME_MAP = {
  red: {
    text: "text-red-600",
    bg: "bg-red-600",
    border: "border-red-600",
    lightBg: "bg-red-50",
    lightBorder: "border-red-100",
    shadow: "shadow-red-200",
    ring: "ring-red-500",
    hoverBg: "hover:bg-red-700",
    gradientFrom: "from-red-600",
    gradientTo: "to-red-800",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    border: "border-blue-600",
    lightBg: "bg-blue-50",
    lightBorder: "border-blue-100",
    shadow: "shadow-blue-200",
    ring: "ring-blue-500",
    hoverBg: "hover:bg-blue-700",
    gradientFrom: "from-blue-600",
    gradientTo: "to-blue-800",
  },
  emerald: {
    text: "text-emerald-600",
    bg: "bg-emerald-600",
    border: "border-emerald-600",
    lightBg: "bg-emerald-50",
    lightBorder: "border-emerald-100",
    shadow: "shadow-emerald-200",
    ring: "ring-emerald-500",
    hoverBg: "hover:bg-emerald-700",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-emerald-800",
  },
  orange: {
    text: "text-orange-600",
    bg: "bg-orange-600",
    border: "border-orange-600",
    lightBg: "bg-orange-50",
    lightBorder: "border-orange-100",
    shadow: "shadow-orange-200",
    ring: "ring-orange-500",
    hoverBg: "hover:bg-orange-700",
    gradientFrom: "from-orange-600",
    gradientTo: "to-orange-800",
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-600",
    border: "border-purple-600",
    lightBg: "bg-purple-50",
    lightBorder: "border-purple-100",
    shadow: "shadow-purple-200",
    ring: "ring-purple-500",
    hoverBg: "hover:bg-purple-700",
    gradientFrom: "from-purple-600",
    gradientTo: "to-purple-800",
  },
  indigo: {
    text: "text-indigo-600",
    bg: "bg-indigo-600",
    border: "border-indigo-600",
    lightBg: "bg-indigo-50",
    lightBorder: "border-indigo-100",
    shadow: "shadow-indigo-200",
    ring: "ring-indigo-500",
    hoverBg: "hover:bg-indigo-700",
    gradientFrom: "from-indigo-600",
    gradientTo: "to-indigo-800",
  },
};

// Map color palette IDs to theme color keys
const PALETTE_THEME_MAP = {
  red_black: "red",
  blue_white: "blue",
  emerald_slate: "emerald",
  orange_dark: "orange",
  purple_black: "purple",
  navy_gold: "blue",
  slate_blue: "blue",
  dark_red: "red",
};

// Map themeColor strings to theme keys
const COLOR_NAME_MAP = {
  red: "red",
  blue: "blue",
  emerald: "emerald",
  orange: "orange",
  purple: "purple",
  indigo: "indigo",
};

export const useCustomizer = () => {
  const [activeBrandId, setActiveBrandId] = useState("ielts");
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  // Layout Design States
  const [sectionDesigns, setSectionDesigns] = useState({
    about: "img_right",
    mission: "classic",
    testimonials: "classic",
    faq: "classic",
    features: "grid_3",
    whyChooseUs: "grid_cards",
    niche: "classic",
  });

  // Brand Content State
  const [customBrand, setCustomBrand] = useState({
    ...DEFAULT_BRANDS.ielts,
  });

  // Customization States
  const [fontPairId, setFontPairId] = useState("modern1");
  const [colorPaletteId, setColorPaletteId] = useState("red_black");

  // Scraper & AI States
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [scrapeError, setScrapeError] = useState("");
  const [scrapeSuccess, setScrapeSuccess] = useState("");
  const [improveLoading, setImproveLoading] = useState(false);

  const activeFontPair = useMemo(
    () => FONT_PAIRS.find((f) => f.id === fontPairId) || FONT_PAIRS[0],
    [fontPairId],
  );

  const activePalette = useMemo(
    () =>
      COLOR_PALETTES.find((p) => p.id === colorPaletteId) || COLOR_PALETTES[0],
    [colorPaletteId],
  );

  // Theme: uses static Tailwind classes based on themeColor or paletteId
  const theme = useMemo(() => {
    // First try from themeColor on customBrand
    const colorKey =
      COLOR_NAME_MAP[customBrand.themeColor] ||
      PALETTE_THEME_MAP[colorPaletteId] ||
      "red";
    return THEME_MAP[colorKey] || THEME_MAP.red;
  }, [customBrand.themeColor, colorPaletteId]);

  const handleBrandChange = useCallback((brandId) => {
    const brand = DEFAULT_BRANDS[brandId];
    if (!brand) return;

    setActiveBrandId(brandId);
    setCustomBrand({ ...brand });

    // Auto-update fonts and colors based on category
    if (CATEGORY_FONT_MAP[brand.category || brandId]) {
      setFontPairId(CATEGORY_FONT_MAP[brand.category || brandId]);
    }
    if (CATEGORY_PALETTE_MAP[brand.category || brandId]) {
      setColorPaletteId(CATEGORY_PALETTE_MAP[brand.category || brandId]);
    }
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setCustomBrand((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateSectionDesign = useCallback((section, variant) => {
    setSectionDesigns((prev) => ({ ...prev, [section]: variant }));
  }, []);

  const handleUrlScrape = async () => {
    if (!scrapeUrl.trim()) return;
    setScrapeLoading(true);
    setScrapeError("");
    setScrapeSuccess("");
    try {
      const data = await fetchWebsiteData(scrapeUrl.trim());
      setCustomBrand((prev) => ({
        ...prev,
        logoText: data.title
          ? data.title.split(/[\s\-|]+/)[0] || prev.logoText
          : prev.logoText,
        logoSpan: data.title
          ? data.title.split(/[\s\-|]+/)[1] || prev.logoSpan
          : prev.logoSpan,
        heroTitle: data.title || prev.heroTitle,
        heroDesc: data.description || prev.heroDesc,
        phone: data.phone || prev.phone,
        email: data.email || prev.email,
        address: data.address || prev.address,
        heroImage: data.heroImage || prev.heroImage,
        themeColor: data.brandColor || prev.themeColor,
      }));
      setScrapeSuccess(
        `Auto-filled from ${data.url} (Detected: ${data.niche})`,
      );
    } catch (err) {
      setScrapeError(err.message || "Failed to fetch. Use manual entry.");
    } finally {
      setScrapeLoading(false);
    }
  };

  const handleImproveCopy = () => {
    setImproveLoading(true);
    setTimeout(() => {
      const improved = improveHeroCopy({
        heroTitle: customBrand.heroTitle,
        heroDesc: customBrand.heroDesc,
        logoText: customBrand.logoText,
        logoSpan: customBrand.logoSpan,
        niche: customBrand.id || "coaching",
      });
      setCustomBrand((prev) => ({
        ...prev,
        heroTitle: improved.heroTitle,
        heroSpan: improved.heroSpan,
        heroDesc: improved.heroDesc,
      }));
      setImproveLoading(false);
    }, 800);
  };

  const getNicheConfig = useCallback((brandId) => {
    const brand = DEFAULT_BRANDS[brandId];
    return (
      NICHE_SECTION_CONFIG[brand?.category || brandId] ||
      NICHE_SECTION_CONFIG.coaching
    );
  }, []);

  const handleOnboardingComplete = useCallback((data) => {
    setShowOnboarding(false);
    if (data) {
      setCustomBrand((prev) => ({
        ...prev,
        logoText: data.brandName?.split(" ")[0] || prev.logoText,
        logoSpan:
          data.brandName?.split(" ").slice(1).join(" ") || prev.logoSpan,
        phone: data.phone || prev.phone,
        email: data.email || prev.email,
        address: data.address || prev.address,
        themeColor: data.brandColor || prev.themeColor,
      }));
    }
  }, []);

  const handleOnboardingSkip = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  return {
    activeBrandId,
    setActiveBrandId,
    showCustomizer,
    setShowCustomizer,
    isMenuOpen,
    setIsMenuOpen,
    showOnboarding,
    setShowOnboarding,
    activeFaq,
    setActiveFaq,
    sectionDesigns,
    setSectionDesigns,
    customBrand,
    setCustomBrand,
    fontPairId,
    setFontPairId,
    colorPaletteId,
    setColorPaletteId,
    scrapeUrl,
    setScrapeUrl,
    scrapeLoading,
    scrapeError,
    scrapeSuccess,
    improveLoading,
    handleBrandChange,
    handleInputChange,
    updateSectionDesign,
    handleUrlScrape,
    handleImproveCopy,
    theme,
    activeFontPair,
    activePalette,
    getNicheConfig,
    handleOnboardingComplete,
    handleOnboardingSkip,
    SECTION_VARIANTS: SECTION_VARIANTS,
  };
};

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Palette,
  Image,
  Phone,
  Sparkles,
  Zap,
  CheckCircle,
  X,
  Plus,
  Briefcase,
  ShoppingCart,
  Megaphone,
  Globe,
  FileText,
  Users,
  Rocket,
  LayoutTemplate,
  Eye,
  ChevronDown,
} from "lucide-react";

/* ─────────────────────────────────────────────
   BUSINESS TYPES — used for auto-generating
   default content and presets
   ───────────────────────────────────────────── */
const BUSINESS_TYPES = [
  { id: "coaching", label: "Coaching / Education", icon: "🎓" },
  { id: "consulting", label: "Consulting / Agency", icon: "💼" },
  { id: "healthcare", label: "Healthcare / Clinic", icon: "🩺" },
  { id: "realestate", label: "Real Estate", icon: "🏠" },
  { id: "fitness", label: "Fitness / Gym", icon: "💪" },
  { id: "restaurant", label: "Restaurant / Cafe", icon: "🍽️" },
  { id: "ecommerce", label: "E-Commerce / Retail", icon: "🛒" },
  { id: "saas", label: "SaaS / Technology", icon: "💻" },
  { id: "beauty", label: "Beauty / Salon", icon: "💅" },
  { id: "legal", label: "Legal / Law Firm", icon: "⚖️" },
  { id: "photography", label: "Photography / Creative", icon: "📸" },
  { id: "travel", label: "Travel / Tourism", icon: "✈️" },
  { id: "other", label: "Other", icon: "🌐" },
];

const WEBSITE_STYLES = [
  {
    id: "modern",
    label: "Modern",
    desc: "Clean gradients, bold typography, glassmorphism effects",
    icon: "✨",
    preview: "bg-gradient-to-br from-indigo-600 to-purple-700",
  },
  {
    id: "classic",
    label: "Classic",
    desc: "Traditional layouts, serif fonts, trusted & authoritative feel",
    icon: "🏛️",
    preview: "bg-gradient-to-br from-slate-700 to-slate-900",
  },
  {
    id: "minimalist",
    label: "Minimalist",
    desc: "Lots of whitespace, simple shapes, focus on content",
    icon: "◻️",
    preview: "bg-gradient-to-br from-gray-100 to-gray-300",
  },
  {
    id: "bold",
    label: "Bold & Vibrant",
    desc: "Energetic colors, large text, impactful visuals",
    icon: "🔥",
    preview: "bg-gradient-to-br from-orange-500 to-red-600",
  },
];

const WEBSITE_PURPOSES = [
  {
    id: "lead_magnet",
    label: "Lead Generation",
    desc: "Capture leads with forms & CTAs",
    icon: Megaphone,
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    desc: "Sell products or services online",
    icon: ShoppingCart,
  },
  {
    id: "portfolio",
    label: "Portfolio / Showcase",
    desc: "Showcase work, projects, or services",
    icon: LayoutTemplate,
  },
  {
    id: "informational",
    label: "Informational",
    desc: "Provide info about your business",
    icon: FileText,
  },
  {
    id: "booking",
    label: "Booking / Appointment",
    desc: "Let clients book appointments",
    icon: Users,
  },
  {
    id: "brand",
    label: "Brand Awareness",
    desc: "Build brand recognition & trust",
    icon: Globe,
  },
];

const THEME_COLORS = [
  { id: "red", label: "Ruby Red", hex: "#dc2626", ring: "ring-red-400" },
  { id: "blue", label: "Ocean Blue", hex: "#2563eb", ring: "ring-blue-400" },
  {
    id: "emerald",
    label: "Emerald Green",
    hex: "#10b981",
    ring: "ring-emerald-400",
  },
  {
    id: "orange",
    label: "Sunset Orange",
    hex: "#f97316",
    ring: "ring-orange-400",
  },
  {
    id: "purple",
    label: "Royal Purple",
    hex: "#7c3aed",
    ring: "ring-purple-400",
  },
  { id: "rose", label: "Rose Pink", hex: "#e11d48", ring: "ring-rose-400" },
];

/* ─────────────────────────────────────────────
   STEP INDICATOR
   ───────────────────────────────────────────── */
const steps = [
  {
    id: 1,
    title: "Business Identity",
    icon: Building2,
    subtitle: "Tell us about your business",
  },
  {
    id: 2,
    title: "Content & Imagery",
    icon: Image,
    subtitle: "Headlines, images & hero",
  },
  {
    id: 3,
    title: "Style & Purpose",
    icon: Palette,
    subtitle: "How should it look & feel",
  },
  {
    id: 4,
    title: "Contact & Launch",
    icon: Rocket,
    subtitle: "Final details & go live",
  },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
const BusinessOnboardingForm = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const formRef = useRef(null);

  // ─── Form State ──────────────────────────
  const [formData, setFormData] = useState({
    // Step 1 — Business Identity
    businessName: "",
    businessType: "",
    description: "",
    tagline: "",

    // Step 2 — Content & Imagery
    heroTitle: "",
    heroHighlight: "",
    heroDescription: "",
    heroImages: [""],

    // Step 3 — Style & Purpose
    websiteStyle: "modern",
    websitePurpose: "lead_magnet",
    themeColor: "red",

    // Step 4 — Contact
    phone: "",
    email: "",
    address: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ─── Hero images management ──────────────
  const addHeroImage = () => {
    if (formData.heroImages.length < 5) {
      setFormData((prev) => ({
        ...prev,
        heroImages: [...prev.heroImages, ""],
      }));
    }
  };

  const removeHeroImage = (index) => {
    if (formData.heroImages.length > 1) {
      setFormData((prev) => ({
        ...prev,
        heroImages: prev.heroImages.filter((_, i) => i !== index),
      }));
    }
  };

  const updateHeroImage = (index, value) => {
    setFormData((prev) => {
      const newImages = [...prev.heroImages];
      newImages[index] = value;
      return { ...prev, heroImages: newImages };
    });
  };

  // ─── Navigation ──────────────────────────
  const goToStep = (step) => {
    if (step === currentStep || isAnimating) return;
    setDirection(step > currentStep ? "next" : "prev");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsAnimating(false);
      formRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const nextStep = () => {
    if (currentStep < 4) goToStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) goToStep(currentStep - 1);
  };

  // ─── Validation ──────────────────────────
  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return (
          formData.businessName.trim().length > 0 &&
          formData.businessType.length > 0
        );
      case 2:
        return formData.heroTitle.trim().length > 0;
      case 3:
        return (
          formData.websiteStyle.length > 0 && formData.websitePurpose.length > 0
        );
      case 4:
        return true; // Contact details are optional
      default:
        return true;
    }
  };

  // ─── Auto-generate content from Business Name & Type ──
  useEffect(() => {
    if (formData.businessName && formData.businessType && !formData.heroTitle) {
      const type = BUSINESS_TYPES.find((t) => t.id === formData.businessType);
      if (type) {
        // Suggest a hero title and highlight
        const parts = formData.businessName.trim().split(/\s+/);
        if (parts.length >= 2) {
          updateField("heroTitle", parts.slice(0, -1).join(" "));
          updateField("heroHighlight", parts[parts.length - 1]);
        } else {
          updateField("heroTitle", formData.businessName);
          updateField("heroHighlight", "Excellence");
        }
      }
    }
  }, [formData.businessName, formData.businessType]);

  // ─── Submit Handler ──────────────────────
  const handleLaunch = () => {
    // Map form data to the customBrand shape used by DemoApp
    const nameParts = formData.businessName.trim().split(/\s+/);
    const logoText = nameParts[0] || "Brand";
    const logoSpan = nameParts.slice(1).join(" ") || "Studio";

    // Choose style mapping
    const styleMap = {
      modern: { navbarStyle: "glass", heroStyle: "centered" },
      classic: { navbarStyle: "standard", heroStyle: "split" },
      minimalist: { navbarStyle: "minimal", heroStyle: "centered" },
      bold: { navbarStyle: "dark", heroStyle: "fullscreen" },
    };

    const styleConfig = styleMap[formData.websiteStyle] || styleMap.modern;

    const brandConfig = {
      id: "custom",
      name: `${formData.businessName} Website`,
      logoText,
      logoSpan,
      tagline:
        formData.tagline || `${formData.businessName} — Built for growth`,
      phone: formData.phone || "+1 (555) 000-0000",
      address: formData.address || "Your Business Address",
      email: formData.email || "hello@yourbusiness.com",
      heroTitle: formData.heroTitle || formData.businessName,
      heroSpan: formData.heroHighlight || "Excellence",
      heroDesc:
        formData.heroDescription ||
        formData.description ||
        `Welcome to ${formData.businessName}. Discover our premium services and offerings.`,
      themeColor: formData.themeColor || "red",
      navbarStyle: styleConfig.navbarStyle,
      heroStyle: styleConfig.heroStyle,
      heroImage:
        formData.heroImages.find((img) => img.trim()) ||
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      gridImages:
        formData.heroImages.filter((img) => img.trim()).length >= 4
          ? formData.heroImages.filter((img) => img.trim()).slice(0, 4)
          : [
              formData.heroImages.find((img) => img.trim()) ||
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
            ],
      marqueeItems: [
        formData.tagline || "Premium Services",
        BUSINESS_TYPES.find((t) => t.id === formData.businessType)?.label ||
          "Professional",
        "Trusted & Reliable",
        "Book a Consultation",
      ],
      stats: [
        { label: "Happy Clients", value: "500+" },
        { label: "Years Experience", value: "10+" },
        { label: "Projects Done", value: "1k+" },
        { label: "Satisfaction", value: "99%" },
      ],
      courses: [
        {
          title: "Our Services",
          desc: "Comprehensive solutions tailored to your needs.",
        },
        {
          title: "Expert Team",
          desc: "Skilled professionals dedicated to your success.",
        },
        {
          title: "Quality Assurance",
          desc: "Uncompromising standards in every project.",
        },
        {
          title: "Support 24/7",
          desc: "Round the clock assistance when you need it.",
        },
      ],
      faqs: [
        {
          q: "What services do you offer?",
          a: "We provide a full range of professional services tailored to your industry.",
        },
        {
          q: "How can I get started?",
          a: "Simply contact us through our form or give us a call to schedule a consultation.",
        },
      ],
      // Extra metadata for the form
      _businessType: formData.businessType,
      _websiteStyle: formData.websiteStyle,
      _websitePurpose: formData.websitePurpose,
    };

    onComplete(brandConfig);
  };

  // ─── Progress percentage ────────────────
  const progress = (currentStep / 4) * 100;

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col overflow-hidden">
      {/* ─── Animated Background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: "10s" }}
        />
      </div>

      {/* ─── Header ─── */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">
                Demo Creator Studio
              </h1>
              <p className="text-slate-500 text-xs">
                Build your perfect website in minutes
              </p>
            </div>
          </div>

          <button
            onClick={onSkip}
            className="text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors flex items-center gap-2 group px-4 py-2 rounded-xl hover:bg-white/5"
          >
            Skip to Editor
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        {/* ─── Progress Bar ─── */}
        <div className="h-[2px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ─── Step Indicators ─── */}
      <div className="relative z-10 max-w-4xl mx-auto w-full px-6 pt-8 pb-2">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => {
                    if (isCompleted || isActive) goToStep(step.id);
                  }}
                  className={`flex flex-col items-center gap-2 transition-all duration-300 group ${
                    isActive || isCompleted
                      ? "cursor-pointer"
                      : "cursor-default opacity-40"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 scale-110"
                        : isCompleted
                          ? "bg-emerald-500/20 border border-emerald-500/30"
                          : "bg-white/5 border border-white/10"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={20} className="text-emerald-400" />
                    ) : (
                      <Icon
                        size={20}
                        className={isActive ? "text-white" : "text-slate-500"}
                      />
                    )}
                  </div>
                  <div className="text-center hidden sm:block">
                    <p
                      className={`text-[11px] font-bold tracking-wide ${
                        isActive
                          ? "text-white"
                          : isCompleted
                            ? "text-emerald-400"
                            : "text-slate-600"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-[9px] text-slate-600 mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-4 mt-[-24px] sm:mt-0">
                    <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          currentStep > step.id
                            ? "bg-emerald-500 w-full"
                            : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ─── Form Content Area ─── */}
      <div
        ref={formRef}
        className="flex-1 overflow-y-auto relative z-10 px-6 py-6"
      >
        <div
          className={`max-w-3xl mx-auto transition-all duration-300 ${
            isAnimating
              ? direction === "next"
                ? "opacity-0 translate-x-8"
                : "opacity-0 -translate-x-8"
              : "opacity-100 translate-x-0"
          }`}
        >
          {/* ═══════════════════════════════════════
              STEP 1 — Business Identity
              ═══════════════════════════════════════ */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-white tracking-tight mb-3">
                  What's Your Business?
                </h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                  Let's start with the basics. This info helps us tailor a
                  website design that perfectly fits your brand.
                </p>
              </div>

              {/* Business Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Business Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  placeholder="e.g. Apex Consulting, Iron Foundry Gym, Care Plus Clinic..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all duration-300 hover:border-white/20"
                />
              </div>

              {/* Business Type */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Type of Business <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BUSINESS_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => updateField("businessType", type.id)}
                      className={`group px-4 py-3.5 rounded-2xl border text-left transition-all duration-300 ${
                        formData.businessType === type.id
                          ? "bg-indigo-500/15 border-indigo-500/40 shadow-lg shadow-indigo-500/5"
                          : "bg-white/[0.02] border-white/8 hover:border-white/15 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{type.icon}</span>
                        <span
                          className={`text-xs font-semibold ${
                            formData.businessType === type.id
                              ? "text-indigo-300"
                              : "text-slate-400 group-hover:text-slate-300"
                          }`}
                        >
                          {type.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Tagline / Slogan
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  placeholder="e.g. 'Your Success, Our Mission' or 'Built for Excellence'"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all duration-300 hover:border-white/20"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Business Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Briefly describe what your business does, your unique value proposition, and what makes you stand out..."
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all duration-300 resize-none hover:border-white/20 leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
              STEP 2 — Content & Imagery
              ═══════════════════════════════════════ */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-white tracking-tight mb-3">
                  Content & Hero Section
                </h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                  Craft your headline and add stunning images. This is what
                  visitors see first — make it count.
                </p>
              </div>

              {/* Hero Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Hero Title (Main Line){" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) => updateField("heroTitle", e.target.value)}
                    placeholder="e.g. Unlock Your"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all duration-300 hover:border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Hero Highlight (Accent)
                  </label>
                  <input
                    type="text"
                    value={formData.heroHighlight}
                    onChange={(e) =>
                      updateField("heroHighlight", e.target.value)
                    }
                    placeholder="e.g. Full Potential"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all duration-300 hover:border-white/20"
                  />
                </div>
              </div>

              {/* Hero Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Hero Description
                </label>
                <textarea
                  value={formData.heroDescription}
                  onChange={(e) =>
                    updateField("heroDescription", e.target.value)
                  }
                  placeholder="A compelling paragraph that appears below the hero headline. Describe your value proposition..."
                  rows={3}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all duration-300 resize-none hover:border-white/20 leading-relaxed"
                />
              </div>

              {/* Live Preview Card */}
              {(formData.heroTitle || formData.heroHighlight) && (
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye size={14} className="text-indigo-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Live Preview
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {formData.heroTitle || "Your Headline"}{" "}
                    <span className="text-indigo-400">
                      {formData.heroHighlight || "Here"}
                    </span>
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {formData.heroDescription ||
                      formData.description ||
                      "Your description will appear here..."}
                  </p>
                </div>
              )}

              {/* Hero Images */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Hero Images (URLs)
                  </label>
                  {formData.heroImages.length < 5 && (
                    <button
                      onClick={addHeroImage}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Plus size={12} /> Add More
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {formData.heroImages.map((img, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={img}
                          onChange={(e) => updateHeroImage(i, e.target.value)}
                          placeholder={`https://images.unsplash.com/photo-... (Image ${i + 1})`}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:border-indigo-500/50 outline-none transition-all duration-300 hover:border-white/20 pr-12"
                        />
                        {img && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                            <img
                              src={img}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                        )}
                      </div>
                      {formData.heroImages.length > 1 && (
                        <button
                          onClick={() => removeHeroImage(i)}
                          className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-600">
                  Tip: Use Unsplash URLs for free, high-quality images. Up to 5
                  images allowed.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
              STEP 3 — Style & Purpose
              ═══════════════════════════════════════ */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-white tracking-tight mb-3">
                  Style & Purpose
                </h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                  Choose the visual aesthetic and primary goal for your website.
                  We'll configure everything to match.
                </p>
              </div>

              {/* Website Style */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Website Style
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {WEBSITE_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => updateField("websiteStyle", style.id)}
                      className={`group relative p-5 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${
                        formData.websiteStyle === style.id
                          ? "border-indigo-500/40 shadow-xl shadow-indigo-500/10 bg-indigo-500/10"
                          : "border-white/8 hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.04]"
                      }`}
                    >
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-30 ${style.preview} transition-opacity`}
                      />
                      <div className="relative z-10">
                        <span className="text-2xl mb-2 block">
                          {style.icon}
                        </span>
                        <h4
                          className={`font-bold text-sm mb-1 ${
                            formData.websiteStyle === style.id
                              ? "text-indigo-300"
                              : "text-white"
                          }`}
                        >
                          {style.label}
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {style.desc}
                        </p>
                      </div>
                      {formData.websiteStyle === style.id && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle size={16} className="text-indigo-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Website Purpose */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Primary Purpose
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {WEBSITE_PURPOSES.map((purpose) => {
                    const Icon = purpose.icon;
                    return (
                      <button
                        key={purpose.id}
                        onClick={() =>
                          updateField("websitePurpose", purpose.id)
                        }
                        className={`group p-4 rounded-2xl border text-left transition-all duration-300 ${
                          formData.websitePurpose === purpose.id
                            ? "bg-purple-500/15 border-purple-500/40 shadow-lg shadow-purple-500/5"
                            : "bg-white/[0.02] border-white/8 hover:border-white/15 hover:bg-white/[0.04]"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={`mb-2 ${
                            formData.websitePurpose === purpose.id
                              ? "text-purple-400"
                              : "text-slate-500 group-hover:text-slate-400"
                          }`}
                        />
                        <h4
                          className={`text-xs font-bold mb-0.5 ${
                            formData.websitePurpose === purpose.id
                              ? "text-purple-300"
                              : "text-slate-300"
                          }`}
                        >
                          {purpose.label}
                        </h4>
                        <p className="text-[10px] text-slate-600">
                          {purpose.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme Color */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Brand Color
                </label>
                <div className="flex gap-4 flex-wrap">
                  {THEME_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => updateField("themeColor", color.id)}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 ${
                        formData.themeColor === color.id
                          ? "border-white/20 bg-white/[0.06] shadow-lg"
                          : "border-white/5 bg-white/[0.02] hover:border-white/15"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full transition-all duration-300 ${
                          formData.themeColor === color.id
                            ? "scale-110 ring-2 ring-offset-2 ring-offset-slate-950 " +
                              color.ring
                            : "opacity-70 group-hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          formData.themeColor === color.id
                            ? "text-white"
                            : "text-slate-500 group-hover:text-slate-300"
                        }`}
                      >
                        {color.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
              STEP 4 — Contact & Launch
              ═══════════════════════════════════════ */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-white tracking-tight mb-3">
                  Final Details & Launch 🚀
                </h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                  Add your contact information. These details will be displayed
                  on your website's contact section and footer.
                </p>
              </div>

              {/* Contact Fields */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all duration-300 hover:border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="hello@yourbusiness.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all duration-300 hover:border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Business Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="123 Business Street, City, Country"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all duration-300 hover:border-white/20"
                  />
                </div>
              </div>

              {/* Review Summary Card */}
              <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-emerald-400" />
                  <span className="text-sm font-bold text-white">
                    Review Summary
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                      Business
                    </p>
                    <p className="text-sm text-white font-medium mt-0.5">
                      {formData.businessName || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                      Industry
                    </p>
                    <p className="text-sm text-white font-medium mt-0.5">
                      {BUSINESS_TYPES.find(
                        (t) => t.id === formData.businessType,
                      )?.label || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                      Style
                    </p>
                    <p className="text-sm text-white font-medium mt-0.5">
                      {WEBSITE_STYLES.find(
                        (s) => s.id === formData.websiteStyle,
                      )?.label || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                      Purpose
                    </p>
                    <p className="text-sm text-white font-medium mt-0.5">
                      {WEBSITE_PURPOSES.find(
                        (p) => p.id === formData.websitePurpose,
                      )?.label || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                      Headline
                    </p>
                    <p className="text-sm text-white font-medium mt-0.5">
                      {formData.heroTitle}{" "}
                      <span className="text-indigo-400">
                        {formData.heroHighlight}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                      Color
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            THEME_COLORS.find(
                              (c) => c.id === formData.themeColor,
                            )?.hex || "#dc2626",
                        }}
                      />
                      <span className="text-sm text-white font-medium">
                        {THEME_COLORS.find((c) => c.id === formData.themeColor)
                          ?.label || "Red"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Bottom Navigation Bar ─── */}
      <div className="relative z-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Back Button */}
          <div>
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold text-sm transition-colors group px-4 py-2.5 rounded-xl hover:bg-white/5"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
                Back
              </button>
            ) : (
              <div />
            )}
          </div>

          {/* Next / Launch Button */}
          <div className="flex items-center gap-3">
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm px-8 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-indigo-500/25 group"
              >
                Continue
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            ) : (
              <button
                onClick={handleLaunch}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm px-10 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.03] transition-all duration-300 group"
              >
                <Rocket
                  size={18}
                  className="group-hover:-translate-y-0.5 transition-transform"
                />
                Generate My Website
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOnboardingForm;

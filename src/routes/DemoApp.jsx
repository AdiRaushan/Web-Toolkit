import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  CheckCircle,
  Monitor,
  Users,
  BookOpen,
  Star,
  Zap,
  MapPin,
  TrendingUp,
  Target,
  Video,
  Globe,
  Mic,
  PenTool,
  Headphones,
  FileText,
  GraduationCap,
  Clock,
  Search,
  Activity,
  Share2,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { fetchWebsiteData } from "../services/scrapeService";
import { improveHeroCopy } from "../services/improveCopyService";

/**
 * DemoApp — Demo Creator Template App
 * Moved from original App.jsx. All existing logic preserved.
 * NEW: URL auto-fill + Improve Copy features added on top.
 */

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // --- NEW: URL Auto-Fill State ---
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [scrapeError, setScrapeError] = useState("");
  const [scrapeSuccess, setScrapeSuccess] = useState("");
  const [improveLoading, setImproveLoading] = useState(false);

  // Check if pre-filled data was passed from Audit page via router state
  const routerLocation = useLocation();
  const prefillDataRef = React.useRef(false);

  // --- BRAND CONFIGURATION & STATE ---
  const defaultBrands = {
    ielts: {
      id: "ielts",
      name: "IELTS Customization",
      logoText: "IELTS",
      logoSpan: "Coaching",
      tagline: "Empowering Students Since 2008",
      phone: "9319933553",
      address: "Sector 12, Dwarka, New Delhi",
      email: "info@ieltscoachingindia.com",
      heroTitle: "Your IELTS Success",
      heroSpan: "Starts Here",
      heroDesc:
        "Expert-led training focused on real exam strategies. Personalised guidance, structured practice, and results you can trust.",
      themeColor: "red",
      navbarStyle: "standard",
      heroStyle: "split",
      heroImage:
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80",
      gridImages: [
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1565514020176-db936c533e44?auto=format&fit=crop&w=800&q=80",
      ],
      marqueeItems: [
        "Best IELTS Institute 2024",
        "British Council Partner",
        "IDP Nodal Centre",
        "98% Success Rate",
      ],
      stats: [
        { label: "Band 7+ Scorers", value: "1000+" },
        { label: "Years Experience", value: "8+" },
        { label: "Google Rating", value: "4.9/5" },
        { label: "Student Satisfaction", value: "100%" },
      ],
      courses: [
        {
          title: "IELTS Speaking",
          icon: Mic,
          desc: "Conversations with foreigners are not going to make you comfortable though. Does studying...",
        },
        {
          title: "IELTS Writing",
          icon: PenTool,
          desc: "Residing in an English speaking nation, one cannot avoid written communication...",
        },
        {
          title: "IELTS Reading",
          icon: BookOpen,
          desc: "IELTS reading has been also classified into IELTS Academic reading and IELTS General...",
        },
        {
          title: "IELTS Listening",
          icon: Headphones,
          desc: "Does studying in an English medium school makes someone a natural speaker...",
        },
      ],
      faqs: [
        {
          q: "What is the difference between Academic and General Training?",
          a: "Academic is for higher education...",
        },
        {
          q: "Where is the institute located?",
          a: "We are located at E-521, 3rd Floor, Sec 7, Dwarka...",
        },
      ],
    },
    institute: {
      id: "institute",
      name: "Institute Customization",
      logoText: "EESA",
      logoSpan: "Academy",
      tagline: "Expert English Speaking Academy",
      phone: "98101 26691",
      address: "Vijay Enclave, New Delhi",
      email: "info@eesaacademy.com",
      heroTitle: "Master English with",
      heroSpan: "EESA Academy",
      heroDesc:
        "The premier institute for Spoken English and IELTS training in Delhi. Gain confidence, fluency, and the skills to succeed globally.",
      themeColor: "red",
      navbarStyle: "standard",
      heroStyle: "split",
      heroImage:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      gridImages: [
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544531679-37787654780d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577896335478-408d700ba037?auto=format&fit=crop&w=800&q=80",
      ],
      marqueeItems: [
        "Certified Trainers",
        "Spoken English Experts",
        "Personality Development",
        "Live Classes",
      ],
      stats: [
        { label: "Active Students", value: "500+" },
        { label: "Expert Trainers", value: "15+" },
        { label: "Courses Offered", value: "12" },
        { label: "Success Rate", value: "98%" },
      ],
      courses: [
        {
          title: "Spoken English",
          icon: Mic,
          desc: "Enhance your daily communication skills with confidence.",
        },
        {
          title: "Business English",
          icon: FileText,
          desc: "Professional communication for the corporate world.",
        },
        {
          title: "Public Speaking",
          icon: Users,
          desc: "Overcome stage fear and speak with authority.",
        },
        {
          title: "Personality Dev",
          icon: Star,
          desc: "Holistic development for personal and professional growth.",
        },
      ],
      faqs: [
        {
          q: "Do you offer demo classes?",
          a: "Yes, we provide 2 free demo sessions.",
        },
        {
          q: "What is the batch size?",
          a: "We maintain small batches of 10-12 students.",
        },
      ],
    },
    coaching: {
      id: "coaching",
      name: "Coaching Customization",
      logoText: "City",
      logoSpan: "Coaching",
      tagline: "Excellence in Education",
      phone: "+91 98765 43210",
      address: "Connaught Place, New Delhi",
      email: "contact@citycoaching.com",
      heroTitle: "Unlock Your",
      heroSpan: "Potential Today",
      heroDesc:
        "Comprehensive coaching for competitive exams and academic success. Join us to achieve your dreams with expert guidance.",
      themeColor: "orange",
      navbarStyle: "standard",
      heroStyle: "classic",
      heroImage:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
      marqueeItems: [
        "Top Rankers 2023",
        "National Level Faculty",
        "Best Study Material",
        "Regular Test Series",
      ],
      stats: [
        { label: "Selections", value: "2000+" },
        { label: "Top Rankers", value: "50+" },
        { label: "Faculty Members", value: "30+" },
        { label: "Pan India Centers", value: "10" },
      ],
      courses: [
        {
          title: "UPSC Prelims",
          icon: BookOpen,
          desc: "Comprehensive GS and CSAT preparation.",
        },
        {
          title: "SSC CGL",
          icon: TrendingUp,
          desc: "Targeted coaching for staff selection commission exams.",
        },
        {
          title: "Banking PO",
          icon: Target,
          desc: "Specialized batches for IBPS and SBI PO exams.",
        },
        {
          title: "State PCS",
          icon: MapPin,
          desc: "State-specific public service commission preparation.",
        },
      ],
      faqs: [
        {
          q: "Is study material included?",
          a: "Yes, comprehensive printed notes are provided.",
        },
        {
          q: "Is hostel facility available?",
          a: "We have tie-ups with nearby PG accommodations.",
        },
      ],
    },
    consultant: {
      id: "consultant",
      name: "Consultant Website",
      logoText: "Apex",
      logoSpan: "Solutions",
      tagline: "Strategic Business Consulting",
      phone: "+1 555-0123",
      address: "Business Bay, Dubai",
      email: "growth@apexsolutions.com",
      heroTitle: "Scaling Your",
      heroSpan: "Business Vision",
      heroDesc:
        "We provide data-driven strategies to help enterprises grow, optimize operations, and maximize profitability in a digital age.",
      themeColor: "blue",
      navbarStyle: "minimal",
      heroStyle: "centered",
      heroImage:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
      marqueeItems: [
        "Fortune 500 Partners",
        "Best Consultancy 2024",
        "Global Presence",
        "Award Winning Strategy",
      ],
      stats: [
        { label: "Clients Served", value: "150+" },
        { label: "Revenue Generated", value: "$500M" },
        { label: "Growth Rate", value: "3x" },
        { label: "Countries", value: "12" },
      ],
      courses: [
        {
          title: "Strategy Consulting",
          icon: Target,
          desc: "Long-term planning for sustainable growth.",
        },
        {
          title: "Digital Transformation",
          icon: Monitor,
          desc: "Modernizing legacy systems for the digital era.",
        },
        {
          title: "Financial Advisory",
          icon: TrendingUp,
          desc: "Optimizing capital allocation and cash flow.",
        },
        {
          title: "HR Solutions",
          icon: Users,
          desc: "Talent acquisition and organizational structure.",
        },
      ],
      faqs: [
        {
          q: "How do you charge for services?",
          a: "We offer both retainer and project-based pricing models.",
        },
        {
          q: "Do you work with startups?",
          a: "Yes, we have a specialized accelerator program for startups.",
        },
      ],
    },
    realestate: {
      id: "realestate",
      name: "Real Estate Landing",
      logoText: "Prime",
      logoSpan: "Estates",
      tagline: "Luxury Living Redefined",
      phone: "+44 20 7123 4567",
      address: "Kensington, London",
      email: "sales@primeestates.com",
      heroTitle: "Find Your",
      heroSpan: "Dream Home",
      heroDesc:
        "Discover an exclusive collection of luxury properties in prime locations. Experience elegant living with world-class amenities.",
      themeColor: "emerald",
      navbarStyle: "dark",
      heroStyle: "classic",
      heroImage:
        "https://images.unsplash.com/photo-1600596542815-2a4d04774c13?auto=format&fit=crop&w=1200&q=80",
      marqueeItems: [
        "Luxury Properties",
        "Trusted Developers",
        "Prime Locations",
        "Exclusive Deals",
      ],
      stats: [
        { label: "Properties Sold", value: "450+" },
        { label: "Happy Families", value: "400+" },
        { label: "Years in Market", value: "25" },
        { label: "Industry Awards", value: "18" },
      ],
      courses: [
        {
          title: "Luxury Villas",
          icon: Star,
          desc: "Spacious independent villas with private pools.",
        },
        {
          title: "Penthouse Suites",
          icon: Zap,
          desc: "Sky-high living with panoramic city views.",
        },
        {
          title: "Commercial Spaces",
          icon: Monitor,
          desc: "Premium office spaces in business districts.",
        },
        {
          title: "Rental Management",
          icon: CheckCircle,
          desc: "End-to-end property management services.",
        },
      ],
      faqs: [
        {
          q: "Do you assist with loans?",
          a: "We have partners who can assist with mortgage approvals.",
        },
        {
          q: "Can I schedule a site visit?",
          a: "Absolutely, contact us to book a private tour.",
        },
      ],
    },
    clinic: {
      id: "clinic",
      name: "Clinic Website",
      logoText: "Care",
      logoSpan: "Plus",
      tagline: "Your Health, Our Priority",
      phone: "(02) 9876 5432",
      address: "Medical Center Dr, Sydney",
      email: "appointments@careplus.com",
      heroTitle: "Compassionate",
      heroSpan: "Healthcare",
      heroDesc:
        "State-of-the-art medical facility providing comprehensive care for you and your family. Expert doctors available 24/7.",
      themeColor: "blue",
      navbarStyle: "standard",
      heroStyle: "split",
      heroImage:
        "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=1200&q=80",
      marqueeItems: [
        "24/7 Emergency",
        "Expert Doctors",
        "Advanced Technology",
        "Patient Care First",
      ],
      stats: [
        { label: "Pacients Treated", value: "50k+" },
        { label: "Specialist Doctors", value: "40+" },
        { label: "Emergency Rooms", value: "10" },
        { label: "Surgeries Done", value: "1200+" },
      ],
      courses: [
        {
          title: "General Medicine",
          icon: Activity,
          desc: "Routine checkups and primary healthcare.",
        },
        {
          title: "Pediatrics",
          icon: Users,
          desc: "Specialized care for infants and children.",
        },
        {
          title: "Dental Care",
          icon: CheckCircle,
          desc: "Advanced dental treatments and cosmetics.",
        },
        {
          title: "Cardiology",
          icon: Target,
          desc: "Heart health monitoring and treatments.",
        },
      ],
      faqs: [
        {
          q: "Do you accept insurance?",
          a: "We accept all major health insurance providers.",
        },
        {
          q: "Is emergency care available?",
          a: "Yes, our emergency department is open 24/7.",
        },
      ],
    },
    gym: {
      id: "gym",
      name: "Fitness / Gym",
      logoText: "Iron",
      logoSpan: "Foundry",
      tagline: "Forge Your Best Self",
      phone: "+1 310-555-0199",
      address: "Venice Beach, CA",
      email: "join@ironfoundry.fit",
      heroTitle: "Build Strength",
      heroSpan: "No Excuses",
      heroDesc:
        "Join the elite fitness community. Premium equipment, expert trainers, and a motivating atmosphere to crush your goals.",
      themeColor: "orange",
      navbarStyle: "dark",
      heroStyle: "centered",
      heroImage:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      marqueeItems: [
        "Best Gym 2024",
        "Top Trainers",
        "State of Art Equipment",
        "Open 24/7",
      ],
      stats: [
        { label: "Members", value: "2000+" },
        { label: "Trainers", value: "25" },
        { label: "Classes/Week", value: "50+" },
        { label: "Sq Ft Area", value: "10k" },
      ],
      courses: [
        {
          title: "Personal Training",
          icon: Users,
          desc: "1-on-1 coaching customized to your body.",
        },
        {
          title: "Group Classes",
          icon: Users,
          desc: "High energy HIIT, Yoga, and Spin classes.",
        },
        {
          title: "Nutrition Plans",
          icon: FileText,
          desc: "Dietary guidance to fuel your performance.",
        },
        {
          title: "Strength Zone",
          icon: Zap,
          desc: "Free weights and heavy lifting area.",
        },
      ],
      faqs: [
        {
          q: "Can I freeze my membership?",
          a: "Yes, you can pause membership for up to 3 months.",
        },
        {
          q: "Are showers available?",
          a: "We have full locker rooms with saunas and showers.",
        },
      ],
    },
    marketing: {
      id: "marketing",
      name: "Digital Agency",
      logoText: "Pixel",
      logoSpan: "Growth",
      tagline: "Data Driven Marketing",
      phone: "+65 6789 0123",
      address: "Marina Bay, Singapore",
      email: "hello@pixelgrowth.sg",
      heroTitle: "Accelerate",
      heroSpan: "Your Growth",
      heroDesc:
        "We build brands and drive revenue through SEO, PPC, and Social Media strategies that actually deliver ROI.",
      themeColor: "emerald", // Using emerald as purple isn't in my theme map, will default or add
      navbarStyle: "minimal",
      heroStyle: "centered",
      heroImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
      marqueeItems: [
        "Google Premium Partner",
        "Meta Business Partner",
        "ROI Focused",
        "Award Winning Agency",
      ],
      stats: [
        { label: "Ad Spend Managed", value: "$10M+" },
        { label: "ROI Average", value: "450%" },
        { label: "Campaigns Run", value: "1k+" },
        { label: "Team Size", value: "20" },
      ],
      courses: [
        {
          title: "SEO Optimization",
          icon: TrendingUp,
          desc: "Rank higher on Google organically.",
        },
        {
          title: "PPC Advertising",
          icon: Target,
          desc: "Targeted ads on Google and Facebook.",
        },
        {
          title: "Content Strategy",
          icon: PenTool,
          desc: "Engaging content that converts visitors.",
        },
        {
          title: "Social Media",
          icon: Share2,
          desc: "Brand building on Instagram and LinkedIn.",
        },
      ],
      faqs: [
        {
          q: "What is your minimum budget?",
          a: "We work with ad budgets starting from $2k/month.",
        },
        {
          q: "Do you offer reporting?",
          a: "Yes, we provide weekly transparent performance reports.",
        },
      ],
    },
  };

  const [activeBrandId, setActiveBrandId] = useState("institute");
  const [customBrand, setCustomBrand] = useState(defaultBrands.institute);
  const [showCustomizer, setShowCustomizer] = useState(true);

  // When switching presets, reset the customBrand state but keep design config if desired?
  // For now, let's allow presets to also dictate default design, or just keep content.
  // The user asked for "customization section" for each. Let's attach design props to presets for a "starting point".
  const handleBrandChange = (brandId) => {
    setActiveBrandId(brandId);
    setCustomBrand({
      ...defaultBrands[brandId],
      // Preserve current design choices or reset? Let's preserve to allow mixing & matching unless preset has specifics.
      navbarStyle: customBrand.navbarStyle,
      heroStyle: customBrand.heroStyle,
      themeColor: customBrand.themeColor,
    });
  };

  // Draggable logic for the toggle button
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: 20,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Attach global mouse events for dragging (using effect or simple div wrapper if full screen, easier to just add listener to window)
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // COLOR THEME HELPER
  const getThemeClasses = (color) => {
    const themes = {
      red: {
        text: "text-red-600",
        bg: "bg-red-600",
        border: "border-red-600",
        lightBg: "bg-red-50",
        lightBorder: "border-red-100",
        shadow: "shadow-red-200",
      },
      blue: {
        text: "text-blue-600",
        bg: "bg-blue-600",
        border: "border-blue-600",
        lightBg: "bg-blue-50",
        lightBorder: "border-blue-100",
        shadow: "shadow-blue-200",
      },
      emerald: {
        text: "text-emerald-600",
        bg: "bg-emerald-600",
        border: "border-emerald-600",
        lightBg: "bg-emerald-50",
        lightBorder: "border-emerald-100",
        shadow: "shadow-emerald-200",
      },
      orange: {
        text: "text-orange-600",
        bg: "bg-orange-600",
        border: "border-orange-600",
        lightBg: "bg-orange-50",
        lightBorder: "border-orange-100",
        shadow: "shadow-orange-200",
      },
    };
    return themes[color] || themes.red;
  };

  const theme = getThemeClasses(customBrand.themeColor || "red");

  // Handle manual edits
  const handleInputChange = (field, value) => {
    setCustomBrand((prev) => ({ ...prev, [field]: value }));
  };

  // --- NEW: URL Auto-Fill Handler ---
  const handleUrlScrape = async () => {
    if (!scrapeUrl.trim()) return;
    setScrapeLoading(true);
    setScrapeError("");
    setScrapeSuccess("");
    try {
      const data = await fetchWebsiteData(scrapeUrl.trim());
      // Auto-fill the form state with scraped data
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

  // --- NEW: Improve Copy Handler ---
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
    }, 800); // Small delay for UX feel
  };

  // --- NEW: Pre-fill from Audit page navigation ---
  React.useEffect(() => {
    if (routerLocation.state?.prefillData && !prefillDataRef.current) {
      prefillDataRef.current = true;
      const data = routerLocation.state.prefillData;
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
      setScrapeSuccess("Pre-filled from audit data!");
    }
  }, [routerLocation.state]);

  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-red-100 selection:text-red-900 relative">
      {/* --- CUSTOMIZER SIDEBAR (Right Side) --- */}
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
              {Object.values(defaultBrands).map((brand) => (
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
                  onChange={(e) =>
                    handleInputChange("logoText", e.target.value)
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 text-[11px]">
                  Logo Highlight
                </label>
                <input
                  value={customBrand.logoSpan}
                  onChange={(e) =>
                    handleInputChange("logoSpan", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleInputChange("heroTitle", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleInputChange("heroSpan", e.target.value)
                  }
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
                      (customBrand.gridImages &&
                        customBrand.gridImages[index]) ||
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

            {/* Theme Color */}
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

            {/* Navbar Style */}
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Navbar Style
              </label>
              <select
                value={customBrand.navbarStyle || "standard"}
                onChange={(e) =>
                  handleInputChange("navbarStyle", e.target.value)
                }
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
          </div>
        </div>
      </div>

      {/* --- SIDEBAR TOGGLE TAB (Always visible on right edge) --- */}
      <button
        onClick={() => setShowCustomizer(!showCustomizer)}
        className={`fixed top-1/2 -translate-y-1/2 z-[99] transition-all duration-300 ${
          showCustomizer ? "right-[380px]" : "right-0"
        }`}
      >
        <div className="bg-slate-900 text-white px-2 py-4 rounded-l-xl shadow-2xl border border-r-0 border-slate-700 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2 group">
          <PenTool
            size={18}
            className="text-indigo-400 group-hover:text-indigo-300"
          />
          <span className="text-[9px] font-bold uppercase tracking-widest [writing-mode:vertical-rl] text-slate-400 group-hover:text-white">
            {showCustomizer ? "Close" : "Edit"}
          </span>
        </div>
      </button>
      {/* --- DYNAMIC NAVBAR RENDERER --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 transform
        ${
          customBrand.navbarStyle === "dark"
            ? "bg-slate-900 text-white border-b border-slate-800"
            : customBrand.navbarStyle === "transparent"
              ? "bg-transparent text-white pt-4"
              : customBrand.navbarStyle === "floating"
                ? "top-6 w-[90%] left-1/2 -translate-x-1/2 max-w-7xl rounded-full shadow-2xl bg-white/90 backdrop-blur-md border border-slate-200/50"
                : customBrand.navbarStyle === "glass"
                  ? "bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm"
                  : customBrand.navbarStyle === "gradient"
                    ? `bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg`
                    : customBrand.navbarStyle === "borderless"
                      ? "bg-white"
                      : "bg-white shadow-md border-b " + theme.lightBorder
        }`}
      >
        {/* Top Info Bar */}
        {(customBrand.navbarStyle === "standard" ||
          customBrand.navbarStyle === "dark") && (
          <div
            className={`${customBrand.navbarStyle === "dark" ? "bg-slate-950 text-slate-400" : "bg-slate-900 text-white"} text-xs py-2 px-4 hidden md:flex justify-between items-center transition-colors`}
          >
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Phone size={14} className={theme.text} /> {customBrand.phone}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} className={theme.text} />{" "}
                {customBrand.address}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Monitor size={14} className={theme.text} /> {customBrand.email}
              </span>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center ${customBrand.navbarStyle === "stack" ? "flex-col h-auto py-4 gap-4" : "h-20"}`}
          >
            {/* Logo Area */}
            <div
              className={`flex-shrink-0 flex items-center gap-3 cursor-pointer group z-20 ${customBrand.navbarStyle === "centered" ? "absolute left-1/2 -translate-x-1/2" : ""}`}
            >
              <div
                className={`flex flex-col ${customBrand.navbarStyle === "centered" || customBrand.navbarStyle === "stack" ? "items-center text-center" : ""}`}
              >
                <span
                  className={`text-2xl font-black tracking-tight leading-none transition-colors
                    ${["dark", "transparent", "gradient"].includes(customBrand.navbarStyle) ? "text-white" : "text-slate-900"}
                    group-hover:${customBrand.navbarStyle === "gradient" ? "text-white/80" : theme.text}`}
                >
                  {customBrand.logoText}
                  <span
                    className={
                      ["dark", "transparent", "gradient"].includes(
                        customBrand.navbarStyle,
                      )
                        ? "text-white/80"
                        : theme.text
                    }
                  >
                    {customBrand.logoSpan}
                  </span>
                </span>
                {customBrand.navbarStyle !== "minimal" &&
                  customBrand.navbarStyle !== "floating" && (
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${["dark", "transparent", "gradient"].includes(customBrand.navbarStyle) ? "text-slate-300" : "text-slate-500"}`}
                    >
                      {customBrand.tagline}
                    </span>
                  )}
              </div>
            </div>

            {/* Desktop Menu */}
            <div
              className={`hidden lg:flex items-center space-x-6 ${customBrand.navbarStyle === "centered" ? "order-1" : ""} ${customBrand.navbarStyle === "stack" ? "w-full justify-center border-t border-slate-100 pt-4" : ""}`}
            >
              {[
                "Home",
                "Services",
                "About",
                "Reviews",
                "Trainers",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className={`text-sm font-bold uppercase tracking-tight transition-colors hover:scale-105 transform
                     ${
                       ["dark", "transparent", "gradient"].includes(
                         customBrand.navbarStyle,
                       )
                         ? "text-slate-200 hover:text-white"
                         : `text-slate-700 hover:${theme.text}`
                     }
                  `}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`hidden md:flex items-center ${customBrand.navbarStyle === "centered" ? "order-3" : ""}`}
            >
              <button
                className={`${theme.bg} text-white px-5 py-2 rounded shadow-lg ${theme.shadow} hover:opacity-90 hover:-translate-y-0.5 transition-all transform flex items-center gap-2 uppercase text-xs font-bold tracking-wider`}
              >
                Book Now
              </button>
            </div>

            {/* Mobile Dropdown */}
            <div
              className={`lg:hidden ${customBrand.navbarStyle === "centered" ? "absolute left-4" : ""}`}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${["dark", "transparent", "gradient"].includes(customBrand.navbarStyle) ? "text-white" : "text-slate-900"} p-2 hover:bg-white/10 rounded transition`}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t absolute w-full shadow-xl z-50">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {[
                "Home",
                "About Us",
                "Services",
                "Study Material",
                "Blog",
                "Study Abroad",
                "Contact Us",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`block px-4 py-3 text-base font-bold text-slate-800 hover:${theme.lightBg} hover:${theme.text} rounded transition-colors uppercase`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <div
        className={`relative overflow-hidden w-full 
        ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) ? "min-h-screen flex items-center" : "pt-36 pb-20 lg:pt-48 lg:pb-28"}
        ${customBrand.navbarStyle === "transparent" ? "bg-slate-900" : "bg-gradient-to-b from-white via-slate-50/50 to-white"}
        `}
      >
        {/* Pattern / Backgrounds — Premium Mesh Gradient */}
        {!["fullscreen", "video", "carousel"].includes(
          customBrand.heroStyle,
        ) && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/30 via-transparent to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-rose-100/20 via-transparent to-transparent rounded-full blur-3xl"></div>
          </>
        )}

        {/* --- FULLSCREEN IMAGE HERO --- */}
        {customBrand.heroStyle === "fullscreen" && (
          <div className="absolute inset-0 z-0">
            <div
              className={`absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-10`}
            ></div>
            <img
              src={customBrand.heroImage}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* --- VIDEO BACKGROUND HERO --- */}
        {customBrand.heroStyle === "video" && (
          <div className="absolute inset-0 z-0 bg-slate-900">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            {/* Simulated Video with Image for now */}
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        )}

        {/* --- CAROUSEL HERO --- */}
        {customBrand.heroStyle === "carousel" && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/20 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=80"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2">
              <div className="w-12 h-1 bg-white rounded-full"></div>
              <div className="w-3 h-1 bg-white/50 rounded-full"></div>
              <div className="w-3 h-1 bg-white/50 rounded-full"></div>
            </div>
          </div>
        )}

        <div
          className={`mx-auto max-w-7xl px-6 lg:px-8 relative z-10 ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) ? "text-white" : ""}`}
        >
          {/* --- CENTERED STYLE --- */}
          {customBrand.heroStyle === "centered" && (
            <div className="text-center max-w-4xl mx-auto">
              <div
                className={`inline-flex items-center gap-2 py-2 px-5 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-8 border ${theme.lightBorder}`}
              >
                <Zap size={14} />
                {customBrand.tagline}
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
                {customBrand.heroTitle} <br />
                <span className={`${theme.text} relative`}>
                  {customBrand.heroSpan}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 opacity-20"
                    viewBox="0 0 200 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 7 Q50 0 100 4 Q150 8 200 1"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
                {customBrand.heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button
                  className={`${theme.bg} text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all shadow-xl ${theme.shadow}`}
                >
                  Get Started
                </button>
                <button
                  className={`bg-white text-slate-800 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all`}
                >
                  Learn More
                </button>
              </div>
              <div className="relative">
                <div
                  className={`absolute -inset-4 ${theme.bg} rounded-3xl opacity-10 blur-2xl`}
                ></div>
                <img
                  src={customBrand.heroImage}
                  alt="Hero Visual"
                  className="relative w-full rounded-2xl shadow-2xl border border-slate-200/60 max-h-[520px] object-cover"
                />
              </div>
            </div>
          )}

          {/* --- FULLSCREEN / VIDEO / CAROUSEL CONTENT --- */}
          {["fullscreen", "video", "carousel"].includes(
            customBrand.heroStyle,
          ) && (
            <div className="max-w-3xl relative">
              <div
                className={`inline-flex items-center gap-2 py-2 px-4 border border-white/20 rounded-full backdrop-blur-md text-white/90 text-xs font-bold uppercase tracking-wider mb-8 bg-white/5`}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                {customBrand.tagline}
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05] drop-shadow-lg">
                {customBrand.heroTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                  {customBrand.heroSpan}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200/90 mb-12 leading-relaxed font-medium max-w-2xl drop-shadow-md">
                {customBrand.heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`${theme.bg} border-2 border-transparent text-white px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all shadow-xl`}
                >
                  Start Now
                </button>
                <button
                  className={`border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-all`}
                >
                  Watch Video
                </button>
              </div>
              {/* Scroll indicator */}
              <div className="absolute -bottom-20 left-0 flex flex-col items-center gap-2 text-white/40">
                <span className="text-[10px] uppercase tracking-widest">
                  Scroll
                </span>
                <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1">
                  <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}

          {/* --- GRID STYLE --- */}
          {customBrand.heroStyle === "grid" && (
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
                >
                  {customBrand.tagline}
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  {customBrand.heroTitle} <br />
                  <span className={theme.text}>{customBrand.heroSpan}</span>
                </h1>
                <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-md">
                  {customBrand.heroDesc}
                </p>
                <div className="flex gap-4">
                  <button
                    className={`${theme.bg} text-white px-8 py-4 rounded-xl shadow-lg font-bold text-sm uppercase tracking-wider hover:scale-105 transition-all`}
                  >
                    Explore More
                  </button>
                  <button
                    className={`bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-sm border-2 border-slate-200 hover:border-slate-300 transition-all`}
                  >
                    View Plans
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {(
                  customBrand.gridImages || [
                    customBrand.heroImage,
                    customBrand.heroImage,
                    customBrand.heroImage,
                    customBrand.heroImage,
                  ]
                ).map((img, i) => (
                  <div
                    key={i}
                    className={`relative group overflow-hidden rounded-2xl shadow-lg ${i === 0 || i === 3 ? "mt-8" : ""} ${i === 3 ? "mt-[-1rem]" : ""}`}
                  >
                    <img
                      src={
                        img ||
                        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
                      }
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- FORM LEFT STYLE --- */}
          {customBrand.heroStyle === "form_left" && (
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-2xl border border-slate-100/80 z-20 relative">
                <div
                  className={`absolute top-0 left-0 w-full h-1.5 ${theme.bg} rounded-t-2xl`}
                ></div>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.lightBg} ${theme.text} text-[10px] font-bold uppercase tracking-widest mb-4`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                  Limited Spots
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Get Started Today
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  Fill in your details for a free consultation
                </p>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-indigo-300 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-indigo-300 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-indigo-300 transition-colors"
                  />
                  <button
                    className={`w-full ${theme.bg} text-white p-4 rounded-xl font-bold uppercase text-sm tracking-wider hover:scale-[1.02] transition-all shadow-lg ${theme.shadow}`}
                  >
                    Join Now — It's Free
                  </button>
                </form>
                <p className="text-center text-slate-400 text-[11px] mt-3">
                  🔒 Your data is safe with us
                </p>
              </div>
              <div className="lg:col-span-7 text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1]">
                  {customBrand.heroTitle}{" "}
                  <span className={theme.text}>{customBrand.heroSpan}</span>
                </h1>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-lg">
                  {customBrand.heroDesc}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      icon: Zap,
                      label: "Fast Results",
                      desc: "See progress in weeks",
                    },
                    {
                      icon: Target,
                      label: "Precise",
                      desc: "Targeted approach",
                    },
                    {
                      icon: Users,
                      label: "Expert Led",
                      desc: "Top-tier faculty",
                    },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div
                      key={label}
                      className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                    >
                      <Icon className={`${theme.text} mb-2`} size={22} />
                      <span className="font-bold text-slate-800 text-sm block">
                        {label}
                      </span>
                      <span className="text-slate-400 text-xs">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- DIAGONAL STYLE --- */}
          {customBrand.heroStyle === "diagonal" && (
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
              <div className="z-20">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
                >
                  <TrendingUp size={14} />
                  Trending Now
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 leading-[1.05]">
                  {customBrand.heroTitle}
                </h1>
                <h2
                  className={`text-4xl md:text-6xl font-black ${theme.text} mb-8`}
                >
                  {customBrand.heroSpan}
                </h2>
                <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed">
                  {customBrand.heroDesc}
                </p>
                <div className="flex gap-4">
                  <button
                    className={`${theme.bg} text-white px-10 py-4 rounded-none skew-x-[-8deg] font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-all ${theme.shadow}`}
                  >
                    <span className="skew-x-[8deg] inline-block">
                      Start Journey
                    </span>
                  </button>
                  <button
                    className={`bg-white text-slate-800 px-8 py-4 rounded-none skew-x-[-8deg] font-bold text-sm uppercase border-2 border-slate-200 hover:border-slate-300 transition-all`}
                  >
                    <span className="skew-x-[8deg] inline-block">
                      Learn More
                    </span>
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100 lg:block hidden skew-x-[-8deg] origin-top translate-x-24 overflow-hidden shadow-2xl">
                <img
                  src={customBrand.heroImage}
                  className="w-full h-full object-cover skew-x-[8deg] scale-[1.2] translate-x-[-80px]"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10 skew-x-[8deg]"></div>
              </div>
            </div>
          )}

          {/* --- MONITOR / DIGITAL STYLE --- */}
          {customBrand.heroStyle === "monitor" && (
            <div className="text-center">
              <div
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-8 border ${theme.lightBorder}`}
              >
                <Monitor size={14} />
                {customBrand.tagline}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                {customBrand.heroTitle}{" "}
                <span className={theme.text}>{customBrand.heroSpan}</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed">
                {customBrand.heroDesc}
              </p>

              {/* Monitor frame — more polished */}
              <div className="relative mx-auto max-w-lg md:max-w-2xl">
                <div className="absolute -inset-8 bg-gradient-to-b from-indigo-100/40 to-transparent rounded-3xl blur-2xl"></div>
                <div className="relative bg-slate-800 rounded-t-2xl p-1.5 border-2 border-slate-700 shadow-2xl">
                  {/* Browser dots */}
                  <div className="flex items-center gap-1.5 px-3 py-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    <div className="flex-1 mx-3 h-6 bg-slate-700 rounded-md flex items-center px-3">
                      <span className="text-[10px] text-slate-400 truncate">
                        {customBrand.tagline || "yourwebsite.com"}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-b-lg overflow-hidden">
                    <img
                      src={customBrand.heroImage}
                      className="w-full h-[200px] md:h-[340px] object-cover"
                      alt="Website preview"
                    />
                  </div>
                </div>
                <div className="relative mx-auto bg-slate-700 rounded-b-2xl h-5 max-w-[70%] border-2 border-t-0 border-slate-600">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-16 h-2 bg-slate-600"></div>
                </div>
                {/* Stand */}
                <div className="mx-auto w-20 h-6 bg-gradient-to-b from-slate-600 to-slate-500 rounded-b-lg"></div>
              </div>
            </div>
          )}

          {/* --- SPLIT / DEFAULT STYLE --- */}
          {(customBrand.heroStyle === "split" || !customBrand.heroStyle) && (
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Hero Content */}
              <div className="lg:col-span-5 text-center lg:text-left pt-10 lg:pt-0">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
                >
                  <Star size={14} />
                  {customBrand.tagline}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  {customBrand.heroTitle} <br />
                  <span className={theme.text}>{customBrand.heroSpan}</span>
                </h1>

                <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                  {customBrand.heroDesc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                  <button
                    className={`${theme.bg} text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all shadow-xl ${theme.shadow}`}
                  >
                    Talk to an Expert
                  </button>
                  <button
                    className={`bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:border-slate-300 hover:shadow-lg transition-all`}
                  >
                    Get Guidance
                  </button>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "18+ Years Exp.", icon: CheckCircle },
                    { label: "Computer/Paper", icon: CheckCircle },
                    { label: "45,000+ Students", icon: CheckCircle },
                    { label: "1-on-1 Sessions", icon: CheckCircle },
                  ].map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-slate-600 font-semibold"
                    >
                      <Icon size={16} className={theme.text} /> {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Form / Visual */}
              <div className="lg:col-span-7 flex flex-col md:flex-row items-center justify-center lg:justify-end relative mt-12 lg:mt-0 h-full min-h-[500px]">
                {/* Person/Background Image for Split */}
                <div className="absolute left-0 top-0 w-[88%] h-full hidden md:block rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={
                      customBrand.heroImage ||
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    }
                    alt="Hero Visual"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
                </div>

                {/* Form Container - Overlapping */}
                <div
                  className={`relative bg-white/95 backdrop-blur-sm p-7 rounded-2xl shadow-2xl border ${theme.lightBorder} z-20 w-full max-w-md md:translate-x-10 md:translate-y-6`}
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-1.5 ${theme.bg} rounded-t-2xl`}
                  ></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Speak to Our Expert
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Get a free consultation for your study abroad journey.
                  </p>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-300 transition-colors text-sm`}
                        placeholder="Your Full Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-300 transition-colors text-sm`}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Service Interest
                      </label>
                      <select
                        className={`w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-300 transition-colors text-slate-600 text-sm`}
                      >
                        <option>IELTS Coaching</option>
                        <option>Study Abroad</option>
                        <option>PTE / TOEFL</option>
                      </select>
                    </div>
                    <button
                      className={`w-full ${theme.bg} text-white font-bold py-4 rounded-xl uppercase tracking-wider hover:scale-[1.02] transition-all shadow-lg ${theme.shadow}`}
                    >
                      Get Instant Call Back
                    </button>
                  </form>
                  <p className="text-center text-slate-400 text-[11px] mt-3">
                    🔒 Your data is safe with us
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* --- CLASSIC STYLE --- */}
          {customBrand.heroStyle === "classic" && (
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div
                  className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
                >
                  <Star size={14} /> Top Rated
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  {customBrand.heroTitle} <br />
                  <span className={theme.text}>{customBrand.heroSpan}</span>
                </h1>
                <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium max-w-md">
                  {customBrand.heroDesc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className={`${theme.bg} text-white px-10 py-4 rounded-xl shadow-lg font-bold text-sm uppercase tracking-wider hover:scale-105 hover:shadow-2xl transition-all ${theme.shadow}`}
                  >
                    Get Started
                  </button>
                  <button className="flex items-center gap-3 text-slate-700 font-bold hover:opacity-80 transition-opacity">
                    <div
                      className={`w-12 h-12 rounded-full ${theme.lightBg} flex items-center justify-center shadow-sm border ${theme.lightBorder}`}
                    >
                      <Video size={18} className={theme.text} />
                    </div>
                    Watch Demo
                  </button>
                </div>
              </div>
              <div className="relative">
                <div
                  className={`absolute -inset-6 ${theme.bg} rounded-3xl opacity-10 blur-3xl`}
                ></div>
                <img
                  src={customBrand.heroImage}
                  className="relative rounded-2xl shadow-2xl border border-slate-200/60 w-full h-[450px] object-cover"
                  alt="Classic Hero"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white"></div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-white"></div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white"></div>
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-800">
                      <span className={theme.text}>1,200+</span>
                    </span>
                    <span className="block text-xs text-slate-400">
                      Students Enrolled
                    </span>
                  </div>
                </div>
                {/* Rating badge */}
                <div className="absolute -top-3 -right-3 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">4.9</span>
                </div>
              </div>
            </div>
          )}

          {/* --- SPLIT / DEFAULT STYLE DUPLICATE HIDDEN --- */}
          {false && (
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Hero Content */}
              <div className="lg:col-span-5 text-center lg:text-left pt-10 lg:pt-0">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                  {customBrand.heroTitle} <br />
                  <span className={theme.text}>{customBrand.heroSpan}</span>
                </h1>

                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                  {customBrand.heroDesc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                  <button
                    className={`${theme.bg} text-white px-6 py-3 rounded font-bold text-sm uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all shadow-xl ${theme.shadow}`}
                  >
                    Talk to an Expert
                  </button>
                  <button
                    className={`bg-white text-slate-900 border-2 border-slate-200 px-6 py-3 rounded font-bold text-sm uppercase tracking-widest hover:${theme.border} hover:${theme.text} transition-all`}
                  >
                    Get Guidance
                  </button>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-4 text-sm font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className={theme.text} /> 18+ Years
                    Exp.
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className={theme.text} />{" "}
                    Computer/Paper
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className={theme.text} /> 45,000+
                    Students
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className={theme.text} /> 1-on-1
                    Sessions
                  </div>
                </div>
              </div>

              {/* Hero Form / Visual */}
              <div className="lg:col-span-7 flex flex-col md:flex-row items-end justify-center lg:justify-end relative mt-12 lg:mt-0">
                {/* Person Image */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                  alt="IELTS Expert"
                  className="hidden md:block w-48 lg:w-64 h-auto object-cover rounded-xl shadow-lg border-4 border-white transform translate-x-4 z-0 mb-8"
                />

                {/* Form Container */}
                <div
                  className={`relative bg-white p-6 rounded-2xl shadow-2xl border ${theme.lightBorder} z-10 w-full max-w-md`}
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-2 ${theme.bg} rounded-t-2xl`}
                  ></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Speak to Our Expert
                  </h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Get a free consultation for your study abroad journey.
                  </p>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:${theme.border} transition-colors`}
                        placeholder="Your Full Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:${theme.border} transition-colors`}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Service Interest
                      </label>
                      <select
                        className={`w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:${theme.border} transition-colors text-slate-600`}
                      >
                        <option>IELTS Coaching</option>
                        <option>Study Abroad</option>
                        <option>PTE / TOEFL</option>
                      </select>
                    </div>
                    <button
                      className={`w-full ${theme.bg} text-white font-bold py-3 rounded uppercase tracking-wider hover:bg-slate-900 transition-colors`}
                    >
                      Get Instant Call Back
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* --- CLASSIC STYLE DUPLICATE HIDDEN --- */}
          {false && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span
                  className={`inline-block py-1 px-3 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-wider mb-4`}
                >
                  Best Institute in Delhi
                </span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                  {customBrand.heroTitle} <br />
                  <span className={theme.text}>{customBrand.heroSpan}</span>
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                  {customBrand.heroDesc}
                </p>
                <div className="flex gap-4">
                  <button
                    className={`${theme.bg} text-white px-8 py-3 rounded shadow-lg font-bold hover:opacity-90`}
                  >
                    Get Started
                  </button>
                  <button className="flex items-center gap-2 text-slate-900 font-bold hover:opacity-75">
                    <div
                      className={`w-10 h-10 rounded-full ${theme.lightBg} flex items-center justify-center`}
                    >
                      <Video size={18} className={theme.text} />
                    </div>
                    Watch Demo
                  </button>
                </div>
              </div>
              <div className="relative">
                <div
                  className={`absolute -inset-4 ${theme.bg} rounded-full opacity-20 blur-2xl`}
                ></div>
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  className="relative rounded-2xl shadow-xl border-4 border-white"
                  alt="Classic Hero"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
                  </div>
                  <div className="text-xs font-bold">
                    <span className={theme.text}>1k+</span> Enrollment
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- MARQUEE SECTION --- */}
      {customBrand.marqueeItems && (
        <div className="bg-slate-900 border-y border-slate-800 overflow-hidden py-3 relative z-30">
          <div className="flex w-full whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-16 mx-8 items-center">
                {customBrand.marqueeItems.map((item, idx) => (
                  <div
                    key={`${i}-${idx}`}
                    className="flex items-center gap-3 text-slate-300 font-bold uppercase tracking-[0.2em] text-xs"
                  >
                    <Star
                      size={14}
                      className={`${theme.text} drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}
                    />
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- EXPERIENCE BANNER --- */}
      <div className={`${theme.lightBg} py-12 border-b ${theme.lightBorder}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Why Choose {customBrand.logoText} {customBrand.logoSpan}?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customBrand.stats &&
              customBrand.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group hover:-translate-y-1 transition-transform cursor-default"
                >
                  <div
                    className={`mb-4 ${theme.text} p-4 bg-white shadow-sm border ${theme.lightBorder} rounded-full group-hover:${theme.bg} group-hover:text-white transition-colors`}
                  >
                    <Star size={32} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900">
                      {stat.value}
                    </span>
                    <span className="text-slate-500 font-bold text-sm uppercase">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <div className="bg-white py-24" id="about">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center max-w-3xl">
          <h2
            className={`${theme.text} font-bold tracking-widest uppercase text-sm mb-3`}
          >
            Who We Are
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 mb-8">
            {customBrand.heroTitle}
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6 text-lg">
            {customBrand.heroDesc}
          </p>
          <p className="text-slate-600 leading-relaxed mb-12">
            We are dedicated to providing the best service to our clients. Our
            team of experts works tirelessly to ensure your success. Whether you
            are looking for {customBrand.tagline} or specific solutions, we are
            here to help.
          </p>
        </div>
      </div>

      {/* --- COURSES / MODULES --- */}
      <div className={`py-24 ${theme.lightBg}`} id="services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`${theme.text} font-bold tracking-widest uppercase text-sm mb-3`}
            >
              Our Services
            </h2>
            <h3 className="text-3xl font-bold text-slate-900">What We Offer</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customBrand.courses &&
              customBrand.courses.map((cat, idx) => (
                <div
                  key={idx}
                  className={`bg-white border border-slate-100 p-8 hover:shadow-xl hover:${theme.lightBorder} transition-all duration-300 group text-center rounded-xl`}
                >
                  <div
                    className={`w-16 h-16 mx-auto ${theme.lightBg} ${theme.text} rounded-full flex items-center justify-center mb-6 group-hover:${theme.bg} group-hover:text-white transition-colors`}
                  >
                    {cat.icon && <cat.icon size={28} />}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {cat.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                  <a
                    href="#"
                    className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:underline`}
                  >
                    Learn More <ArrowRight size={16} />
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* --- TESTIMONIALS SECTION --- */}
      <div className={`${theme.lightBg} py-24`} id="reviews">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`${theme.text} font-bold tracking-widest uppercase text-sm mb-3`}
            >
              Student Success Stories
            </h2>
            <h3 className="text-3xl font-bold text-slate-900">
              What Our Students Say
            </h3>
            <div className="flex justify-center items-center gap-2 mt-4">
              <div className="flex text-yellow-500">
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
              </div>
              <span className="font-bold text-slate-700">
                4.9/5 Average Rating
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Simran Kaur</h4>
                  <p className="text-slate-500 text-xs">a month ago</p>
                </div>
                <div className="ml-auto text-yellow-500">
                  <Star fill="currentColor" size={16} />
                </div>
              </div>
              <div className="flex text-yellow-500 mb-4 text-xs">
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                "I am currently pursuing my studies at {customBrand.logoText}{" "}
                {customBrand.logoSpan}, and I am extremely grateful to be part
                of such a prestigious institution. The faculty members are
                highly knowledgeable, supportive, and genuinely committed to
                students’ growth."
              </p>

              {/* Owner Response */}
              <div
                className={`bg-slate-50 p-4 rounded-lg border-l-4 ${theme.border} mt-auto`}
              >
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Response from the owner
                </p>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "We sincerely thank you for sharing such encouraging feedback
                  with us. Your kind words mean a lot and reassure us that our
                  efforts are making a meaningful difference."
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                  K
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Kamal Kumar</h4>
                  <p className="text-slate-500 text-xs">3 months ago</p>
                </div>
                <div className="ml-auto text-yellow-500">
                  <Star fill="currentColor" size={16} />
                </div>
              </div>
              <div className="flex text-yellow-500 mb-4 text-xs">
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                "I had an amazing experience with the course here. The classes
                were super engaging and easy to follow. My trainer was really
                supportive and made learning fun — we did lots of speaking
                activities, role plays, and discussions."
              </p>

              {/* Owner Response */}
              <div
                className={`bg-slate-50 p-4 rounded-lg border-l-4 ${theme.border} mt-auto`}
              >
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Response from the owner
                </p>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Thank you Kamal for such a heartfelt review! We’re delighted
                  that our teaching methods and personalized approach helped you
                  gain confidence."
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xl">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Shweta Singh</h4>
                  <p className="text-slate-500 text-xs">a month ago</p>
                </div>
                <div className="ml-auto text-yellow-500">
                  <Star fill="currentColor" size={16} />
                </div>
              </div>
              <div className="flex text-yellow-500 mb-4 text-xs">
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                "I had joined the academy one week ago. I realised it is a very
                good platform to learn. When I come here to attend classes I get
                lots of confidence. Before coming here I have hesitation to
                speak."
              </p>

              {/* Owner Response */}
              <div
                className={`bg-slate-50 p-4 rounded-lg border-l-4 ${theme.border} mt-auto`}
              >
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Response from the owner
                </p>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Thank you very much for taking the time to share your
                  positive feedback. We truly appreciate your kind words and
                  encouragement."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- TRAINERS --- */}
      <div className="py-24 bg-slate-900 text-white" id="trainers">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`${theme.text} font-bold tracking-widest uppercase text-sm mb-3`}
            >
              Our Team
            </h2>
            <h3 className="text-3xl font-bold text-white">Meet The Experts</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded border border-slate-700 hover:border-slate-500 transition-all">
              <h4 className="font-bold text-xl mb-1">Senior Consultant</h4>
              <p
                className={`${theme.text} text-xs font-bold uppercase tracking-widest mb-4`}
              >
                Head of Strategy
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                With over 15 years of industry experience, leading the team to
                deliver exceptional results and strategic growth for our
                clients.
              </p>
            </div>
            <div className="bg-slate-800 p-8 rounded border border-slate-700 hover:border-slate-500 transition-all">
              <h4 className="font-bold text-xl mb-1">Lead Specialist</h4>
              <p
                className={`${theme.text} text-xs font-bold uppercase tracking-widest mb-4`}
              >
                Operations Manager
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Expert in operational efficiency and process optimization.
                Ensuring smooth delivery of services and client satisfaction.
              </p>
            </div>
            <div className="bg-slate-800 p-8 rounded border border-slate-700 hover:border-slate-500 transition-all">
              <h4 className="font-bold text-xl mb-1">Director</h4>
              <p
                className={`${theme.text} text-xs font-bold uppercase tracking-widest mb-4`}
              >
                Leadership
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Visionary leadership driving the company forward. Committed to
                excellence and innovation in every aspect of our business.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Common Queries
          </h2>
          <div className="space-y-4">
            {customBrand.faqs &&
              customBrand.faqs.map((faq, index) => (
                <div key={index} className="bg-white border-b border-slate-200">
                  <button
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                    className={`w-full flex justify-between items-center py-6 text-left hover:${theme.text} transition-colors`}
                  >
                    <span className="font-bold text-slate-800 text-lg">
                      {faq.q}
                    </span>
                    {activeFaq === index ? (
                      <div className={theme.text}>
                        <span className="text-2xl">-</span>
                      </div>
                    ) : (
                      <div className="text-slate-400">
                        <span className="text-2xl">+</span>
                      </div>
                    )}
                  </button>
                  <div
                    className={`text-slate-600 leading-relaxed overflow-hidden transition-all duration-300 ${activeFaq === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {faq.a}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer
        className={`${theme.lightBg} text-slate-600 pt-20 pb-10 border-t ${theme.lightBorder}`}
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div
                  className={`h-8 w-8 ${theme.bg} rounded flex items-center justify-center font-bold text-white`}
                >
                  {customBrand.logoText?.[0]}
                </div>
                <span className="font-bold text-slate-900 text-lg">
                  {customBrand.logoText} {customBrand.logoSpan}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Empowering growth and success through dedicated service and
                expert guidance.
              </p>
            </div>

            <div>
              <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm">
                {["About Us", "Services", "Blog", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`hover:${theme.text} transition-colors`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2">
              <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">
                Contact & Address
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-4">
                  <div className="mt-1">
                    <MapPin className={`w-5 h-5 ${theme.text}`} />
                  </div>
                  <span className="text-slate-600 leading-relaxed">
                    <strong>Main Office:</strong>
                    <br />
                    {customBrand.address}
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="mt-1">
                    <Phone className={`w-5 h-5 ${theme.text}`} />
                  </div>
                  <span className="text-slate-900 font-bold text-lg">
                    {customBrand.phone}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} {customBrand.logoText}{" "}
              {customBrand.logoSpan}. All Rights Reserved
            </p>
            <p className="mt-2 md:mt-0">Premium Services & Consulting</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

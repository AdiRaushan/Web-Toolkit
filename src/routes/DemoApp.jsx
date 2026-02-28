import React, { useState, useCallback, useRef } from "react";
import BusinessOnboardingForm from "../components/demo/BusinessOnboardingForm";
import { HexColorPicker } from "react-colorful";
// react-router-dom removed — not needed in Next.js
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
  Eye,
  Heart,
  ChevronDown,
  Download,
  ImagePlus,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { fetchWebsiteData } from "../services/scrapeService";
import { improveHeroCopy } from "../services/improveCopyService";
import { fetchCategoryImages } from "../services/imageServices";
import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";

/**
 * DemoApp — Demo Creator Template App
 * Moved from original App.jsx. All existing logic preserved.
 * NEW: URL auto-fill + Improve Copy features added on top.
 * UNIVERSAL SECTIONS: About Us, Our Mission, Why Choose Us (locked), Contact
 */

/* ───────────────────────────────────────────────────────────
   WHY CHOOSE US — Auto-loaded bullet points per category
   These are LOCKED and NOT editable by the user.
   ─────────────────────────────────────────────────────────── */
const WHY_CHOOSE_US_DATA = {
  ielts: [
    {
      title: "High Success Rate",
      desc: "Our students consistently achieve Band 7+ scores, with a 98% first-attempt success rate.",
    },
    {
      title: "Expert Trainers",
      desc: "Learn from certified IELTS trainers with years of experience and international credentials.",
    },
    {
      title: "Proven Methodology",
      desc: "A structured, exam-focused curriculum refined over 18+ years of delivering results.",
    },
    {
      title: "Flexible Timings",
      desc: "Morning, evening, and weekend batches designed to fit every student's schedule.",
    },
  ],
  institute: [
    {
      title: "High Success Rate",
      desc: "Our students consistently achieve their goals with a proven track record of academic success.",
    },
    {
      title: "Expert Trainers",
      desc: "Internationally certified faculty with years of real-world teaching experience.",
    },
    {
      title: "Proven Methodology",
      desc: "A structured, skill-focused curriculum built on modern learning techniques.",
    },
    {
      title: "Flexible Timings",
      desc: "Multiple batch options to suit working professionals and students alike.",
    },
  ],
  coaching: [
    {
      title: "High Success Rate",
      desc: "2000+ selections and 50+ top rankers across India's toughest competitive exams.",
    },
    {
      title: "Expert Trainers",
      desc: "National-level faculty with track records in UPSC, SSC, and banking exams.",
    },
    {
      title: "Proven Methodology",
      desc: "Meticulously crafted study material, regular test series, and detailed performance analysis.",
    },
    {
      title: "Flexible Timings",
      desc: "Weekday and weekend batches plus doubt-clearing sessions at your convenience.",
    },
  ],
  consultant: [
    {
      title: "Industry Experience",
      desc: "Trusted by Fortune 500 companies with a global presence in 12+ countries.",
    },
    {
      title: "Strategic Approach",
      desc: "Every recommendation is backed by data analytics and measurable KPIs.",
    },
    {
      title: "Client Focused",
      desc: "Dedicated account managers ensuring seamless communication at every stage.",
    },
    {
      title: "Result Driven",
      desc: "Our clients consistently achieve 3x growth compared to industry benchmarks.",
    },
  ],
  realestate: [
    {
      title: "Verified Properties",
      desc: "Every listing is personally inspected, legally verified, and quality assured.",
    },
    {
      title: "Transparent Deals",
      desc: "No hidden charges or surprises — clear documentation and honest pricing.",
    },
    {
      title: "Local Market Experts",
      desc: "25+ years of deep knowledge across prime locations and emerging neighborhoods.",
    },
    {
      title: "Strong Network",
      desc: "Partnerships with leading banks, developers, and legal advisors for a seamless experience.",
    },
  ],
  clinic: [
    {
      title: "Experienced Doctors",
      desc: "40+ specialist doctors covering all major medical disciplines with decades of expertise.",
    },
    {
      title: "Advanced Equipment",
      desc: "State-of-the-art diagnostic and treatment technology for accurate, effective care.",
    },
    {
      title: "Personalized Care",
      desc: "Empathetic, patient-first treatment plans tailored to your individual health needs.",
    },
    {
      title: "Trusted by Patients",
      desc: "Thousands of satisfied patients and families who rely on us for their healthcare.",
    },
  ],
  gym: [
    {
      title: "Certified Trainers",
      desc: "25+ nationally certified coaches with specializations across all fitness disciplines.",
    },
    {
      title: "Modern Equipment",
      desc: "Premium machines and free weights from leading international fitness brands.",
    },
    {
      title: "Personalized Programs",
      desc: "Custom workout and nutrition plans designed around your specific goals.",
    },
    {
      title: "Clean Environment",
      desc: "Spotless, well-maintained facilities with premium amenities including sauna and steam.",
    },
  ],
  marketing: [
    {
      title: "Creative Strategy",
      desc: "Award-winning campaigns crafted by a dedicated team of strategists and designers.",
    },
    {
      title: "Data-Driven Results",
      desc: "Every campaign is optimized using real-time analytics, delivering 450% average ROI.",
    },
    {
      title: "Experienced Team",
      desc: "Google & Meta Premium Partners managing $10M+ in ad spend with proven expertise.",
    },
    {
      title: "On-Time Delivery",
      desc: "Transparent weekly reporting and on-schedule project milestones, every single time.",
    },
  ],
  custom: [
    {
      title: "Industry Experience",
      desc: "Years of experience delivering exceptional results in your sector.",
    },
    {
      title: "Strategic Approach",
      desc: "Every solution is tailored to your specific needs and business goals.",
    },
    {
      title: "Client Focused",
      desc: "A dedicated team ensuring seamless communication and project delivery.",
    },
    {
      title: "Result Driven",
      desc: "A proven portfolio of successful projects and satisfied clients.",
    },
  ],
};

// Helper to get Why Choose Us data for a brand
const getWhyChooseUs = (brandId) => {
  return WHY_CHOOSE_US_DATA[brandId] || WHY_CHOOSE_US_DATA.custom;
};

/* ───────────────────────────────────────────────────────────
   NICHE SECTION CONFIG — Maps category to section type
   When category changes, the niche section swaps dynamically.
   ─────────────────────────────────────────────────────────── */
const NICHE_SECTION_CONFIG = {
  ielts: {
    type: "courses",
    sectionName: "Courses",
    icon: GraduationCap,
    subtitle:
      "Structured programs designed to maximize your band score with expert-led modules.",
  },
  institute: {
    type: "courses",
    sectionName: "Courses",
    icon: GraduationCap,
    subtitle:
      "Comprehensive training programs to build your skills and confidence.",
  },
  coaching: {
    type: "courses",
    sectionName: "Courses",
    icon: GraduationCap,
    subtitle:
      "Rigorous preparation programs designed by top educators for exam success.",
  },
  consultant: {
    type: "services",
    sectionName: "Services",
    icon: BookOpen,
    subtitle:
      "End-to-end professional services to transform your business operations.",
  },
  realestate: {
    type: "properties",
    sectionName: "Property Listings",
    icon: MapPin,
    subtitle:
      "Discover your dream property from our curated collection of premium listings.",
  },
  clinic: {
    type: "treatments",
    sectionName: "Treatments",
    icon: Activity,
    subtitle:
      "Advanced medical treatments delivered by specialist doctors with cutting-edge technology.",
  },
  gym: {
    type: "membership",
    sectionName: "Membership Plans",
    icon: Zap,
    subtitle:
      "Flexible plans designed for every fitness level — from beginners to athletes.",
  },
  marketing: {
    type: "projects",
    sectionName: "Projects",
    icon: PenTool,
    subtitle:
      "A showcase of campaigns and projects that delivered real, measurable results.",
  },
};

const getNicheConfig = (brandId) => {
  return (
    NICHE_SECTION_CONFIG[brandId] || {
      type: "services",
      sectionName: "Services",
      icon: BookOpen,
      subtitle: "What we offer to help you succeed.",
    }
  );
};

/* ───────────────────────────────────────────────────────────
   FONT PAIRS — 8 curated heading + body combinations
   ─────────────────────────────────────────────────────────── */
const FONT_PAIRS = [
  { id: "modern1", label: "Modern", heading: "Poppins", body: "Inter" },
  { id: "modern2", label: "Fresh", heading: "Montserrat", body: "Open Sans" },
  { id: "corporate1", label: "Corporate", heading: "Lato", body: "Roboto" },
  {
    id: "corporate2",
    label: "Editorial",
    heading: "Playfair Display",
    body: "Source Sans 3",
  },
  {
    id: "luxury",
    label: "Luxury",
    heading: "Cormorant Garamond",
    body: "Lato",
  },
  { id: "gym", label: "Bold", heading: "Oswald", body: "Inter" },
  { id: "clean", label: "Clean", heading: "Outfit", body: "DM Sans" },
  { id: "default", label: "Default", heading: "Inter", body: "Inter" },
];

const DEFAULT_FONT_PAIR = FONT_PAIRS[0]; // Poppins + Inter

/* Category → recommended font */
const CATEGORY_FONT_MAP = {
  ielts: "modern1",
  institute: "modern1",
  coaching: "modern2",
  consultant: "corporate1",
  realestate: "corporate2",
  clinic: "clean",
  gym: "gym",
  marketing: "modern2",
  custom: "default",
};

/* ───────────────────────────────────────────────────────────
   COLOR PALETTES — 8 presets with primary/secondary/accent
   ─────────────────────────────────────────────────────────── */
const COLOR_PALETTES = [
  {
    id: "red_black",
    label: "Classic Red",
    primary: "#dc2626",
    secondary: "#0f172a",
    accent: "#fbbf24",
    mode: "light",
  },
  {
    id: "blue_white",
    label: "Calm Blue",
    primary: "#2563eb",
    secondary: "#f8fafc",
    accent: "#06b6d4",
    mode: "light",
  },
  {
    id: "emerald_slate",
    label: "Fresh Green",
    primary: "#10b981",
    secondary: "#1e293b",
    accent: "#f59e0b",
    mode: "light",
  },
  {
    id: "orange_dark",
    label: "Bold Orange",
    primary: "#f97316",
    secondary: "#0c0a09",
    accent: "#eab308",
    mode: "light",
  },
  {
    id: "purple_black",
    label: "Bold Purple",
    primary: "#7c3aed",
    secondary: "#0f0b1e",
    accent: "#f472b6",
    mode: "light",
  },
  {
    id: "navy_gold",
    label: "Navy & Gold",
    primary: "#1e3a5f",
    secondary: "#f7f3e9",
    accent: "#d4a853",
    mode: "light",
  },
  {
    id: "slate_blue",
    label: "Corporate",
    primary: "#3b82f6",
    secondary: "#f1f5f9",
    accent: "#8b5cf6",
    mode: "light",
  },
  {
    id: "dark_red",
    label: "Dark Power",
    primary: "#ef4444",
    secondary: "#09090b",
    accent: "#fbbf24",
    mode: "dark",
  },
];

/* Category → recommended palette */
const CATEGORY_PALETTE_MAP = {
  ielts: "blue_white",
  institute: "red_black",
  coaching: "orange_dark",
  consultant: "slate_blue",
  realestate: "navy_gold",
  clinic: "blue_white",
  gym: "dark_red",
  marketing: "purple_black",
  custom: "red_black",
};

/* ───────────────────────────────────────────────────────────
   SECTION DESIGN VARIANTS — 5 layout variants per section
   ─────────────────────────────────────────────────────────── */
const SECTION_VARIANTS = {
  about: [
    { id: "img_left", label: "Image Left, Text Right" },
    { id: "img_right", label: "Text Left, Image Right" },
    { id: "centered_bg", label: "Centered + Background" },
    { id: "split_50", label: "Split Screen (50/50)" },
    { id: "minimal_typo", label: "Minimal Large Typography" },
  ],
  mission: [
    { id: "icon_centered", label: "Icon + Text Centered" },
    { id: "full_highlight", label: "Full Width Highlight" },
    { id: "card_layout", label: "Mission · Vision · Values" },
    { id: "side_quote", label: "Side Image + Quote" },
    { id: "dark_centered", label: "Dark Centered" },
  ],
  whyChooseUs: [
    { id: "four_col_grid", label: "4-Column Icon Grid" },
    { id: "two_by_two", label: "2×2 Card Layout" },
    { id: "horizontal_list", label: "Horizontal List" },
    { id: "icon_left_rows", label: "Icon Left, Text Right" },
    { id: "large_blocks", label: "Large Trust Blocks" },
  ],
  niche: [
    { id: "grid_3col", label: "3-Column Grid" },
    { id: "grid_2col", label: "2-Column Grid" },
    { id: "hover_cards", label: "Hover Overlay Cards" },
    { id: "large_featured", label: "Featured + Grid" },
    { id: "minimal_list", label: "Minimal List" },
  ],
  testimonials: [
    { id: "grid_cards", label: "Card Grid" },
    { id: "single_slider", label: "Single Slider" },
    { id: "masonry", label: "Masonry Layout" },
    { id: "large_quote", label: "Large Quote" },
    { id: "side_by_side", label: "Side-by-Side" },
  ],
  contact: [
    { id: "split_form", label: "Form + Info Split" },
    { id: "centered_form", label: "Centered Form" },
    { id: "card_overlap", label: "Card Overlap" },
    { id: "full_dark", label: "Full Dark" },
    { id: "minimal_clean", label: "Minimal Clean" },
  ],
  footer: [
    { id: "four_col", label: "4-Column Classic" },
    { id: "centered", label: "Centered Minimal" },
    { id: "dark_wide", label: "Dark Wide" },
    { id: "two_col", label: "2-Column Simple" },
    { id: "gradient_bar", label: "Gradient Bar" },
  ],
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // --- ONBOARDING FORM STATE ---
  const [showOnboarding, setShowOnboarding] = useState(true);

  // --- NEW: URL Auto-Fill State ---
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [scrapeError, setScrapeError] = useState("");
  const [scrapeSuccess, setScrapeSuccess] = useState("");
  const [improveLoading, setImproveLoading] = useState(false);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [showMobileNotice, setShowMobileNotice] = useState(true);

  // --- FONT + COLOR + DESIGN STATE ---
  const [fontPairId, setFontPairId] = useState("modern1");
  const [colorPaletteId, setColorPaletteId] = useState("crimson_gold");
  const [sectionDesigns, setSectionDesigns] = useState({
    about: "img_right",
    mission: "dark_centered",
    whyChooseUs: "four_col_grid",
    niche: "grid_3col",
    testimonials: "grid_cards",
    contact: "split_form",
    footer: "four_col",
  });

  const updateSectionDesign = (section, variantId) => {
    setSectionDesigns((prev) => ({ ...prev, [section]: variantId }));
  };

  const activeFontPair =
    FONT_PAIRS.find((f) => f.id === fontPairId) || DEFAULT_FONT_PAIR;
  const activePalette =
    COLOR_PALETTES.find((p) => p.id === colorPaletteId) || COLOR_PALETTES[0];

  // In Next.js, we don't have React Router state. Prefill from audit handled differently.
  const routerLocation = { state: null };
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
      heroCta: "Book Free Demo Class",
      heroCta2: "Get Guidance",
      formCta: "Request Call Back",
      themeColor: "#dc2626",
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
      aboutDescription:
        "We are a premier IELTS training institute with over 18 years of experience in helping students achieve their dream scores. Our expert faculty, comprehensive study materials, and personalised coaching methodology have empowered thousands of students to succeed globally.",
      founderName: "Director",
      founderTitle: "Founder & Chief Mentor",
      missionDescription:
        "Our mission is to make world-class IELTS preparation accessible to every aspiring student. We believe that with the right guidance, practice, and confidence, anyone can achieve their target band score and unlock doors to global opportunities.",
      stats: [
        { label: "Band 7+ Scorers", value: "1000+" },
        { label: "Years Experience", value: "8+" },
        { label: "Google Rating", value: "4.9/5" },
        { label: "Student Satisfaction", value: "100%" },
      ],
      nicheItems: [
        {
          courseName: "IELTS Speaking",
          duration: "4 Weeks",
          desc: "Master pronunciation, fluency, and real exam discussion strategies with mock tests.",
          icon: Mic,
        },
        {
          courseName: "IELTS Writing",
          duration: "6 Weeks",
          desc: "Structured training in Task 1 & 2 with expert essay corrections and templates.",
          icon: PenTool,
        },
        {
          courseName: "IELTS Reading",
          duration: "4 Weeks",
          desc: "Speed reading techniques and passage analysis for Academic & General modules.",
          icon: BookOpen,
        },
        {
          courseName: "IELTS Listening",
          duration: "4 Weeks",
          desc: "Audio drills, note-taking strategies, and full-length practice tests.",
          icon: Headphones,
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
      themeColor: "#dc2626",
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
      aboutDescription:
        "Expert English Speaking Academy (EESA) is dedicated to transforming lives through language mastery. Our innovative teaching methods, combined with a supportive learning environment, help students overcome barriers and communicate with confidence in any setting.",
      founderName: "Lead Trainer",
      founderTitle: "Head of Training & Development",
      missionDescription:
        "We are on a mission to break language barriers and empower individuals with the communication skills they need for personal and professional success. Every student who walks through our doors leaves with newfound confidence and fluency.",
      stats: [
        { label: "Active Students", value: "500+" },
        { label: "Expert Trainers", value: "15+" },
        { label: "Courses Offered", value: "12" },
        { label: "Success Rate", value: "98%" },
      ],
      nicheItems: [
        {
          courseName: "Spoken English",
          duration: "8 Weeks",
          desc: "Enhance your daily communication skills and speak with confidence.",
          icon: Mic,
        },
        {
          courseName: "Business English",
          duration: "6 Weeks",
          desc: "Professional communication for presentations, emails, and the corporate world.",
          icon: FileText,
        },
        {
          courseName: "Public Speaking",
          duration: "4 Weeks",
          desc: "Overcome stage fear and learn to speak with authority and impact.",
          icon: Users,
        },
        {
          courseName: "Personality Development",
          duration: "6 Weeks",
          desc: "Holistic development covering grooming, body language, and soft skills.",
          icon: Star,
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
      themeColor: "#f97316",
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
      aboutDescription:
        "City Coaching is a premier institution for competitive exam preparation with a national-level faculty. We provide a structured, result-oriented learning experience backed by comprehensive study material and a proven test series methodology.",
      founderName: "Faculty Head",
      founderTitle: "Director of Academics",
      missionDescription:
        "To empower every aspirant with the knowledge, strategy, and confidence needed to crack India's toughest competitive exams and build a successful career in public service.",
      stats: [
        { label: "Selections", value: "2000+" },
        { label: "Top Rankers", value: "50+" },
        { label: "Faculty Members", value: "30+" },
        { label: "Pan India Centers", value: "10" },
      ],
      nicheItems: [
        {
          courseName: "UPSC Prelims",
          duration: "12 Months",
          desc: "Comprehensive GS and CSAT preparation with mock tests and current affairs.",
          icon: BookOpen,
        },
        {
          courseName: "SSC CGL",
          duration: "6 Months",
          desc: "Targeted coaching for staff selection commission exams with test series.",
          icon: TrendingUp,
        },
        {
          courseName: "Banking PO",
          duration: "4 Months",
          desc: "Specialized batches for IBPS and SBI PO exams with sectional tests.",
          icon: Target,
        },
        {
          courseName: "State PCS",
          duration: "10 Months",
          desc: "State-specific public service commission preparation with local faculty.",
          icon: MapPin,
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
      themeColor: "#2563eb",
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
      aboutDescription:
        "Apex Solutions is a data-driven strategic consulting firm that helps enterprises scale, optimise operations, and maximise profitability. With a presence in 12+ countries, we bring global expertise with local market understanding to every engagement.",
      founderName: "Managing Partner",
      founderTitle: "CEO & Chief Strategist",
      missionDescription:
        "Our mission is to be the catalyst for transformative business growth. We partner with ambitious organisations to unlock hidden potential, drive operational excellence, and create lasting competitive advantage.",
      stats: [
        { label: "Clients Served", value: "150+" },
        { label: "Revenue Generated", value: "$500M" },
        { label: "Growth Rate", value: "3x" },
        { label: "Countries", value: "12" },
      ],
      nicheItems: [
        {
          serviceName: "Strategy Consulting",
          desc: "Long-term planning for sustainable growth with actionable roadmaps and KPI frameworks.",
          icon: Target,
        },
        {
          serviceName: "Digital Transformation",
          desc: "Modernizing legacy systems for the digital era with cloud migration and automation.",
          icon: Monitor,
        },
        {
          serviceName: "Financial Advisory",
          desc: "Optimizing capital allocation, cash flow management, and investment strategy.",
          icon: TrendingUp,
        },
        {
          serviceName: "HR Solutions",
          desc: "End-to-end talent acquisition, organizational restructuring, and culture building.",
          icon: Users,
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
      themeColor: "#10b981",
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
      aboutDescription:
        "Prime Estates is the definitive destination for luxury real estate in London's most prestigious postcodes. With 25 years of market expertise, we curate an exclusive collection of properties that redefine elegant living.",
      founderName: "Estate Director",
      founderTitle: "Managing Director",
      missionDescription:
        "To connect discerning buyers with exceptional properties, providing a seamless and luxurious real estate experience from first viewing to final handover. We believe every family deserves a dream home.",
      stats: [
        { label: "Properties Sold", value: "450+" },
        { label: "Happy Families", value: "400+" },
        { label: "Years in Market", value: "25" },
        { label: "Industry Awards", value: "18" },
      ],
      nicheItems: [
        {
          propertyImage:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
          location: "Kensington, London",
          price: "£2.4M",
          details: "5 Bed · 4 Bath · 4,200 sqft · Private Garden",
          icon: Star,
        },
        {
          propertyImage:
            "https://images.unsplash.com/photo-1600596542815-2a4d04774c13?auto=format&fit=crop&w=800&q=80",
          location: "Mayfair, London",
          price: "£5.8M",
          details: "Penthouse · 3 Bed · Sky Terrace · Concierge",
          icon: Zap,
        },
        {
          propertyImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
          location: "Chelsea, London",
          price: "£3.2M",
          details: "4 Bed · 3 Bath · Period Conversion · Parking",
          icon: Monitor,
        },
        {
          propertyImage:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
          location: "Canary Wharf, London",
          price: "£1.9M",
          details: "3 Bed · River View · Gym Access · 24h Security",
          icon: CheckCircle,
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
      themeColor: "#2563eb",
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
      aboutDescription:
        "CarePlus Medical Centre is a state-of-the-art healthcare facility providing comprehensive, compassionate care for you and your family. Our team of 40+ specialist doctors and cutting-edge medical technology ensure the highest standard of treatment.",
      founderName: "Chief Medical Officer",
      founderTitle: "Director of Healthcare Operations",
      missionDescription:
        "To provide accessible, affordable, and world-class healthcare that places patients at the centre of everything we do. We strive to be the most trusted name in community health.",
      stats: [
        { label: "Patients Treated", value: "50k+" },
        { label: "Specialist Doctors", value: "40+" },
        { label: "Emergency Rooms", value: "10" },
        { label: "Surgeries Done", value: "1200+" },
      ],
      nicheItems: [
        {
          treatmentName: "General Medicine",
          desc: "Comprehensive routine checkups, preventive screenings, and primary healthcare for all ages.",
          icon: Activity,
        },
        {
          treatmentName: "Pediatrics",
          desc: "Specialized care for infants, children, and adolescents with child-friendly facilities.",
          icon: Users,
        },
        {
          treatmentName: "Dental Care",
          desc: "Advanced dental treatments including cosmetic dentistry, implants, and orthodontics.",
          icon: CheckCircle,
        },
        {
          treatmentName: "Cardiology",
          desc: "Comprehensive heart health monitoring, diagnostics, and interventional treatments.",
          icon: Target,
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
      themeColor: "#f97316",
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
      aboutDescription:
        "Iron Foundry is the undisputed home of serious fitness in Venice Beach. Premium equipment, expert trainers, and a motivating atmosphere come together to create the ultimate training experience for athletes of all levels.",
      founderName: "Head Coach",
      founderTitle: "Founder & Head of Training",
      missionDescription:
        "To ignite the fire of fitness in every individual. We create a judgment-free, high-energy environment where anyone can build strength, confidence, and a healthier lifestyle — one rep at a time.",
      stats: [
        { label: "Members", value: "2000+" },
        { label: "Trainers", value: "25" },
        { label: "Classes/Week", value: "50+" },
        { label: "Sq Ft Area", value: "10k" },
      ],
      nicheItems: [
        {
          planName: "Starter Plan",
          price: "$29/mo",
          features: [
            "Gym Access 6AM–10PM",
            "Group Classes",
            "Locker Room",
            "Basic Assessment",
          ],
          icon: Users,
        },
        {
          planName: "Pro Plan",
          price: "$59/mo",
          features: [
            "24/7 Gym Access",
            "All Group Classes",
            "2 PT Sessions/month",
            "Nutrition Guide",
            "Sauna & Steam",
          ],
          icon: Zap,
        },
        {
          planName: "Elite Plan",
          price: "$99/mo",
          features: [
            "24/7 Unlimited Access",
            "Unlimited PT Sessions",
            "Custom Meal Plans",
            "Recovery Zone",
            "Guest Passes",
            "Priority Booking",
          ],
          icon: Star,
        },
        {
          planName: "Student Plan",
          price: "$19/mo",
          features: [
            "Gym Access 6AM–6PM",
            "Basic Classes",
            "Valid Student ID Required",
          ],
          icon: GraduationCap,
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
      themeColor: "#10b981", // Using emerald as purple isn't in my theme map, will default or add
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
      aboutDescription:
        "Pixel Growth is a performance-driven digital agency that combines creative strategy with data analytics to accelerate brand growth. As a Google Premium Partner and Meta Business Partner, we deliver campaigns that don't just look great — they convert.",
      founderName: "Creative Director",
      founderTitle: "Co-Founder & Head of Strategy",
      missionDescription:
        "To democratise digital marketing by giving every business — from startups to enterprises — access to the same calibre of data-driven strategy and creative excellence that Fortune 500 companies enjoy.",
      stats: [
        { label: "Ad Spend Managed", value: "$10M+" },
        { label: "ROI Average", value: "450%" },
        { label: "Campaigns Run", value: "1k+" },
        { label: "Team Size", value: "20" },
      ],
      nicheItems: [
        {
          projectImage:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          projectTitle: "E-Commerce Growth Campaign",
          desc: "Drove 450% ROI for a D2C fashion brand through Meta Ads and Google Shopping optimization.",
        },
        {
          projectImage:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
          projectTitle: "SaaS Lead Generation",
          desc: "Generated 2,000+ qualified leads for a B2B SaaS platform using LinkedIn Ads and content marketing.",
        },
        {
          projectImage:
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
          projectTitle: "Brand Identity Overhaul",
          desc: "Complete rebranding including logo, website, and social media presence for a fintech startup.",
        },
        {
          projectImage:
            "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
          projectTitle: "SEO Domination Strategy",
          desc: "Achieved #1 Google ranking for 50+ keywords driving 300% organic traffic growth in 6 months.",
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
    skin_clinic: {
      id: "skin_clinic",
      name: "Skin Clinic",
      logoText: "Lumina",
      logoSpan: "Clinic",
      tagline: "Reveal Your Natural Glow",
      phone: "+1 888-999-0123",
      address: "Aesthetic Lane, Beverly Hills",
      email: "hello@luminaclinic.com",
      heroTitle: "Premium Care for",
      heroSpan: "Your Skin Journey",
      heroDesc:
        "Experience the pinnacle of aesthetic medicine with our expert dermatologists. We combine cutting-edge technology with a holistic approach to reveal your skin's true potential.",
      themeColor: "#e11d48",
      navbarStyle: "transparent",
      heroStyle: "aesthetic_fullscreen_form",
      heroImage:
        "C:/Users/Acer/.gemini/antigravity/brain/69789311-0228-4086-9304-e09bc34708e0/media__1772175612343.jpg",
      gridImages: [
        "C:/Users/Acer/.gemini/antigravity/brain/69789311-0228-4086-9304-e09bc34708e0/media__1772175612359.jpg",
        "C:/Users/Acer/.gemini/antigravity/brain/69789311-0228-4086-9304-e09bc34708e0/media__1772175612426.jpg",
        "C:/Users/Acer/.gemini/antigravity/brain/69789311-0228-4086-9304-e09bc34708e0/media__1772175612437.jpg",
      ],
      marqueeItems: [
        "Board Certified Dermatologists",
        "Award Winning Clinic 2024",
        "Premium FDA Approved Tech",
        "Holistic Skin Consultations",
      ],
      aboutDescription:
        "Lumina Clinic is a sanctuary for skin health and aesthetic excellence. Founded on the principle that true beauty is a reflection of health, we offer personalized treatment plans that deliver visible, long-lasting results in a luxurious, calming environment.",
      founderName: "Dr. Elena Rossi",
      founderTitle: "Senior Aesthetic Surgeon",
      missionDescription:
        "To empower our clients through expert care and transformative results. We believe in enhancing natural features rather than changing them, ensuring you look and feel like the best version of yourself.",
      stats: [
        { label: "Happy Clients", value: "12k+" },
        { label: "Treatments Done", value: "35k+" },
        { label: "Expert Doctors", value: "12" },
        { label: "Years Experience", value: "15" },
      ],
      nicheItems: [
        {
          treatmentImage:
            "https://images.unsplash.com/photo-1512290923902-8a9f81df236c?auto=format&fit=crop&w=800&q=80",
          treatmentName: "Facial Rejuvenation",
          desc: "Advanced laser treatments and chemical peels to restore youthful radiance and texture.",
          icon: Star,
        },
        {
          treatmentImage:
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
          treatmentName: "Injectable Aesthetics",
          desc: "Expertly administered dermal fillers and anti-wrinkle injections for a natural lift.",
          icon: Zap,
        },
        {
          treatmentImage:
            "https://images.unsplash.com/photo-1515377662630-cd6a7be0bb01?auto=format&fit=crop&w=800&q=80",
          treatmentName: "Clinical Skincare",
          desc: "Medical-grade facials and targeted treatments for acne, pigmentation, and aging.",
          icon: CheckCircle,
        },
        {
          treatmentImage:
            "https://images.unsplash.com/photo-1570172619665-227d81966b9a?auto=format&fit=crop&w=800&q=80",
          treatmentName: "Body Contouring",
          desc: "Non-invasive fat reduction and skin tightening for a sculpted, confident silhouette.",
          icon: Target,
        },
      ],
      faqs: [
        {
          q: "What should I expect at my first consultation?",
          a: "A full digital skin analysis and a personalized treatment roadmap.",
        },
        {
          q: "Do you offer financing?",
          a: "Yes, we have flexible payment plans for our signature treatment packages.",
        },
      ],
      aboutImage:
        "C:/Users/Acer/.gemini/antigravity/brain/69789311-0228-4086-9304-e09bc34708e0/media__1772175612359.jpg",
      missionImage:
        "C:/Users/Acer/.gemini/antigravity/brain/69789311-0228-4086-9304-e09bc34708e0/media__1772175612426.jpg",
    },
  };

  const [activeBrandId, setActiveBrandId] = useState("institute");
  const [customBrand, setCustomBrand] = useState(defaultBrands.institute);
  const [showCustomizer, setShowCustomizer] = useState(true);
  const [fullscreenCustomizer, setFullscreenCustomizer] = useState(false);

  // --- ONBOARDING HANDLERS ---
  const handleOnboardingComplete = useCallback((brandConfig) => {
    // Apply all the collected data to the customBrand state
    setCustomBrand((prev) => ({
      ...prev,
      ...brandConfig,
    }));
    setActiveBrandId("custom");
    setShowOnboarding(false);
    setShowCustomizer(true);
  }, []);

  const handleOnboardingSkip = useCallback(() => {
    setShowOnboarding(false);
    setShowCustomizer(true);
  }, []);

  // When switching presets, reset the customBrand state but keep design config if desired?
  // For now, let's allow presets to also dictate default design, or just keep content.
  // The user asked for "customization section" for each. Let's attach design props to presets for a "starting point".
  const handleBrandChange = (brandId) => {
    setActiveBrandId(brandId);
    setCustomBrand({
      ...defaultBrands[brandId],
      navbarStyle: customBrand.navbarStyle,
      heroStyle: customBrand.heroStyle,
      themeColor: customBrand.themeColor,
    });
    // Apply recommended font + palette for this category
    const newPaletteId = CATEGORY_PALETTE_MAP[brandId] || "red_black";
    setFontPairId(CATEGORY_FONT_MAP[brandId] || "default");
    setColorPaletteId(newPaletteId);
    const pal = COLOR_PALETTES.find((p) => p.id === newPaletteId);
    if (pal?.primary) {
      setCustomBrand((prev) => ({ ...prev, themeColor: pal.primary }));
    }
  };

  // Draggable logic for the toggle button
  const [position, setPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth - 80 : 1200,
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

  // COLOR THEME HELPER — Dynamic CSS Variables
  const getThemeClasses = () => {
    return {
      text: "text-[var(--primary-color)]",
      bg: "bg-[var(--primary-color)]",
      border: "border-[var(--primary-color)]",
      lightBg: "bg-[var(--primary-color)]/10",
      lightBorder: "border-[var(--primary-color)]/20",
      shadow: "shadow-[var(--primary-color)]/30",
      ring: "ring-[var(--primary-color)]",
      hoverBg: "hover:brightness-90 hover:bg-[var(--primary-color)]",
      gradientFrom: "from-[var(--primary-color)]",
      gradientTo: "to-[var(--secondary-color,var(--primary-color))]",
    };
  };

  const theme = getThemeClasses();

  // LOGO RENDERER HELPER
  const renderLogo = (textClasses, spanClasses) => {
    const size = customBrand.logoSize || 56;
    if (customBrand.logoType === "upload" && customBrand.logoUpload) {
      return (
        <img
          src={customBrand.logoUpload}
          alt="Brand Logo"
          style={{ height: `${size}px`, maxHeight: "120px" }}
          className="w-auto inline-block object-contain align-middle"
        />
      );
    }
    if (customBrand.logoType === "url" && customBrand.logoUrl) {
      return (
        <img
          src={customBrand.logoUrl}
          alt="Brand Logo"
          style={{ height: `${size}px`, maxHeight: "120px" }}
          className="w-auto inline-block object-contain align-middle"
        />
      );
    }
    return (
      <span
        className={
          textClasses || "text-xl font-black text-slate-900 tracking-tight"
        }
      >
        {customBrand.logoText}
        <span className={spanClasses || theme.text}>
          {customBrand.logoSpan}
        </span>
      </span>
    );
  };

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

  // --- NEW: Generate Brand Images via API ---
  const handleGenerateImages = async () => {
    setImagesLoading(true);
    setScrapeError("");
    setScrapeSuccess("");
    // Use the active category (e.g., ielts, digital_agency) for the search
    const category = activeBrandId || "custom";

    try {
      // Call our new dynamic image service with refresh: true to always get new ones
      // Fetch 30 images to ensure enough unique ones for all sections
      const images = await fetchCategoryImages(category, {
        refresh: true,
        per_page: 30,
      });

      // Distribute images to relevant sections uniquely
      setCustomBrand((prev) => {
        const updated = { ...prev };

        // 1. Hero (Index 0)
        updated.heroImage = images[0] || prev.heroImage;

        // 2. About Us (Index 1)
        updated.aboutImage = images[1] || images[10] || prev.aboutImage;

        // 3. Grid Images (Indices 2-5) - used in some Hero styles
        if (images.slice(2, 6).length === 4) {
          updated.gridImages = images.slice(2, 6);
        }

        // 4. Mission (Index 6)
        updated.missionImage = images[6] || images[11] || prev.missionImage;

        // 5. Niche Items (Indices 12+) - For Properties, Projects, etc.
        if (updated.nicheItems && updated.nicheItems.length > 0) {
          updated.nicheItems = updated.nicheItems.map((item, idx) => {
            const newItem = { ...item };
            const imgIdx = 12 + idx;
            if (images[imgIdx]) {
              // Map to common niche image fields
              if (newItem.propertyImage !== undefined)
                newItem.propertyImage = images[imgIdx];
              if (newItem.projectImage !== undefined)
                newItem.projectImage = images[imgIdx];
              if (newItem.courseImage !== undefined)
                newItem.courseImage = images[imgIdx];
              if (newItem.serviceImage !== undefined)
                newItem.serviceImage = images[imgIdx];
              if (newItem.treatmentImage !== undefined)
                newItem.treatmentImage = images[imgIdx];
            }
            return newItem;
          });
        }

        return updated;
      });

      setScrapeSuccess(`Fresh unique images generated for: ${category}`);
    } catch (err) {
      console.error("Image Fix Error:", err);
      setScrapeError(
        err.message || "Failed to fetch new images. Check Unsplash API Key.",
      );
    } finally {
      setImagesLoading(false);
    }
  };

  // --- NEW: Export Static HTML ---
  const handleExportHtml = async () => {
    const element = document.getElementById("landing-page-export");
    if (!element) return;

    const clone = element.cloneNode(true);

    // 1. Remove mobile-only notice
    const mobileNotice = clone.querySelector(
      ".md\\:hidden.fixed.inset-x-4.bottom-6",
    );
    if (mobileNotice) {
      mobileNotice.remove();
    }

    // 2. Remove the customizer sidebar completely
    const sidebar = clone.querySelector("#customizer-sidebar");
    if (sidebar) {
      sidebar.remove();
    }

    // 3. Remove the floating customizer toggle button
    const toggleBtn = clone.querySelector("#customizer-toggle-btn");
    if (toggleBtn) {
      toggleBtn.remove();
    }

    // 4. Clean up Next.js / React injected specific attributes that pollute the clean HTML
    const allElements = clone.querySelectorAll("*");
    allElements.forEach((el) => {
      // Remove React specific props or Next router props that might leak
      for (const attr of el.attributes) {
        if (attr.name.startsWith("data-") || attr.name.startsWith("aria-")) {
          // Keep specific useful ones like aria-hidden, but strip framework specific chunks
        }
      }
    });

    const rawHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${customBrand.logoText || "Site"} ${customBrand.logoSpan || ""} - ${customBrand.tagline || ""}</title>
  
  <!-- Add Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          animation: {
            'marquee': 'marquee 25s linear infinite',
          },
          keyframes: {
            marquee: {
              '0%': { transform: 'translateX(0%)' },
              '100%': { transform: 'translateX(-100%)' },
            }
          }
        }
      }
    }
  </script>
  <style>
    /* Add smooth scrolling and font map */
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', sans-serif; }
  </style>
</head>
<body class="antialiased text-slate-800 bg-white">
  ${clone.outerHTML}
</body>
</html>`;

    try {
      // Use prettier directly in the browser to perfectly format the exported HTML code!
      const formattedHtml = await prettier.format(rawHtml, {
        parser: "html",
        plugins: [htmlParser],
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: "ignore",
      });

      const blob = new Blob([formattedHtml], {
        type: "text/html;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const companyName =
        `${customBrand.logoText || "company"}-${customBrand.logoSpan || "landing-page"}`
          .replace(/[\s_]+/g, "-")
          .toLowerCase();
      link.download = `${companyName}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to prettify HTML", err);
      // Fallback to raw if prettier fails
      const blob = new Blob([rawHtml], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const companyName =
        `${customBrand.logoText || "company"}-${customBrand.logoSpan || "landing-page"}`
          .replace(/[\s_]+/g, "-")
          .toLowerCase();
      link.download = `${companyName}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
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

  // If we received prefill data from audit, skip onboarding
  React.useEffect(() => {
    if (routerLocation.state?.prefillData) {
      setShowOnboarding(false);
    }
  }, [routerLocation.state]);

  // --- RENDER ONBOARDING FORM IF showOnboarding IS TRUE ---
  if (showOnboarding) {
    return (
      <BusinessOnboardingForm
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  return (
    <div
      id="landing-page-export"
      className="text-slate-800 bg-white selection:bg-red-100 selection:text-red-900 relative"
      style={{
        fontFamily: `'${activeFontPair.body}', sans-serif`,
        "--font-heading": `'${activeFontPair.heading}', sans-serif`,
        "--font-body": `'${activeFontPair.body}', sans-serif`,
        "--primary-color": customBrand.themeColor || "#dc2626",
        "--secondary-color": "#0f172a",
        "--accent-color": "#fbbf24",
        "--background-color": "#ffffff",
        "--text-color": "#0f172a",
      }}
    >
      {/* --- MOBILE ONLY NOTICE --- */}
      {showMobileNotice && (
        <div className="md:hidden fixed inset-x-4 bottom-6 z-[300] bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2 text-blue-400">
              <Monitor size={18} />
              <span className="font-bold text-xs uppercase tracking-widest">
                Desktop Recommended
              </span>
            </div>
            <button
              onClick={() => setShowMobileNotice(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            The Demo Creator Studio is best experienced on a laptop or desktop
            monitor to use all customization features properly.
          </p>
          <button
            onClick={() => setShowMobileNotice(false)}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-extrabold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Continue Anyway
          </button>
        </div>
      )}

      {/* --- CUSTOMIZER SIDEBAR (Right Side) --- */}
      <div
        id="customizer-sidebar"
        className={`fixed top-0 right-0 h-full bg-slate-900 text-white z-[100] shadow-2xl border-l border-slate-700/80 transition-all duration-300 ease-in-out overflow-y-auto ${
          fullscreenCustomizer ? "w-full left-0" : "w-[380px]"
        } ${showCustomizer ? "translate-x-0" : "translate-x-full"}`}
      >
        <div
          className={`p-5 ${fullscreenCustomizer ? "max-w-5xl mx-auto" : ""}`}
        >
          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-700/60">
            <h3 className="font-bold text-base flex items-center gap-2">
              <PenTool size={16} className="text-indigo-400" /> Customizer
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFullscreenCustomizer(!fullscreenCustomizer)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title={
                  fullscreenCustomizer
                    ? "Exit Fullscreen"
                    : "Open Fullscreen Editor"
                }
              >
                {fullscreenCustomizer ? (
                  <Monitor size={14} />
                ) : (
                  <Eye size={14} />
                )}
              </button>
              <button
                onClick={() => {
                  setShowCustomizer(false);
                  setFullscreenCustomizer(false);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Close Panel"
              >
                <X size={16} />
              </button>
            </div>
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
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={handleImproveCopy}
                disabled={improveLoading}
                className="w-full px-3 py-2 bg-purple-600/80 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                title="Rewrite headline & description into high-converting copy"
              >
                {improveLoading ? (
                  <>
                    <Loader2 size={12} className="animate-spin" /> ...
                  </>
                ) : (
                  <>
                    <Sparkles size={12} /> Rewrite Text
                  </>
                )}
              </button>
              <button
                onClick={handleGenerateImages}
                disabled={imagesLoading}
                className="w-full px-3 py-2 bg-pink-600/80 text-white rounded-lg text-xs font-bold hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                title="Generate HD images based on your brand"
              >
                {imagesLoading ? (
                  <>
                    <Loader2 size={12} className="animate-spin" /> ...
                  </>
                ) : (
                  <>
                    <ImagePlus size={12} /> Auto Images
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleExportHtml}
              className="w-full mt-2 px-3 py-2 bg-emerald-600/80 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1 shadow-lg shadow-emerald-900/20"
              title="Download clean HTML template with Tailwind CSS"
            >
              <Download size={12} /> Export to HTML
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
          <div
            className={`space-y-3 text-xs ${fullscreenCustomizer ? "grid grid-cols-2 gap-x-8 gap-y-3" : ""}`}
          >
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Logo Settings
            </label>
            <div className="bg-slate-800/20 p-3 rounded-xl border border-slate-700/50 space-y-3">
              <div>
                <label className="block text-slate-500 mb-1 text-[11px]">
                  Logo Type
                </label>
                <select
                  value={customBrand.logoType || "text"}
                  onChange={(e) =>
                    handleInputChange("logoType", e.target.value)
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                >
                  <option value="text">Text Logo</option>
                  <option value="upload">Upload from PC</option>
                  <option value="url">Use Logo URL</option>
                </select>
              </div>

              {(!customBrand.logoType || customBrand.logoType === "text") && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1 text-[11px]">
                      Logo Main
                    </label>
                    <input
                      value={customBrand.logoText || ""}
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
                      value={customBrand.logoSpan || ""}
                      onChange={(e) =>
                        handleInputChange("logoSpan", e.target.value)
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                    />
                  </div>
                </div>
              )}

              {customBrand.logoType === "upload" && (
                <div>
                  <label className="block text-slate-500 mb-1 text-[11px]">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        handleInputChange("logoUpload", url);
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white"
                  />
                  {customBrand.logoUpload && (
                    <div className="mt-2 p-2 bg-slate-900 rounded-lg border border-slate-700 flex justify-center">
                      <img
                        src={customBrand.logoUpload}
                        alt="Logo Preview"
                        className="max-h-12 object-contain"
                      />
                    </div>
                  )}
                </div>
              )}

              {customBrand.logoType === "url" && (
                <div>
                  <label className="block text-slate-500 mb-1 text-[11px]">
                    Image URL
                  </label>
                  <input
                    value={customBrand.logoUrl || ""}
                    onChange={(e) =>
                      handleInputChange("logoUrl", e.target.value)
                    }
                    placeholder="https://example.com/logo.png"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                  />
                  {customBrand.logoUrl && (
                    <div className="mt-2 p-2 bg-slate-900 rounded-lg border border-slate-700 flex justify-center">
                      <img
                        src={customBrand.logoUrl}
                        alt="Logo Preview"
                        className="max-h-12 object-contain"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Logo Size Control */}
              {(customBrand.logoType === "upload" ||
                customBrand.logoType === "url") && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-slate-500 text-[11px]">
                      Logo Size
                    </label>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                      {customBrand.logoSize || 56}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    value={customBrand.logoSize || 56}
                    onChange={(e) =>
                      handleInputChange("logoSize", parseInt(e.target.value))
                    }
                    className="w-full accent-indigo-500"
                  />
                </div>
              )}
            </div>

            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-4">
              Brand Details
            </label>
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
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs h-16 resize-none mb-3"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-slate-500 mb-1 text-[11px]">
                  Primary CTA
                </label>
                <input
                  value={customBrand.heroCta || ""}
                  onChange={(e) => handleInputChange("heroCta", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                  placeholder="e.g. Get Started"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 text-[11px]">
                  Secondary CTA
                </label>
                <input
                  value={customBrand.heroCta2 || ""}
                  onChange={(e) =>
                    handleInputChange("heroCta2", e.target.value)
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                  placeholder="e.g. Learn More"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 mb-1 text-[11px]">
                Lead Form Submit Text
              </label>
              <input
                value={customBrand.formCta || ""}
                onChange={(e) => handleInputChange("formCta", e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-xs"
                placeholder="e.g. Instant Call Back"
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

            {/* Theme Color — Full Color Wheel Picker */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-slate-500 text-[11px]">
                  Theme Color (Primary)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono">
                    {customBrand.themeColor || "#dc2626"}
                  </span>
                  <button
                    onClick={() => {
                      const palId =
                        CATEGORY_PALETTE_MAP[activeBrandId] || "red_black";
                      const pal = COLOR_PALETTES.find((p) => p.id === palId);
                      handleInputChange(
                        "themeColor",
                        pal?.primary || "#dc2626",
                      );
                    }}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-700">
                <HexColorPicker
                  color={customBrand.themeColor || "#dc2626"}
                  onChange={(color) => handleInputChange("themeColor", color)}
                />
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={customBrand.themeColor || "#dc2626"}
                    onChange={(e) =>
                      handleInputChange("themeColor", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 focus:border-indigo-500 outline-none text-xs text-center font-mono"
                    maxLength={7}
                  />
                  <input
                    type="color"
                    value={customBrand.themeColor || "#dc2626"}
                    onChange={(e) =>
                      handleInputChange("themeColor", e.target.value)
                    }
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0 overflow-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Gradient Mode Toggle */}
            <div>
              <label className="block text-slate-500 mb-2 text-[11px]">
                Gradient Accents
              </label>
              <button
                onClick={() =>
                  setCustomBrand((prev) => ({
                    ...prev,
                    useGradient: !prev.useGradient,
                  }))
                }
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  customBrand.useGradient
                    ? "border-indigo-500 bg-indigo-950/50"
                    : "border-slate-700 bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-4 rounded-full relative transition-all ${customBrand.useGradient ? "bg-indigo-600" : "bg-slate-600"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${customBrand.useGradient ? "left-[18px]" : "left-0.5"}`}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-300">
                    Enable Gradients
                  </span>
                </div>
                <div
                  className={`w-12 h-4 rounded bg-gradient-to-r ${theme.gradientFrom || "from-blue-500"} ${theme.gradientTo || "to-purple-600"} ${customBrand.useGradient ? "opacity-100" : "opacity-30"}`}
                />
              </button>
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
                <option value="aesthetic_fullscreen_form">
                  Aesthetic Full (Form)
                </option>
                <option value="aesthetic_fullscreen">
                  Aesthetic Full (No Form)
                </option>
                <option value="creative_split">Creative Modern Split</option>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
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

      {/* --- SIDEBAR TOGGLE TAB (Always visible on right edge) --- */}
      <button
        id="customizer-toggle-btn"
        onClick={() => setShowCustomizer(!showCustomizer)}
        className={`fixed top-1/2 -translate-y-1/2 z-[99] transition-all duration-300 ${
          showCustomizer
            ? "right-[380px] opacity-100"
            : "right-0 opacity-0 hover:opacity-100"
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
      {(() => {
        const ns = customBrand.navbarStyle || "standard";
        const isDark = ["dark", "transparent", "gradient"].includes(ns);
        const navLinks = [
          "Home",
          "Services",
          "About",
          "Reviews",
          "Trainers",
          "Contact",
        ];

        // Navbar style-specific outer classes
        const navOuterClass =
          {
            standard: `bg-white shadow-md border-b ${theme.lightBorder}`,
            minimal: "bg-white border-b border-slate-100",
            dark: "bg-slate-900 text-white border-b border-slate-800",
            transparent: "bg-transparent text-white",
            centered: "bg-white shadow-sm border-b border-slate-100",
            floating:
              "top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl rounded-2xl shadow-2xl bg-white/95 backdrop-blur-xl border border-slate-200/60",
            glass: `bg-white/60 backdrop-blur-2xl border-b border-white/40 shadow-lg`,
            gradient: `bg-gradient-to-r ${theme.gradientFrom || "from-slate-900"} ${theme.gradientTo || "to-slate-800"} text-white shadow-xl`,
            stack: "bg-white border-b border-slate-100 shadow-sm",
            borderless: "bg-white",
          }[ns] || "bg-white shadow-md";

        return (
          <nav
            className={`fixed w-full z-50 transition-all duration-300 ${navOuterClass}`}
          >
            {/* ═══ STANDARD: Top Info Bar + Classic Nav ═══ */}
            {ns === "standard" && (
              <>
                <div className="bg-slate-900 text-white text-xs py-2 px-4 hidden md:flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                      <Phone size={13} className={theme.text} />{" "}
                      {customBrand.phone}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={13} className={theme.text} />{" "}
                      {customBrand.address}
                    </span>
                  </div>
                  <span className="flex items-center gap-2">
                    <Monitor size={13} className={theme.text} />{" "}
                    {customBrand.email}
                  </span>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                      {renderLogo(
                        "text-2xl font-black text-slate-900 tracking-tight",
                        theme.text,
                      )}
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">
                        {customBrand.tagline}
                      </span>
                    </div>
                    <div className="hidden lg:flex items-center gap-1">
                      {navLinks.map((item) => (
                        <a
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className={`text-sm font-semibold px-4 py-2 rounded-lg text-slate-600 hover:${theme.lightBg} hover:${theme.text} transition-colors`}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                    <button
                      className={`hidden md:flex ${theme.bg} text-white px-6 py-2.5 rounded-xl shadow-lg ${theme.shadow} hover:opacity-90 transition-all text-xs font-bold uppercase tracking-wider gap-2 items-center`}
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="lg:hidden p-2 text-slate-900"
                    >
                      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>
                </div>
                <div className={`h-0.5 ${theme.bg} opacity-80`} />
              </>
            )}

            {/* ═══ MINIMAL: Ultra-clean with dot separators ═══ */}
            {ns === "minimal" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  {renderLogo(
                    "text-xl font-black text-slate-900 tracking-tight",
                    theme.text,
                  )}
                  <div className="hidden lg:flex items-center">
                    {navLinks.map((item, i) => (
                      <React.Fragment key={item}>
                        {i > 0 && (
                          <span className="w-1 h-1 rounded-full bg-slate-300 mx-3" />
                        )}
                        <a
                          href={`#${item.toLowerCase()}`}
                          className={`text-[13px] font-medium text-slate-500 hover:${theme.text} transition-colors`}
                        >
                          {item}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                  <button
                    className={`hidden md:flex ${theme.text} border ${theme.border} px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:${theme.bg} hover:text-white transition-all`}
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-slate-900"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            )}

            {/* ═══ DARK: Glowing CTA + top gradient line ═══ */}
            {ns === "dark" && (
              <>
                <div
                  className={`h-0.5 bg-gradient-to-r ${theme.gradientFrom || "from-blue-500"} ${theme.gradientTo || "to-purple-600"}`}
                />
                <div className="bg-slate-950 text-slate-400 text-xs py-1.5 px-4 hidden md:flex justify-between items-center border-b border-slate-800/50">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                      <Phone size={12} /> {customBrand.phone}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={12} /> {customBrand.address}
                    </span>
                  </div>
                  <span className="flex items-center gap-2">
                    <Monitor size={12} /> {customBrand.email}
                  </span>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-18 py-4">
                    <div className="flex-shrink-0">
                      {renderLogo(
                        "text-2xl font-black text-white tracking-tight",
                        "text-slate-400",
                      )}
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">
                        {customBrand.tagline}
                      </span>
                    </div>
                    <div className="hidden lg:flex items-center gap-6">
                      {navLinks.map((item) => (
                        <a
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current hover:after:w-full after:transition-all"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                    <button
                      className={`hidden md:flex bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} text-white px-6 py-2.5 rounded-xl shadow-lg shadow-${theme.shadow?.replace("shadow-", "")} hover:shadow-xl transition-all text-xs font-bold uppercase tracking-wider gap-2 items-center`}
                    >
                      <Zap size={14} /> Book Now
                    </button>
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="lg:hidden p-2 text-white"
                    >
                      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ═══ TRANSPARENT: No bg, text shadow for readability ═══ */}
            {ns === "transparent" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="flex justify-between items-center h-16">
                  {renderLogo(
                    "text-2xl font-black text-white tracking-tight drop-shadow-lg",
                    "text-white/70",
                  )}
                  <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-semibold text-white/80 hover:text-white transition-colors drop-shadow-md uppercase tracking-wide"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <button className="hidden md:flex border-2 border-white/50 text-white px-6 py-2.5 rounded-full hover:bg-white hover:text-slate-900 transition-all text-xs font-bold uppercase tracking-wider gap-2 items-center backdrop-blur-sm">
                    Book Now
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-white"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            )}

            {/* ═══ CENTERED: Logo centered between link groups + decorative lines ═══ */}
            {ns === "centered" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-20 relative">
                  <div className="hidden lg:flex items-center gap-5 absolute left-0">
                    {navLinks.slice(0, 3).map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className={`text-sm font-semibold text-slate-600 hover:${theme.text} transition-colors`}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 ${theme.bg} rounded-xl flex items-center justify-center text-white font-black text-lg mb-1 shadow-lg ${theme.shadow}`}
                    >
                      {customBrand.logoText?.[0]}
                    </div>
                    {renderLogo(
                      "text-lg font-black text-slate-900 tracking-tight",
                      theme.text,
                    )}
                  </div>
                  <div className="hidden lg:flex items-center gap-5 absolute right-0">
                    {navLinks.slice(3).map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className={`text-sm font-semibold text-slate-600 hover:${theme.text} transition-colors`}
                      >
                        {item}
                      </a>
                    ))}
                    <button
                      className={`${theme.bg} text-white px-5 py-2 rounded-xl text-xs font-bold uppercase shadow-lg ${theme.shadow}`}
                    >
                      Book
                    </button>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden absolute right-0 p-2 text-slate-900"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
                <div className="hidden lg:flex items-center justify-center gap-2 pb-2">
                  <div
                    className={`flex-1 h-px bg-gradient-to-r from-transparent ${theme.border ? `via-${theme.border.replace("border-", "")}` : "via-slate-200"} to-transparent opacity-30`}
                  />
                </div>
              </div>
            )}

            {/* ═══ FLOATING: Rounded pill floating below top ═══ */}
            {ns === "floating" && (
              <div className="max-w-6xl mx-auto px-3">
                <div className="flex justify-between items-center h-14 px-6">
                  {renderLogo(
                    "text-lg font-black text-slate-900 tracking-tight",
                    theme.text,
                  )}
                  <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className={`text-[13px] font-semibold px-3 py-1.5 rounded-full text-slate-600 hover:${theme.lightBg} hover:${theme.text} transition-all`}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <button
                    className={`hidden md:flex ${theme.bg} text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${theme.shadow} hover:scale-105 transition-transform`}
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-slate-900"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            )}

            {/* ═══ GLASS: Frosted glass with brand color tint ═══ */}
            {ns === "glass" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-18 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 ${theme.bg} rounded-lg flex items-center justify-center text-white font-black text-sm shadow ${theme.shadow}`}
                    >
                      {customBrand.logoText?.[0]}
                    </div>
                    <div>
                      {renderLogo(
                        "text-lg font-black text-slate-900 tracking-tight",
                        theme.text,
                      )}
                      <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {customBrand.tagline}
                      </span>
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center gap-1 bg-white/50 rounded-xl p-1 border border-slate-200/50">
                    {navLinks.map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className={`text-[13px] font-semibold px-4 py-2 rounded-lg text-slate-600 hover:bg-white hover:shadow-sm hover:${theme.text} transition-all`}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <button
                    className={`hidden md:flex ${theme.text} ring-2 ${theme.ring} px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:${theme.bg} hover:text-white hover:ring-0 transition-all`}
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-slate-900"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            )}

            {/* ═══ GRADIENT: Brand gradient bg, links on light pills ═══ */}
            {ns === "gradient" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                  <div className="flex-shrink-0">
                    {renderLogo(
                      "text-2xl font-black text-white tracking-tight",
                      "text-white/70",
                    )}
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mt-0.5">
                      {customBrand.tagline}
                    </span>
                  </div>
                  <div className="hidden lg:flex items-center gap-1 bg-white/10 rounded-xl p-1 backdrop-blur-sm">
                    {navLinks.map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-[13px] font-semibold px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <button className="hidden md:flex bg-white text-slate-900 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all gap-2 items-center">
                    <ArrowRight size={14} /> Get Started
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-white"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            )}

            {/* ═══ STACK: Two-row layout — logo+CTA top, nav bottom ═══ */}
            {ns === "stack" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <div className="flex flex-col items-center w-full lg:flex-row lg:justify-between">
                    <div className="text-center lg:text-left mb-3 lg:mb-0">
                      {renderLogo(
                        "text-2xl font-black text-slate-900 tracking-tight",
                        theme.text,
                      )}
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">
                        {customBrand.tagline}
                      </span>
                    </div>
                    <button
                      className={`hidden md:flex ${theme.bg} text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg ${theme.shadow}`}
                    >
                      Book Now
                    </button>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-slate-900"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
                <div className="hidden lg:flex items-center justify-center gap-1 border-t border-slate-100 py-3">
                  {navLinks.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`text-sm font-semibold px-5 py-2 text-slate-600 hover:${theme.text} transition-colors uppercase tracking-wide`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ BORDERLESS: Clean white, underline hover ═══ */}
            {ns === "borderless" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                  {renderLogo(
                    "text-2xl font-black text-slate-900 tracking-tight",
                    theme.text,
                  )}
                  <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className={`text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors relative group`}
                      >
                        {item}
                        <span
                          className={`absolute -bottom-1 left-0 w-0 h-0.5 ${theme.bg} group-hover:w-full transition-all duration-300`}
                        />
                      </a>
                    ))}
                  </div>
                  <button
                    className={`hidden md:flex text-sm font-bold ${theme.text} hover:underline underline-offset-4 gap-2 items-center uppercase tracking-wider`}
                  >
                    Let's Talk <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-slate-900"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            )}

            {/* ═══ MOBILE DROPDOWN (shared) ═══ */}
            {isMenuOpen && (
              <div className="lg:hidden bg-white border-t absolute w-full shadow-xl z-50">
                <div className="px-4 pt-2 pb-6 space-y-1">
                  {navLinks.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`block px-4 py-3 text-sm font-bold text-slate-800 hover:${theme.lightBg} hover:${theme.text} rounded-lg transition-colors`}
                    >
                      {item}
                    </a>
                  ))}
                  <button
                    className={`w-full mt-2 ${theme.bg} text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </nav>
        );
      })()}

      {/* --- HERO SECTION --- */}
      <div
        className={`relative overflow-hidden w-full flex flex-col
        ${["fullscreen", "video", "carousel", "aesthetic_fullscreen", "aesthetic_fullscreen_form", "creative_split"].includes(customBrand.heroStyle) ? "h-screen pt-0" : "min-h-[90vh] pt-28 pb-16"}
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
          className={`flex-1 flex flex-col justify-center relative z-10 ${["aesthetic_fullscreen", "aesthetic_fullscreen_form", "creative_split"].includes(customBrand.heroStyle) ? "w-full min-h-0" : "mx-auto max-w-7xl px-6 lg:px-8"} ${["fullscreen", "video", "carousel", "aesthetic_fullscreen", "aesthetic_fullscreen_form"].includes(customBrand.heroStyle) ? "text-white" : ""}`}
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
                  {customBrand.heroCta || "Get Started"}
                </button>
                <button
                  className={`bg-white text-slate-800 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all`}
                >
                  {customBrand.heroCta2 || "Learn More"}
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
                  {customBrand.heroCta2 || "Watch Video"}
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
                    {customBrand.heroCta2 || "View Plans"}
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
                      {customBrand.heroCta2 || "Learn More"}
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
                <h1
                  className="text-4xl md:text-5xl lg:text-[3.2rem] font-black tracking-tight text-slate-900 mb-6 leading-[1.1]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
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
                    {customBrand.heroCta || "Talk to an Expert"}
                  </button>
                  <button
                    className={`bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:border-slate-300 hover:shadow-lg transition-all`}
                  >
                    {customBrand.heroCta2 || "Get Guidance"}
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
                      {customBrand.formCta || "Get Instant Call Back"}
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
                    {customBrand.heroCta || "Get Started"}
                  </button>
                  <button className="flex items-center gap-3 text-slate-700 font-bold hover:opacity-80 transition-opacity">
                    <div
                      className={`w-12 h-12 rounded-full ${theme.lightBg} flex items-center justify-center shadow-sm border ${theme.lightBorder}`}
                    >
                      <Video size={18} className={theme.text} />
                    </div>
                    {customBrand.heroCta2 || "Watch Demo"}
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

          {/* --- AESTHETIC FULLSCREEN (FORM) --- */}
          {customBrand.heroStyle === "aesthetic_fullscreen_form" && (
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src={customBrand.heroImage}
                  className="w-full h-full object-cover"
                  alt="Background"
                />
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent"></div>
              </div>

              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full pt-28 pb-12">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-white/20">
                      <Sparkles size={12} className="text-rose-300" />
                      {customBrand.tagline}
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                      {customBrand.heroTitle} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-rose-100">
                        {customBrand.heroSpan}
                      </span>
                    </h1>
                    <p className="text-lg text-white/70 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium mb-10">
                      {customBrand.heroDesc}
                    </p>
                    <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${theme.bg} flex items-center justify-center text-white shadow-lg`}
                        >
                          <CheckCircle size={20} />
                        </div>
                        <span className="text-white font-bold text-xs uppercase tracking-wider">
                          Premium Quality
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${theme.bg} flex items-center justify-center text-white shadow-lg`}
                        >
                          <Star size={20} />
                        </div>
                        <span className="text-white font-bold text-xs uppercase tracking-wider">
                          Expert Results
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative group">
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} rounded-[32px] opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500`}
                    ></div>
                    <div className="relative bg-black/40 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 shadow-2xl">
                      <div className="mb-8">
                        <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                          Start Your Journey
                        </h3>
                        <p className="text-white/50 text-sm">
                          Book a consultation with our clinicians.
                        </p>
                      </div>
                      <form className="space-y-5">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-all"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-all"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-all"
                          />
                        </div>
                        <button
                          className={`w-full ${theme.bg} py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl ${theme.shadow}`}
                        >
                          {customBrand.formCta || "Book Consultation"}
                        </button>
                      </form>
                      <div className="mt-8 flex items-center justify-center gap-4 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span>Privacy Guaranteed</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- AESTHETIC FULLSCREEN (NO FORM) --- */}
          {customBrand.heroStyle === "aesthetic_fullscreen" && (
            <div className="w-full h-full flex flex-col items-center justify-center text-center relative px-6 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src={customBrand.heroImage}
                  className="w-full h-full object-cover"
                  alt="Background"
                />
                <div className="absolute inset-0 bg-slate-950/40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/80"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto pt-28 pb-12">
                <div className="flex justify-center mb-8 overflow-hidden">
                  <div className="animate-in slide-in-from-bottom duration-1000">
                    <div className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[11px] font-bold uppercase tracking-[0.4em]">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                      {customBrand.tagline}
                    </div>
                  </div>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.88] tracking-tighter mb-10 drop-shadow-2xl italic">
                  {customBrand.heroTitle} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/10">
                    {customBrand.heroSpan}
                  </span>
                </h1>

                <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light mb-12 px-4 drop-shadow-lg">
                  {customBrand.heroDesc}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <button
                    className={`bg-white text-slate-900 px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]`}
                  >
                    {customBrand.heroCta || "Experience Now"}
                  </button>
                  <button className="group flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs py-5 px-10 rounded-full border border-white/20 hover:bg-white/10 transition-all">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                      <Zap size={14} className="fill-current" />
                    </div>
                    {customBrand.heroCta2 || "View Our Work"}
                  </button>
                </div>
              </div>

              {/* Minimal floating elements */}
              <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">
                <div className="w-12 h-px bg-white/20"></div>
                LUMINA ARCHIVE
              </div>

              <div className="absolute top-1/2 -right-20 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 text-white/10 font-black text-2xl vertical-text tracking-[1.2em] pointer-events-none select-none">
                ESTHETIQUE • LUXE • PURE
              </div>
            </div>
          )}

          {/* --- CREATIVE MODERN SPLIT --- */}
          {customBrand.heroStyle === "creative_split" && (
            <div className="relative lg:pt-0 lg:pb-0 overflow-hidden w-full h-full flex flex-col items-center bg-white">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full flex-1 flex items-center pt-24">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-6 relative">
                    <div
                      className={`absolute -top-32 -left-32 w-[600px] h-[600px] ${theme.lightBg} rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob`}
                    ></div>

                    <div className="relative">
                      <div
                        className={`inline-flex items-center gap-2 py-2 px-4 rounded-xl ${theme.lightBg} ${theme.text} text-[11px] font-black uppercase tracking-[0.3em] mb-8 border ${theme.lightBorder}`}
                      >
                        <Sparkles size={14} />
                        {customBrand.tagline}
                      </div>

                      <h1
                        className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 mb-8 leading-[1] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {customBrand.heroTitle} <br />
                        <span
                          className={`inline-block mt-4 ${theme.text} italic font-serif`}
                        >
                          {customBrand.heroSpan}
                        </span>
                      </h1>

                      <p className="text-lg text-slate-500 leading-relaxed font-medium mb-12 max-w-lg">
                        {customBrand.heroDesc}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <button
                          className={`${theme.bg} text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:shadow-2xl hover:-translate-y-1 transition-all shadow-xl ${theme.shadow}`}
                        >
                          {customBrand.heroCta || "Book Consultation"}
                        </button>
                        <button className="group flex items-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors">
                          <span
                            className={`w-14 h-14 border-2 border-slate-200 rounded-full flex items-center justify-center group-hover:${theme.bg} group-hover:text-white group-hover:border-transparent transition-all`}
                          >
                            <ArrowRight size={18} />
                          </span>
                          {customBrand.heroCta2 || "See Our Work"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative hidden lg:block">
                    <div className="flex gap-6 h-[550px] items-center">
                      <div className="w-[60%] h-full">
                        <div className="h-full rounded-[48px] overflow-hidden shadow-2xl border-[6px] border-white">
                          <img
                            src={customBrand.heroImage}
                            className="w-full h-full object-cover"
                            alt="Visual 1"
                          />
                        </div>
                      </div>
                      <div className="w-[40%] flex flex-col gap-6 h-[85%]">
                        <div className="flex-1 rounded-[36px] overflow-hidden shadow-xl border-[6px] border-white">
                          <img
                            src={
                              customBrand.gridImages?.[0] ||
                              customBrand.heroImage
                            }
                            className="w-full h-full object-cover"
                            alt="Visual 2"
                          />
                        </div>
                        <div className="flex-1 rounded-[36px] overflow-hidden shadow-xl border-[6px] border-white relative group">
                          <img
                            src={
                              customBrand.gridImages?.[1] ||
                              customBrand.heroImage
                            }
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt="Visual 3"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Floating Stats Layer */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl px-12 py-6 rounded-[32px] shadow-2xl border border-slate-100 flex items-center gap-10 whitespace-nowrap">
                      <div>
                        <div className="text-2xl font-black text-slate-900 italic">
                          4.9/5
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                          Patient Satisfaction
                        </p>
                      </div>
                      <div className="w-px h-10 bg-slate-100"></div>
                      <div>
                        <div className="text-2xl font-black text-slate-900 italic">
                          25k+
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                          Transformations
                        </p>
                      </div>
                    </div>
                  </div>
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
                    {customBrand.heroCta || "Talk to an Expert"}
                  </button>
                  <button
                    className={`bg-white text-slate-900 border-2 border-slate-200 px-6 py-3 rounded font-bold text-sm uppercase tracking-widest hover:${theme.border} hover:${theme.text} transition-all`}
                  >
                    {customBrand.heroCta2 || "Get Guidance"}
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
                      {customBrand.formCta || "Get Instant Call Back"}
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
                    {customBrand.heroCta || "Get Started"}
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

        {/* --- DYNAMIC MARQUEE (Pinned to bottom for 100vh styles) --- */}
        {customBrand.marqueeItems &&
          [
            "aesthetic_fullscreen",
            "aesthetic_fullscreen_form",
            "creative_split",
          ].includes(customBrand.heroStyle) && (
            <div className="w-full bg-slate-950/40 backdrop-blur-md border-t border-white/5 py-4 relative z-30">
              <div className="flex w-full whitespace-nowrap animate-marquee">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-16 mx-8 items-center">
                    {customBrand.marqueeItems.map((item, idx) => (
                      <div
                        key={`${i}-${idx}`}
                        className="flex items-center gap-3 text-white/50 font-bold uppercase tracking-[0.4em] text-[10px]"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${theme.bg} shadow-[0_0_12px_rgba(255,255,255,0.4)]`}
                        ></div>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* --- SMART IELTS TRUST BAR (Sits safely between Hero and Marquee without overlapping) --- */}
      {customBrand.id === "ielts" && (
        <div
          className={`w-full relative z-20 flex justify-center py-5 border-b shadow-sm ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) || customBrand.navbarStyle === "transparent" ? "bg-slate-900 border-slate-800 shadow-black/20" : "bg-white border-slate-100"}`}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 lg:gap-8">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) || customBrand.navbarStyle === "transparent" ? "bg-emerald-500/20" : "bg-emerald-50"}`}
                >
                  <CheckCircle size={20} className="text-emerald-500" />
                </div>
                <span
                  className={`text-sm md:text-base font-black uppercase tracking-wider ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) || customBrand.navbarStyle === "transparent" ? "text-slate-200" : "text-slate-800"}`}
                >
                  Band 8+ Success Rate
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) || customBrand.navbarStyle === "transparent" ? "bg-blue-500/20" : "bg-blue-50"}`}
                >
                  <Users size={20} className="text-blue-500" />
                </div>
                <span
                  className={`text-sm md:text-base font-black uppercase tracking-wider ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) || customBrand.navbarStyle === "transparent" ? "text-slate-200" : "text-slate-800"}`}
                >
                  5000+ Students Trained
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) || customBrand.navbarStyle === "transparent" ? "bg-purple-500/20" : "bg-purple-50"}`}
                >
                  <BookOpen size={20} className="text-purple-500" />
                </div>
                <span
                  className={`text-sm md:text-base font-black uppercase tracking-wider ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) || customBrand.navbarStyle === "transparent" ? "text-slate-200" : "text-slate-800"}`}
                >
                  Cambridge Material
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) || customBrand.navbarStyle === "transparent" ? "bg-rose-500/20" : "bg-rose-50"}`}
                >
                  <Target size={20} className="text-rose-500" />
                </div>
                <span
                  className={`text-sm md:text-base font-black uppercase tracking-wider ${["fullscreen", "video", "carousel"].includes(customBrand.heroStyle) || customBrand.navbarStyle === "transparent" ? "text-slate-200" : "text-slate-800"}`}
                >
                  Weekly Mock Tests
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MARQUEE SECTION (For Non-Fullscreen Styles) --- */}
      {customBrand.marqueeItems &&
        ![
          "aesthetic_fullscreen",
          "aesthetic_fullscreen_form",
          "creative_split",
        ].includes(customBrand.heroStyle) && (
          <div
            className={`bg-slate-900 border-y border-slate-800 overflow-hidden py-4 relative z-30`}
          >
            <div className="flex w-full whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-16 mx-8 items-center">
                  {customBrand.marqueeItems.map((item, idx) => (
                    <div
                      key={`${i}-${idx}`}
                      className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${theme.bg} shadow-[0_0_8px_rgba(255,255,255,0.3)]`}
                      ></div>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      {(() => {
        const aboutVariant = sectionDesigns.about;
        const aboutDesc =
          customBrand.aboutDescription ||
          "We are passionate about delivering excellence. With years of experience and a dedicated team, we've built a legacy of trust, innovation, and results that speak for themselves.";
        const founderName = customBrand.founderName || "Our Leader";
        const founderTitle = customBrand.founderTitle || "Founder & CEO";
        const aboutImage =
          customBrand.aboutImage ||
          customBrand.heroImage ||
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";

        return (
          <div
            className={`py-24 relative overflow-hidden ${aboutVariant === "split_50" ? "" : "bg-white"}`}
            id="about"
          >
            <div
              className={
                aboutVariant === "split_50"
                  ? ""
                  : "max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
              }
            >
              {/* ── Variant: img_left ── */}
              {aboutVariant === "img_left" && (
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="relative">
                    <div
                      className={`absolute -inset-4 ${theme.bg} rounded-3xl opacity-10 blur-2xl`}
                    ></div>
                    <img
                      src={aboutImage}
                      className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                      alt="About"
                    />
                  </div>
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
                    >
                      <Users size={14} /> About Us
                    </div>
                    <h2
                      className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      The Story Behind <br />
                      <span className={theme.text}>
                        {customBrand.logoText} {customBrand.logoSpan}
                      </span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                      {aboutDesc}
                    </p>
                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div
                        className={`w-14 h-14 ${theme.lightBg} rounded-full flex items-center justify-center font-black text-xl ${theme.text}`}
                      >
                        {founderName?.[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {founderName}
                        </h4>
                        <p
                          className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}
                        >
                          {founderTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Variant: img_right (Original) ── */}
              {aboutVariant === "img_right" && (
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
                    >
                      <Users size={14} /> About Us
                    </div>
                    <h2
                      className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      The Story Behind <br />
                      <span className={theme.text}>
                        {customBrand.logoText} {customBrand.logoSpan}
                      </span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                      {aboutDesc}
                    </p>
                    <div className="flex flex-wrap gap-6 mb-8">
                      {customBrand.stats &&
                        customBrand.stats.slice(0, 3).map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <span
                              className={`block text-2xl font-black ${theme.text}`}
                            >
                              {stat.value}
                            </span>
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <div
                        className={`w-14 h-14 ${theme.lightBg} rounded-full flex items-center justify-center font-black text-xl ${theme.text}`}
                      >
                        {founderName?.[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {founderName}
                        </h4>
                        <p
                          className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}
                        >
                          {founderTitle}
                        </p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className="text-amber-400 fill-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div
                      className={`absolute -inset-4 ${theme.bg} rounded-3xl opacity-10 blur-2xl`}
                    ></div>
                    <img
                      src={aboutImage}
                      className="relative rounded-2xl shadow-2xl w-full h-[450px] object-cover border border-slate-200/60"
                      alt="About"
                    />
                  </div>
                </div>
              )}

              {/* ── Variant: centered_bg ── */}
              {aboutVariant === "centered_bg" && (
                <div className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center">
                  <img
                    src={aboutImage}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="About"
                  />
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 text-center max-w-3xl px-8 py-16">
                    <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
                      <Users size={14} /> About Us
                    </div>
                    <h2
                      className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      The Story Behind{" "}
                      <span style={{ color: activePalette.primary }}>
                        {customBrand.logoText} {customBrand.logoSpan}
                      </span>
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                      {aboutDesc}
                    </p>
                    <div className="flex justify-center items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-black">
                        {founderName?.[0]}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">{founderName}</h4>
                        <p className="text-xs text-slate-400">{founderTitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Variant: split_50 ── */}
              {aboutVariant === "split_50" && (
                <div className="grid lg:grid-cols-2 min-h-[600px]">
                  <div className="bg-slate-900 flex items-center justify-center p-12 lg:p-16">
                    <div className="max-w-lg">
                      <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
                        <Users size={14} /> About Us
                      </div>
                      <h2
                        className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        The Story Behind <br />
                        <span style={{ color: activePalette.primary }}>
                          {customBrand.logoText} {customBrand.logoSpan}
                        </span>
                      </h2>
                      <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        {aboutDesc}
                      </p>
                      <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                        <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white font-black">
                          {founderName?.[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">
                            {founderName}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {founderTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={aboutImage}
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="About"
                    />
                  </div>
                </div>
              )}

              {/* ── Variant: minimal_typo ── */}
              {aboutVariant === "minimal_typo" && (
                <div className="text-center max-w-4xl mx-auto">
                  <div
                    className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-8 border ${theme.lightBorder}`}
                  >
                    <Users size={14} /> About Us
                  </div>
                  <h2
                    className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <span className={theme.text}>{customBrand.logoText}</span>{" "}
                    {customBrand.logoSpan}
                  </h2>
                  <p className="text-xl text-slate-500 leading-relaxed mb-12 max-w-2xl mx-auto">
                    {aboutDesc}
                  </p>
                  <div className="flex flex-wrap justify-center gap-8 mb-12">
                    {customBrand.stats &&
                      customBrand.stats.slice(0, 4).map((stat, idx) => (
                        <div key={idx} className="text-center px-6">
                          <span
                            className={`block text-4xl font-black ${theme.text} mb-1`}
                          >
                            {stat.value}
                          </span>
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="inline-flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
                    <div
                      className={`w-12 h-12 ${theme.lightBg} rounded-full flex items-center justify-center font-black text-lg ${theme.text}`}
                    >
                      {founderName?.[0]}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {founderName}
                      </h4>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-widest ${theme.text}`}
                      >
                        {founderTitle}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Variant: modern_split ── */}
              {aboutVariant === "modern_split" && (
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                  <div className="lg:col-span-7">
                    <div className="relative group">
                      <div
                        className={`absolute -inset-4 bg-gradient-to-tr ${theme.gradientFrom} ${theme.gradientTo} rounded-[40px] opacity-20 blur-2xl group-hover:opacity-30 transition-shadow`}
                      ></div>
                      <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden shadow-2xl">
                        <img
                          src={aboutImage}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          alt="About"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                      </div>
                      {/* Floating Badge */}
                      <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100 hidden md:block">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-14 h-14 rounded-2xl ${theme.bg} flex items-center justify-center text-white`}
                          >
                            <Users size={28} />
                          </div>
                          <div>
                            <div className="text-2xl font-black text-slate-900">
                              {customBrand.stats?.[0]?.value || "12k+"}
                            </div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                              Happy Patients
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 px-4">
                    <div
                      className={`inline-flex items-center gap-2 py-2 px-5 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-8 border ${theme.lightBorder}`}
                    >
                      Our Legacy
                    </div>
                    <h2
                      className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.15]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Defining the Future of{" "}
                      <span className={theme.text}>Aesthetic Care</span>
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed mb-10">
                      {aboutDesc}
                    </p>
                    <div className="space-y-6 mb-10">
                      {[
                        {
                          title: "Personalized Approach",
                          desc: "Every skin is unique, so is our treatment.",
                        },
                        {
                          title: "Latest Technology",
                          desc: "FDA approved lasers and premium skincare.",
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div
                            className={`w-6 h-6 rounded-full ${theme.lightBg} flex items-center justify-center flex-shrink-0 mt-1`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${theme.bg}`}
                            ></div>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">
                              {item.title}
                            </h4>
                            <p className="text-sm text-slate-400">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-8 border-t border-slate-100 flex items-center gap-5">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-50 shadow-md">
                        <div
                          className={`w-full h-full ${theme.bg} flex items-center justify-center text-white font-black text-xl`}
                        >
                          {founderName?.[0]}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-lg leading-tight">
                          {founderName}
                        </h4>
                        <p
                          className={`text-[11px] font-bold uppercase tracking-widest ${theme.text}`}
                        >
                          {founderTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {(() => {
        const missionVariant = sectionDesigns.mission;
        const missionDesc =
          customBrand.missionDescription ||
          "Our mission is to deliver excellence in everything we do. We strive to empower our clients and community with the tools, knowledge, and support they need to thrive.";
        const missionImage =
          customBrand.missionImage ||
          customBrand.heroImage ||
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";

        return (
          <div
            className={`py-24 relative overflow-hidden ${missionVariant === "full_highlight" ? `${theme.lightBg}` : "bg-slate-900"}`}
            id="mission"
          >
            {/* ── Variant: icon_centered (Original) ── */}
            {missionVariant === "icon_centered" && (
              <>
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] ${theme.bg} opacity-[0.05] rounded-full blur-[120px]`}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]"></div>
                <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 text-white/80 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
                    <Target size={14} className={theme.text} /> Our Mission
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
                    What Drives Us <span className={theme.text}>Forward</span>
                  </h2>
                  <div className="relative max-w-3xl mx-auto mb-16">
                    <div
                      className={`absolute -top-6 -left-4 text-8xl font-serif ${theme.text} opacity-20 leading-none`}
                    >
                      "
                    </div>
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium italic relative z-10 px-8">
                      {missionDesc}
                    </p>
                    <div
                      className={`absolute -bottom-6 -right-4 text-8xl font-serif ${theme.text} opacity-20 leading-none rotate-180`}
                    >
                      "
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    {customBrand.stats &&
                      customBrand.stats.slice(0, 4).map((stat, idx) => (
                        <div key={idx} className="text-center px-6 py-3">
                          <span
                            className={`block text-3xl md:text-4xl font-black ${theme.text} mb-1`}
                          >
                            {stat.value}
                          </span>
                          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            {/* ── Variant: full_highlight ── */}
            {missionVariant === "full_highlight" && (
              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                  <div
                    className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
                  >
                    <Target size={14} /> Our Mission
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    What Drives Us <span className={theme.text}>Forward</span>
                  </h2>
                </div>
                <div
                  className={`rounded-3xl p-8 md:p-12 border ${theme.lightBorder} bg-white relative overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 right-0 w-64 h-64 ${theme.bg} opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2`}
                  ></div>
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center max-w-3xl mx-auto mb-10 relative z-10">
                    {missionDesc}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                    {customBrand.stats &&
                      customBrand.stats.slice(0, 4).map((stat, idx) => (
                        <div
                          key={idx}
                          className={`text-center p-4 rounded-xl ${theme.lightBg} border ${theme.lightBorder}`}
                        >
                          <span
                            className={`block text-2xl font-black ${theme.text} mb-1`}
                          >
                            {stat.value}
                          </span>
                          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Variant: card_layout (Mission · Vision · Values) ── */}
            {missionVariant === "card_layout" && (
              <>
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] ${theme.bg} opacity-[0.05] rounded-full blur-[120px]`}
                ></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 text-white/80 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
                      <Target size={14} className={theme.text} /> Our Mission
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                      What Drives Us <span className={theme.text}>Forward</span>
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { title: "Mission", icon: Target, desc: missionDesc },
                      {
                        title: "Vision",
                        icon: Eye,
                        desc: "To be the leading force of transformation, setting benchmarks others aspire to reach.",
                      },
                      {
                        title: "Values",
                        icon: Heart,
                        desc: "Integrity, innovation, and impact guide every decision and interaction.",
                      },
                    ].map((card, idx) => {
                      const CardIcon = card.icon;
                      return (
                        <div
                          key={idx}
                          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                        >
                          <div
                            className={`w-12 h-12 ${theme.bg} rounded-xl flex items-center justify-center text-white mb-6`}
                          >
                            <CardIcon size={22} />
                          </div>
                          <h3 className="text-xl font-black text-white mb-3">
                            {card.title}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* ── Variant: side_quote ── */}
            {missionVariant === "side_quote" && (
              <>
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] ${theme.bg} opacity-[0.05] rounded-full blur-[120px]`}
                ></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative rounded-2xl overflow-hidden h-[400px]">
                      <img
                        src={missionImage}
                        className="w-full h-full object-cover"
                        alt="Mission"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent"></div>
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 text-white/80 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
                        <Target size={14} className={theme.text} /> Our Mission
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                        What Drives Us{" "}
                        <span className={theme.text}>Forward</span>
                      </h2>
                      <p className="text-lg text-slate-400 leading-relaxed mb-8 italic border-l-4 border-white/20 pl-6">
                        {missionDesc}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {customBrand.stats &&
                          customBrand.stats.slice(0, 4).map((stat, idx) => (
                            <div
                              key={idx}
                              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                            >
                              <span
                                className={`block text-2xl font-black ${theme.text}`}
                              >
                                {stat.value}
                              </span>
                              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                {stat.label}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── Variant: dark_centered ── */}
            {missionVariant === "dark_centered" && (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 text-white/80 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
                    <Target size={14} className={theme.text} /> Our Mission
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                    What Drives Us
                    <br />
                    <span className={theme.text}>Forward</span>
                  </h2>
                  <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    {missionDesc}
                  </p>
                </div>
              </>
            )}

            {/* ── Variant: aesthetic_grid ── */}
            {missionVariant === "aesthetic_grid" && (
              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                  <div className="lg:col-span-5">
                    <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 text-white/80 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
                      Vision & Mission
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-10 leading-[1.05] tracking-tighter">
                      Excellence is not <br />
                      <span className={theme.text}>Our Act, but Our Habit</span>
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium italic">
                      " {missionDesc} "
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      {[
                        { label: "Core Values", val: "Integrity" },
                        { label: "Our Focus", val: "Innovation" },
                      ].map((v, i) => (
                        <div
                          key={i}
                          className="border-l-2 border-white/10 pl-6"
                        >
                          <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">
                            {v.label}
                          </div>
                          <div className="text-xl font-black text-white tracking-wide">
                            {v.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-2 gap-6 items-start">
                      <div className="space-y-6">
                        <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative group">
                          <img
                            src={missionImage}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt="M1"
                          />
                          <div className="absolute inset-0 bg-slate-900/30"></div>
                        </div>
                        <div
                          className={`aspect-square rounded-[40px] ${theme.bg} p-10 flex flex-col justify-end text-white shadow-2xl relative overflow-hidden`}
                        >
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                          <Star size={40} className="mb-6 opacity-30" />
                          <h3 className="text-3xl font-black leading-tight mb-2">
                            Award Winning Service
                          </h3>
                          <p className="text-white/60 text-sm">
                            Recognized globally for quality.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-6 pt-12">
                        <div className="aspect-square rounded-[40px] bg-white/5 border border-white/10 p-10 backdrop-blur-md flex flex-col justify-center items-center shadow-2xl">
                          <div
                            className={`text-6xl font-black ${theme.text} mb-4`}
                          >
                            99%
                          </div>
                          <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                            Success Rate
                          </div>
                        </div>
                        <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative group">
                          <img
                            src={customBrand.gridImages?.[2] || missionImage}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt="M2"
                          />
                          <div className="absolute inset-0 bg-slate-900/40"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* ═══════════════════════════════════════════════════════════
          UNIVERSAL SECTION 3 — WHY CHOOSE US (LOCKED — Not Editable)
          Auto-loads content based on brand category.
          Fixed order: Always appears after Our Mission
          ═══════════════════════════════════════════════════════════ */}
      {(() => {
        const wcuVariant = sectionDesigns.whyChooseUs;
        const wcuItems = getWhyChooseUs(activeBrandId);

        return (
          <div
            className={`${theme.lightBg} py-24 relative overflow-hidden`}
            id="why-us"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div
                  className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
                >
                  <CheckCircle size={14} /> Why Choose Us
                </div>
                <h2
                  className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Why Choose{" "}
                  <span className={theme.text}>
                    {customBrand.logoText} {customBrand.logoSpan}
                  </span>
                  ?
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                  Here's what sets us apart from the rest. These aren't just
                  promises — they're the foundation of everything we do.
                </p>
              </div>

              {/* ── Variant: four_col_grid ── */}
              {wcuVariant === "four_col_grid" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wcuItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="group bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                    >
                      <div
                        className={`absolute top-4 right-4 text-5xl font-black ${theme.text} opacity-[0.06] leading-none`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div
                        className={`w-12 h-12 ${theme.lightBg} ${theme.text} rounded-xl flex items-center justify-center mb-5 transition-colors duration-300`}
                      >
                        <CheckCircle size={22} />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Variant: two_by_two ── */}
              {wcuVariant === "two_by_two" && (
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {wcuItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 flex gap-5"
                    >
                      <div
                        className={`w-14 h-14 ${theme.bg} text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${theme.shadow}`}
                      >
                        <CheckCircle size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Variant: horizontal_list ── */}
              {wcuVariant === "horizontal_list" && (
                <div className="space-y-4 max-w-3xl mx-auto">
                  {wcuItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-6 bg-white rounded-2xl px-8 py-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all"
                    >
                      <div
                        className={`w-10 h-10 ${theme.bg} text-white rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="font-black text-sm">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-sm mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      <CheckCircle
                        size={20}
                        className={`${theme.text} flex-shrink-0`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ── Variant: icon_left_rows ── */}
              {wcuVariant === "icon_left_rows" && (
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl mx-auto">
                  {wcuItems.map((item, idx) => (
                    <div key={idx} className="flex gap-5 items-start">
                      <div
                        className={`w-12 h-12 ${theme.lightBg} ${theme.text} rounded-full flex items-center justify-center flex-shrink-0 border-2 ${theme.lightBorder}`}
                      >
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Variant: large_blocks ── */}
              {wcuVariant === "large_blocks" && (
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {wcuItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-3xl p-10 overflow-hidden ${idx === 0 ? `${theme.bg} text-white` : "bg-white border border-slate-100"} hover:shadow-2xl transition-all`}
                    >
                      <div
                        className={`absolute top-6 right-6 text-7xl font-black ${idx === 0 ? "text-white" : theme.text} opacity-[0.06]`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div
                        className={`w-14 h-14 ${idx === 0 ? "bg-white/20" : `${theme.lightBg}`} rounded-2xl flex items-center justify-center mb-6`}
                      >
                        <CheckCircle
                          size={26}
                          className={idx === 0 ? "text-white" : theme.text}
                        />
                      </div>
                      <h4
                        className={`text-2xl font-bold mb-3 ${idx === 0 ? "text-white" : "text-slate-900"}`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`text-sm leading-relaxed ${idx === 0 ? "text-white/80" : "text-slate-500"}`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ═══════════════════════════════════════════════════════════
          DYNAMIC NICHE SECTION ENGINE
          Swaps layout automatically when category changes.
          Courses | Services | Properties | Treatments | Membership | Projects
          ═══════════════════════════════════════════════════════════ */}
      {(() => {
        const nicheConfig = getNicheConfig(activeBrandId);
        const NicheIcon = nicheConfig.icon;
        const items = customBrand.nicheItems || [];
        const nicheVariant = sectionDesigns.niche;
        const nicheGridClass =
          nicheVariant === "grid_2col"
            ? "grid md:grid-cols-2 gap-8"
            : nicheVariant === "hover_cards"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : nicheVariant === "large_featured"
                ? "grid md:grid-cols-2 gap-6"
                : nicheVariant === "minimal_list"
                  ? "space-y-4 max-w-3xl mx-auto"
                  : "grid md:grid-cols-2 lg:grid-cols-4 gap-6"; // grid_3col fallback to 4col for 4 items

        return (
          <div className="py-24 bg-white" id="services">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* Dynamic Section Header */}
              <div className="text-center mb-16">
                <div
                  className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
                >
                  <NicheIcon size={14} />
                  {nicheConfig.sectionName}
                </div>
                <h2
                  className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Our{" "}
                  <span className={theme.text}>{nicheConfig.sectionName}</span>
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                  {nicheConfig.subtitle}
                </p>
              </div>

              {/* ── COURSES LAYOUT (IELTS / Institute / Coaching) ── */}
              {nicheConfig.type === "courses" && (
                <div className={nicheGridClass}>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`bg-white border border-slate-100 p-8 hover:shadow-2xl hover:${theme.lightBorder} transition-all duration-300 group text-center rounded-2xl relative overflow-hidden`}
                    >
                      <div
                        className={`absolute inset-0 ${theme.bg} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300`}
                      ></div>
                      <div
                        className={`w-16 h-16 mx-auto ${theme.lightBg} ${theme.text} rounded-2xl flex items-center justify-center mb-6 group-hover:${theme.bg} group-hover:text-white transition-colors shadow-sm group-hover:shadow-lg ${theme.shadow} duration-300`}
                      >
                        {item.icon && <item.icon size={28} />}
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">
                        {item.courseName}
                      </h4>
                      <span
                        className={`inline-block text-xs font-bold ${theme.text} ${theme.lightBg} px-3 py-1 rounded-full mb-4 border ${theme.lightBorder}`}
                      >
                        <Clock size={10} className="inline mr-1" />
                        {item.duration}
                      </span>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">
                        {item.desc}
                      </p>
                      <a
                        href="#"
                        className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                      >
                        Enroll Now <ArrowRight size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* ── SERVICES LAYOUT (Consultant) ── */}
              {nicheConfig.type === "services" && (
                <div className={nicheGridClass}>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex gap-6 items-start relative overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 ${theme.bg} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300`}
                      ></div>
                      <div
                        className={`w-14 h-14 flex-shrink-0 ${theme.lightBg} ${theme.text} rounded-2xl flex items-center justify-center group-hover:${theme.bg} group-hover:text-white transition-colors shadow-sm`}
                      >
                        {item.icon && <item.icon size={24} />}
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {item.serviceName}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                          {item.desc}
                        </p>
                        <a
                          href="#"
                          className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                        >
                          Learn More <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── PROPERTIES LAYOUT (Real Estate) ── */}
              {nicheConfig.type === "properties" && (
                <div className={nicheGridClass}>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="h-56 overflow-hidden relative">
                        <img
                          src={item.propertyImage}
                          alt={item.location}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                          className={`absolute top-4 right-4 ${theme.bg} text-white px-4 py-2 rounded-xl font-black text-lg shadow-lg ${theme.shadow}`}
                        >
                          {item.price}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={16} className={theme.text} />
                          <h4 className="text-xl font-bold text-slate-900">
                            {item.location}
                          </h4>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                          {item.details}
                        </p>
                        <a
                          href="#"
                          className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                        >
                          View Property <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── TREATMENTS LAYOUT (Clinic) ── */}
              {nicheConfig.type === "treatments" && (
                <div className={nicheGridClass}>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`bg-white border border-slate-100 p-8 hover:shadow-2xl hover:${theme.lightBorder} transition-all duration-300 group text-center rounded-2xl relative overflow-hidden`}
                    >
                      <div
                        className={`absolute inset-0 ${theme.bg} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300`}
                      ></div>
                      <div
                        className={`w-16 h-16 mx-auto ${theme.lightBg} ${theme.text} rounded-2xl flex items-center justify-center mb-6 group-hover:${theme.bg} group-hover:text-white transition-colors shadow-sm group-hover:shadow-lg ${theme.shadow} duration-300`}
                      >
                        {item.icon && <item.icon size={28} />}
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">
                        {item.treatmentName}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">
                        {item.desc}
                      </p>
                      <a
                        href="#"
                        className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                      >
                        Book Appointment <ArrowRight size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* ── MEMBERSHIP LAYOUT (Gym) ── */}
              {nicheConfig.type === "membership" && (
                <div className={nicheGridClass}>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group relative ${idx === 1 ? `ring-2 ${theme.border}` : ""}`}
                    >
                      {idx === 1 && (
                        <div
                          className={`${theme.bg} text-white text-center py-2 text-xs font-bold uppercase tracking-widest`}
                        >
                          Most Popular
                        </div>
                      )}
                      <div className="p-8 text-center">
                        <div
                          className={`w-14 h-14 mx-auto ${theme.lightBg} ${theme.text} rounded-2xl flex items-center justify-center mb-4 group-hover:${theme.bg} group-hover:text-white transition-colors`}
                        >
                          {item.icon && <item.icon size={24} />}
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-1">
                          {item.planName}
                        </h4>
                        <div className="mb-6">
                          <span className={`text-3xl font-black ${theme.text}`}>
                            {item.price}
                          </span>
                        </div>
                        <ul className="space-y-3 text-left mb-8">
                          {item.features &&
                            item.features.map((f, fi) => (
                              <li
                                key={fi}
                                className="flex items-center gap-2 text-sm text-slate-600"
                              >
                                <CheckCircle
                                  size={16}
                                  className={`${theme.text} flex-shrink-0`}
                                />
                                {f}
                              </li>
                            ))}
                        </ul>
                        <button
                          className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${idx === 1 ? `${theme.bg} text-white shadow-lg ${theme.shadow} hover:scale-[1.02]` : `border ${theme.border} ${theme.text} hover:${theme.bg} hover:text-white`}`}
                        >
                          Choose Plan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── PROJECTS LAYOUT (Digital Agency) ── */}
              {nicheConfig.type === "projects" && (
                <div className={nicheGridClass}>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="h-56 overflow-hidden relative">
                        <img
                          src={item.projectImage}
                          alt={item.projectTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <span
                            className={`inline-block ${theme.bg} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2`}
                          >
                            Case Study
                          </span>
                          <h4 className="text-white font-bold text-lg leading-snug">
                            {item.projectTitle}
                          </h4>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                          {item.desc}
                        </p>
                        <a
                          href="#"
                          className={`inline-flex items-center gap-2 ${theme.text} font-bold text-sm hover:gap-3 transition-all`}
                        >
                          View Case Study <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ═══════════════════════════════════════════════════════════
          UNIVERSAL SECTION — TESTIMONIALS
          Fixed order: Always appears after Niche Section
          ═══════════════════════════════════════════════════════════ */}
      <div className="bg-slate-50 py-24 border-y border-slate-100" id="reviews">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${theme.lightBg} ${theme.text} text-xs font-bold uppercase tracking-widest mb-6 border ${theme.lightBorder}`}
            >
              <Star size={14} />
              Testimonials
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What People <span className={theme.text}>Say</span>
            </h2>
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

          <div
            className={
              sectionDesigns.testimonials === "single_slider"
                ? "max-w-2xl mx-auto space-y-8"
                : sectionDesigns.testimonials === "large_quote"
                  ? "max-w-3xl mx-auto space-y-8"
                  : sectionDesigns.testimonials === "side_by_side"
                    ? "grid md:grid-cols-2 gap-8"
                    : sectionDesigns.testimonials === "masonry"
                      ? "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                      : "grid md:grid-cols-3 gap-8"
            }
          >
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Simran Kaur</h4>
                  <p className="text-slate-500 text-xs">a month ago</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill="currentColor"
                      size={12}
                      className="text-yellow-500"
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                "I am currently pursuing my studies at {customBrand.logoText}{" "}
                {customBrand.logoSpan}, and I am extremely grateful to be part
                of such a prestigious institution. The faculty members are
                highly knowledgeable, supportive, and genuinely committed to
                students' growth."
              </p>
              <div
                className={`bg-slate-50 p-4 rounded-xl border-l-4 ${theme.border} mt-auto`}
              >
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Response from the owner
                </p>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "We sincerely thank you for sharing such encouraging feedback.
                  Your kind words reassure us that our efforts are making a
                  meaningful difference."
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                  K
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Kamal Kumar</h4>
                  <p className="text-slate-500 text-xs">3 months ago</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill="currentColor"
                      size={12}
                      className="text-yellow-500"
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                "I had an amazing experience with the course here. The classes
                were super engaging and easy to follow. My trainer was really
                supportive and made learning fun — we did lots of speaking
                activities, role plays, and discussions."
              </p>
              <div
                className={`bg-slate-50 p-4 rounded-xl border-l-4 ${theme.border} mt-auto`}
              >
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Response from the owner
                </p>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Thank you Kamal for such a heartfelt review! We're delighted
                  that our methods helped you gain confidence."
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xl">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Shweta Singh</h4>
                  <p className="text-slate-500 text-xs">a month ago</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill="currentColor"
                      size={12}
                      className="text-yellow-500"
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                "I had joined one week ago and I realised it is a very good
                platform to learn. When I come here to attend classes I get lots
                of confidence. Before coming here I had hesitation to speak."
              </p>
              <div
                className={`bg-slate-50 p-4 rounded-xl border-l-4 ${theme.border} mt-auto`}
              >
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Response from the owner
                </p>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Thank you very much for sharing your positive feedback. We
                  truly appreciate your kind words."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          UNIVERSAL SECTION — CONTACT
          Fixed order: Always appears before Footer
          ═══════════════════════════════════════════════════════════ */}
      <div
        className={`py-24 ${sectionDesigns.contact === "full_dark" ? "bg-slate-900 text-white" : "bg-white"}`}
        id="contact"
      >
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-8 ${sectionDesigns.contact === "centered_form" || sectionDesigns.contact === "minimal_clean" ? "max-w-3xl" : ""}`}
        >
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 py-2 px-4 rounded-full ${sectionDesigns.contact === "full_dark" ? "bg-white/10 text-white/80 border-white/10" : `${theme.lightBg} ${theme.text} border ${theme.lightBorder}`} text-xs font-bold uppercase tracking-widest mb-6 border`}
            >
              <Phone size={14} />
              Get In Touch
            </div>
            <h2
              className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${sectionDesigns.contact === "full_dark" ? "text-white" : "text-slate-900"}`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Let's{" "}
              <span
                className={
                  sectionDesigns.contact === "full_dark"
                    ? theme.text
                    : theme.text
                }
              >
                Connect
              </span>
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto leading-relaxed ${sectionDesigns.contact === "full_dark" ? "text-slate-400" : "text-slate-500"}`}
            >
              Have questions? Ready to get started? Reach out and our team will
              respond within 24 hours.
            </p>
          </div>

          <div
            className={
              sectionDesigns.contact === "centered_form" ||
              sectionDesigns.contact === "minimal_clean"
                ? "max-w-2xl mx-auto"
                : sectionDesigns.contact === "card_overlap"
                  ? "grid lg:grid-cols-5 gap-12 relative"
                  : "grid lg:grid-cols-5 gap-12"
            }
          >
            {/* Contact Form — Left Side */}
            <div
              className={
                sectionDesigns.contact === "centered_form" ||
                sectionDesigns.contact === "minimal_clean"
                  ? ""
                  : "lg:col-span-3"
              }
            >
              <div
                className={`rounded-3xl p-8 md:p-10 border ${sectionDesigns.contact === "full_dark" ? "bg-slate-800 border-slate-700" : sectionDesigns.contact === "card_overlap" ? "bg-white border-slate-100 shadow-2xl relative z-10" : "bg-slate-50 border-slate-100"}`}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Send Us a Message
                </h3>
                <p className="text-slate-500 text-sm mb-8">
                  Fill in your details and we'll get back to you promptly.
                </p>

                <form
                  className="space-y-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className={`w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:${theme.border} transition-all placeholder:text-slate-400`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:${theme.border} transition-all placeholder:text-slate-400`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:${theme.border} transition-all placeholder:text-slate-400`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <textarea
                      placeholder="Tell us about your needs..."
                      rows={4}
                      className={`w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:${theme.border} transition-all resize-none placeholder:text-slate-400`}
                    ></textarea>
                  </div>
                  <button
                    className={`w-full ${theme.bg} text-white font-bold py-4 rounded-xl uppercase tracking-wider text-sm hover:scale-[1.01] hover:shadow-xl transition-all shadow-lg ${theme.shadow} flex items-center justify-center gap-2`}
                  >
                    <ArrowRight size={18} />
                    Send Message
                  </button>
                  <p className="text-center text-slate-400 text-[11px]">
                    🔒 Your information is 100% secure and will never be shared.
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Info — Right Side (hidden in centered/minimal layouts) */}
            <div
              className={`lg:col-span-2 space-y-6 ${sectionDesigns.contact === "centered_form" || sectionDesigns.contact === "minimal_clean" ? "hidden" : ""}`}
            >
              {/* Info Cards */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6">
                <h4 className="text-lg font-bold">Contact Information</h4>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 ${theme.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${theme.shadow}`}
                    >
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                        Phone
                      </p>
                      <p className="text-white font-bold text-lg">
                        {customBrand.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 ${theme.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${theme.shadow}`}
                    >
                      <Monitor size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <p className="text-white font-semibold">
                        {customBrand.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 ${theme.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${theme.shadow}`}
                    >
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                        Address
                      </p>
                      <p className="text-slate-300 font-medium leading-relaxed">
                        {customBrand.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div
                className={`${theme.lightBg} rounded-3xl p-8 border ${theme.lightBorder}`}
              >
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock size={18} className={theme.text} />
                  Business Hours
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">
                      Mon — Fri
                    </span>
                    <span className="font-bold text-slate-900">
                      9:00 AM — 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Saturday</span>
                    <span className="font-bold text-slate-900">
                      10:00 AM — 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Sunday</span>
                    <span className={`font-bold ${theme.text}`}>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          FAQ SECTION — Before Footer
          ═══════════════════════════════════════════════════════════ */}
      <div className={`py-24 ${theme.lightBg}`}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked <span className={theme.text}>Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {customBrand.faqs &&
              customBrand.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-800 text-base pr-4">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${activeFaq === index ? theme.bg + " text-white" : "bg-slate-100 text-slate-400"} transition-colors`}
                    >
                      <span className="text-lg font-bold leading-none">
                        {activeFaq === index ? "−" : "+"}
                      </span>
                    </div>
                  </button>
                  <div
                    className={`text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${activeFaq === index ? "max-h-40 px-6 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
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
        className={`${
          sectionDesigns.footer === "dark_wide"
            ? "bg-slate-900 text-slate-400"
            : sectionDesigns.footer === "gradient_bar"
              ? `bg-gradient-to-b from-slate-50 to-slate-100 text-slate-600`
              : `${theme.lightBg} text-slate-600`
        } pt-20 pb-10 border-t ${sectionDesigns.footer === "dark_wide" ? "border-slate-800" : theme.lightBorder} relative`}
        id="footer"
      >
        {sectionDesigns.footer === "gradient_bar" && (
          <div className={`absolute top-0 left-0 right-0 h-1 ${theme.bg}`} />
        )}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={
              sectionDesigns.footer === "centered"
                ? "text-center space-y-6 mb-10"
                : sectionDesigns.footer === "two_col"
                  ? "grid md:grid-cols-2 gap-12 mb-16"
                  : "grid md:grid-cols-4 gap-12 mb-16"
            }
          >
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                {customBrand.logoType === "text" && (
                  <div
                    className={`h-8 w-8 ${theme.bg} rounded flex items-center justify-center font-bold text-white`}
                  >
                    {customBrand.logoText?.[0]}
                  </div>
                )}
                {renderLogo("font-bold text-slate-900 text-lg", theme.text)}
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

      {/* --- GLOBAL FLOATING WHATSAPP BUTTON --- */}
      <a
        href="https://wa.me/919319933553"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[200] w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25d366]/30 hover:scale-110 hover:shadow-2xl hover:shadow-[#25d366]/40 transition-all cursor-pointer border border-white/20"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default LandingPage;

import {
  GraduationCap,
  BookOpen,
  MapPin,
  Activity,
  Zap,
  PenTool,
  Mic,
  PenTool as PenToolIcon,
  Headphones,
  FileText,
  Users,
  Star,
  Target,
  TrendingUp,
  Monitor,
  CheckCircle,
} from "lucide-react";

export const WHY_CHOOSE_US_DATA = {
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

export const NICHE_SECTION_CONFIG = {
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
    icon: PenToolIcon,
    subtitle:
      "A showcase of campaigns and projects that delivered real, measurable results.",
  },
};

export const FONT_PAIRS = [
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

export const COLOR_PALETTES = [
  {
    id: "crimson_gold",
    label: "Crimson & Gold",
    primary: "#dc2626",
    secondary: "#1c1917",
    accent: "#f59e0b",
    themeKey: "red",
    mode: "light",
  },
  {
    id: "ocean_blue",
    label: "Ocean Blue",
    primary: "#2563eb",
    secondary: "#f0f9ff",
    accent: "#06b6d4",
    themeKey: "blue",
    mode: "light",
  },
  {
    id: "forest_amber",
    label: "Forest & Amber",
    primary: "#059669",
    secondary: "#f0fdf4",
    accent: "#d97706",
    themeKey: "emerald",
    mode: "light",
  },
  {
    id: "sunset_blaze",
    label: "Sunset Blaze",
    primary: "#ea580c",
    secondary: "#fffbeb",
    accent: "#e11d48",
    themeKey: "orange",
    mode: "light",
  },
  {
    id: "royal_violet",
    label: "Royal Violet",
    primary: "#7c3aed",
    secondary: "#faf5ff",
    accent: "#ec4899",
    themeKey: "purple",
    mode: "light",
  },
  {
    id: "navy_gold",
    label: "Navy & Gold",
    primary: "#1e3a5f",
    secondary: "#fefce8",
    accent: "#ca8a04",
    themeKey: "navy",
    mode: "light",
  },
  {
    id: "rose_blush",
    label: "Rose Blush",
    primary: "#e11d48",
    secondary: "#fff1f2",
    accent: "#be185d",
    themeKey: "rose",
    mode: "light",
  },
  {
    id: "teal_coral",
    label: "Teal & Coral",
    primary: "#0d9488",
    secondary: "#f0fdfa",
    accent: "#f43f5e",
    themeKey: "teal",
    mode: "light",
  },
  {
    id: "slate_indigo",
    label: "Corporate Pro",
    primary: "#4f46e5",
    secondary: "#f8fafc",
    accent: "#0ea5e9",
    themeKey: "indigo",
    mode: "light",
  },
  {
    id: "midnight_fire",
    label: "Midnight Fire",
    primary: "#ef4444",
    secondary: "#09090b",
    accent: "#fbbf24",
    themeKey: "red",
    mode: "dark",
  },
];

export const SECTION_VARIANTS = {
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

export const DEFAULT_BRANDS = {
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
        icon: PenToolIcon,
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
    themeColor: "emerald",
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
};

export const CATEGORY_FONT_MAP = {
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

export const CATEGORY_PALETTE_MAP = {
  ielts: "ocean_blue",
  institute: "crimson_gold",
  coaching: "sunset_blaze",
  consultant: "slate_indigo",
  realestate: "navy_gold",
  clinic: "teal_coral",
  gym: "midnight_fire",
  marketing: "royal_violet",
  custom: "crimson_gold",
};

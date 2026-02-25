module.exports = [
"[project]/src/utils/regexHelpers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * regexHelpers.js
 * Utility functions for extracting structured data from raw HTML/text
 * using regular expressions.
 */ /**
 * Extract all phone numbers from text.
 * Supports formats: +1 555-0123, (02) 9876 5432, 9319933553, +91 98765 43210
 * @param {string} text - Raw text to search
 * @returns {string[]} Array of found phone numbers
 */ __turbopack_context__.s([
    "extractAddress",
    ()=>extractAddress,
    "extractEmails",
    ()=>extractEmails,
    "extractFirstImage",
    ()=>extractFirstImage,
    "extractPhones",
    ()=>extractPhones
]);
const extractPhones = (text)=>{
    if (!text) return [];
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{3,5}/g;
    const matches = text.match(phoneRegex) || [];
    // Filter out matches that are too short (likely false positives like years)
    return matches.filter((m)=>m.replace(/\D/g, "").length >= 7);
};
const extractEmails = (text)=>{
    if (!text) return [];
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return text.match(emailRegex) || [];
};
const extractAddress = (text)=>{
    if (!text) return null;
    // Look for common address patterns
    const addressPatterns = [
        /\d{1,5}\s[\w\s]+(?:street|st|road|rd|avenue|ave|blvd|dr|lane|ln|way|sector|sec|block|plot|floor|building|bldg|suite|ste|plaza|tower)[,.\s][\w\s,.-]+/gi,
        /(?:sector|sec)\s*[-]?\s*\d{1,3}[,.\s]+[\w\s,.-]+/gi,
        /[\w\s]+,\s*[\w\s]+,\s*[\w\s]+\s+\d{5,6}/g
    ];
    for (const pattern of addressPatterns){
        const match = text.match(pattern);
        if (match && match[0]) {
            // Clean up the match — trim and limit length
            return match[0].trim().substring(0, 120);
        }
    }
    return null;
};
const extractFirstImage = (html)=>{
    if (!html) return null;
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    while((match = imgRegex.exec(html)) !== null){
        const src = match[1];
        // Skip tracking pixels, icons, and tiny images
        if (src.includes("1x1") || src.includes("pixel") || src.includes("spacer") || src.includes(".ico") || src.includes("data:image")) {
            continue;
        }
        return src;
    }
    return null;
};
}),
"[project]/src/utils/keywordClassifier.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classifyNiche",
    ()=>classifyNiche,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * keywordClassifier.js
 * Classifies a website into a business niche based on keyword frequency
 * found in the page content.
 */ // Keyword dictionaries mapped to each niche
const NICHE_KEYWORDS = {
    coaching: [
        "coaching",
        "institute",
        "training",
        "course",
        "class",
        "batch",
        "student",
        "teacher",
        "exam",
        "preparation",
        "tuition",
        "faculty",
        "admission",
        "result",
        "syllabus",
        "test series",
        "study material",
        "competitive",
        "education",
        "learning",
        "academy"
    ],
    clinic: [
        "doctor",
        "clinic",
        "hospital",
        "patient",
        "medical",
        "health",
        "appointment",
        "treatment",
        "surgery",
        "specialist",
        "diagnosis",
        "healthcare",
        "medicine",
        "dental",
        "therapy",
        "consultation",
        "emergency",
        "pharmacy",
        "wellness",
        "care"
    ],
    realestate: [
        "property",
        "real estate",
        "apartment",
        "villa",
        "flat",
        "plot",
        "builder",
        "construction",
        "residential",
        "commercial",
        "rent",
        "buy",
        "sell",
        "mortgage",
        "broker",
        "listing",
        "sqft",
        "bhk",
        "penthouse",
        "township"
    ],
    gym: [
        "gym",
        "fitness",
        "workout",
        "exercise",
        "training",
        "muscle",
        "weight",
        "cardio",
        "yoga",
        "crossfit",
        "personal trainer",
        "membership",
        "strength",
        "endurance",
        "body",
        "diet",
        "nutrition",
        "supplement",
        "health club"
    ],
    consultant: [
        "consulting",
        "consultant",
        "strategy",
        "business",
        "advisory",
        "management",
        "solution",
        "enterprise",
        "corporate",
        "growth",
        "revenue",
        "optimization",
        "analysis",
        "planning",
        "implementation",
        "transformation",
        "roi"
    ],
    marketing: [
        "marketing",
        "digital",
        "seo",
        "ppc",
        "social media",
        "campaign",
        "brand",
        "advertising",
        "content",
        "analytics",
        "conversion",
        "traffic",
        "lead",
        "funnel",
        "email marketing",
        "agency",
        "google ads",
        "facebook ads",
        "instagram"
    ],
    restaurant: [
        "restaurant",
        "food",
        "menu",
        "cuisine",
        "chef",
        "dining",
        "reservation",
        "takeaway",
        "delivery",
        "order",
        "table",
        "kitchen",
        "recipe",
        "cafe",
        "bar",
        "bistro"
    ],
    ecommerce: [
        "shop",
        "store",
        "product",
        "cart",
        "checkout",
        "price",
        "buy",
        "order",
        "shipping",
        "discount",
        "sale",
        "catalog",
        "inventory",
        "payment",
        "ecommerce",
        "online store"
    ]
};
const classifyNiche = (text)=>{
    if (!text) return {
        niche: "coaching",
        confidence: 0,
        scores: {}
    };
    const lowerText = text.toLowerCase();
    const scores = {};
    // Count keyword matches for each niche
    for (const [niche, keywords] of Object.entries(NICHE_KEYWORDS)){
        let score = 0;
        for (const keyword of keywords){
            // Count occurrences of each keyword
            const regex = new RegExp(`\\b${keyword}\\b`, "gi");
            const matches = lowerText.match(regex);
            if (matches) {
                score += matches.length;
            }
        }
        scores[niche] = score;
    }
    // Find the niche with the highest score
    let bestNiche = "coaching"; // default fallback
    let bestScore = 0;
    for (const [niche, score] of Object.entries(scores)){
        if (score > bestScore) {
            bestScore = score;
            bestNiche = niche;
        }
    }
    // Calculate a rough confidence (0-1)
    const totalScore = Object.values(scores).reduce((a, b)=>a + b, 0);
    const confidence = totalScore > 0 ? bestScore / totalScore : 0;
    return {
        niche: bestNiche,
        confidence: Math.round(confidence * 100) / 100,
        scores
    };
};
const __TURBOPACK__default__export__ = classifyNiche;
}),
"[project]/src/utils/colorExtractor.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "extractPrimaryColor",
    ()=>extractPrimaryColor
]);
/**
 * colorExtractor.js
 * Extracts dominant/primary brand color from a website's HTML/CSS.
 * Uses inline styles, meta theme-color, and common CSS patterns.
 */ /**
 * Map a hex color to the closest supported theme color name.
 * Supported: red, blue, emerald, orange
 * @param {string} hex - Hex color string (e.g., "#ff0000")
 * @returns {string} Closest theme color name
 */ const mapToThemeColor = (hex)=>{
    if (!hex) return "red";
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    // Simple hue analysis
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    // If grayscale-ish, default to blue
    if (max - min < 30) return "blue";
    // Determine dominant channel
    if (r > g && r > b) {
        // Red dominant — check if orange-ish
        if (g > 100 && g < 200) return "orange";
        return "red";
    }
    if (g > r && g > b) {
        return "emerald";
    }
    if (b > r && b > g) {
        return "blue";
    }
    return "red"; // fallback
};
/**
 * Extract hex colors from HTML/CSS text.
 * @param {string} html - Raw HTML content
 * @returns {string[]} Array of hex color strings
 */ const extractHexColors = (html)=>{
    if (!html) return [];
    const hexRegex = /#([0-9a-fA-F]{6})\b/g;
    const matches = html.match(hexRegex) || [];
    // Filter out common non-brand colors (white, black, grays)
    return matches.filter((color)=>{
        const upper = color.toUpperCase();
        return upper !== "#FFFFFF" && upper !== "#000000" && upper !== "#F5F5F5" && upper !== "#333333" && upper !== "#666666" && upper !== "#999999" && upper !== "#CCCCCC" && upper !== "#EEEEEE";
    });
};
const extractPrimaryColor = (html)=>{
    if (!html) return {
        hex: null,
        themeColor: "red"
    };
    // 1. Check for meta theme-color
    const metaMatch = html.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i);
    if (metaMatch && metaMatch[1]) {
        return {
            hex: metaMatch[1],
            themeColor: mapToThemeColor(metaMatch[1])
        };
    }
    // 2. Gather all hex colors from the page
    const colors = extractHexColors(html);
    if (colors.length === 0) {
        return {
            hex: null,
            themeColor: "red"
        };
    }
    // 3. Find the most frequently used color — likely the brand color
    const frequency = {};
    for (const color of colors){
        const upper = color.toUpperCase();
        frequency[upper] = (frequency[upper] || 0) + 1;
    }
    const sorted = Object.entries(frequency).sort((a, b)=>b[1] - a[1]);
    const topColor = sorted[0][0];
    return {
        hex: topColor,
        themeColor: mapToThemeColor(topColor)
    };
};
const __TURBOPACK__default__export__ = extractPrimaryColor;
}),
"[project]/src/services/scrapeService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchWebsiteData",
    ()=>fetchWebsiteData
]);
/**
 * scrapeService.js
 * Fetches and parses a website's HTML to extract structured business data.
 * Uses a CORS proxy for client-side fetching, with graceful fallback.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$regexHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/regexHelpers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$keywordClassifier$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/keywordClassifier.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$colorExtractor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/colorExtractor.js [app-ssr] (ecmascript)");
;
;
;
// List of free CORS proxy services (fallback chain)
const CORS_PROXIES = [
    "https://api.allorigins.win/raw?url=",
    "https://corsproxy.io/?",
    "https://api.codetabs.com/v1/proxy?quest="
];
/**
 * Attempt to fetch HTML through CORS proxies.
 * @param {string} url - Target website URL
 * @returns {Promise<string>} Raw HTML string
 */ const fetchHTML = async (url)=>{
    // Ensure URL has protocol
    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
    for (const proxy of CORS_PROXIES){
        try {
            const response = await fetch(`${proxy}${encodeURIComponent(normalizedUrl)}`, {
                signal: AbortSignal.timeout(10000)
            });
            if (response.ok) {
                return await response.text();
            }
        } catch (err) {
            // Try next proxy
            console.warn(`Proxy ${proxy} failed:`, err.message);
        }
    }
    throw new Error("Unable to fetch website. Please try manual entry.");
};
/**
 * Extract the favicon / logo URL from HTML.
 * @param {string} html - Raw HTML
 * @param {string} baseUrl - Base URL for resolving relative paths
 * @returns {string|null} Logo/favicon URL
 */ const extractLogo = (html, baseUrl)=>{
    // Try to find apple-touch-icon or og:image first (usually higher quality)
    const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    if (ogImage && ogImage[1]) return resolveUrl(ogImage[1], baseUrl);
    // Look for apple-touch-icon
    const appleTouchIcon = html.match(/<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i);
    if (appleTouchIcon && appleTouchIcon[1]) return resolveUrl(appleTouchIcon[1], baseUrl);
    // Fallback to favicon
    const favicon = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i);
    if (favicon && favicon[1]) return resolveUrl(favicon[1], baseUrl);
    // Ultimate fallback: Google favicon service
    return `https://www.google.com/s2/favicons?domain=${baseUrl}&sz=128`;
};
/**
 * Resolve relative URL to absolute URL.
 * @param {string} path - Relative or absolute URL
 * @param {string} base - Base URL
 * @returns {string} Absolute URL
 */ const resolveUrl = (path, base)=>{
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("//")) return `https:${path}`;
    try {
        return new URL(path, base).href;
    } catch  {
        return path;
    }
};
/**
 * Extract the page title from HTML.
 * @param {string} html - Raw HTML
 * @returns {string} Page title
 */ const extractTitle = (html)=>{
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match ? match[1].trim() : "";
};
/**
 * Extract meta description from HTML.
 * @param {string} html - Raw HTML
 * @returns {string} Meta description
 */ const extractMetaDescription = (html)=>{
    const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    return match ? match[1].trim() : "";
};
const fetchWebsiteData = async (url)=>{
    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
    // Fetch the raw HTML
    const html = await fetchHTML(url);
    // Extract the visible text content (strip HTML tags)
    const textContent = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    // Run all extractors
    const title = extractTitle(html);
    const description = extractMetaDescription(html);
    const phones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$regexHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractPhones"])(textContent);
    const emails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$regexHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractEmails"])(textContent);
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$regexHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractAddress"])(textContent);
    const logo = extractLogo(html, normalizedUrl);
    const firstImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$regexHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractFirstImage"])(html);
    const colorData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$colorExtractor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractPrimaryColor"])(html);
    const nicheData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$keywordClassifier$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classifyNiche"])(textContent);
    // Build structured result
    return {
        url: normalizedUrl,
        title: title || "",
        description: description || "",
        phone: phones[0] || "",
        email: emails[0] || "",
        address: address || "",
        logo: logo || "",
        heroImage: firstImage ? resolveUrl(firstImage, normalizedUrl) : "",
        brandColor: colorData.themeColor || "red",
        brandHex: colorData.hex || null,
        niche: nicheData.niche || "coaching",
        nicheConfidence: nicheData.confidence || 0,
        // Raw data for advanced use
        raw: {
            allPhones: phones,
            allEmails: emails,
            nicheScores: nicheData.scores,
            textLength: textContent.length
        }
    };
};
const __TURBOPACK__default__export__ = fetchWebsiteData;
}),
"[project]/src/services/improveCopyService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "improveHeroCopy",
    ()=>improveHeroCopy
]);
/**
 * improveCopyService.js
 * Generates improved, high-converting hero copy
 * based on the current title, description, and niche.
 * Uses rule-based templates (no AI API needed).
 */ // Power words for high-converting copy
const POWER_WORDS = [
    "Transform",
    "Unlock",
    "Accelerate",
    "Dominate",
    "Elevate",
    "Supercharge",
    "Maximize",
    "Revolutionize",
    "Skyrocket",
    "Unleash"
];
// Benefit-driven sub-headlines by niche
const NICHE_BENEFITS = {
    coaching: "Join thousands of successful students who achieved their dream scores.",
    clinic: "Trusted by families for compassionate, world-class medical care.",
    realestate: "Discover your perfect space — handpicked luxury properties await.",
    gym: "Push your limits. Crush your goals. Transform your body.",
    consultant: "Data-driven strategies that double your revenue — guaranteed.",
    marketing: "Drive explosive growth with campaigns that actually convert.",
    restaurant: "Unforgettable flavors crafted from the finest ingredients.",
    ecommerce: "Shop premium products at unbeatable prices with free shipping."
};
// High-converting headline templates
const HEADLINE_TEMPLATES = [
    (brand)=>`${pickPower()} Your ${brand} Experience`,
    (brand)=>`The #1 ${brand} You Can Trust`,
    (brand)=>`${pickPower()} Results with ${brand}`,
    (brand)=>`Why Thousands Choose ${brand}`,
    (brand)=>`${brand} — Where Excellence Meets Results`,
    (brand)=>`Your Success Starts with ${brand}`
];
// Description templates
const DESC_TEMPLATES = [
    (niche)=>`We're not just another ${niche} — we deliver measurable results that speak for themselves. ${NICHE_BENEFITS[niche] || "Experience the difference today."}`,
    (niche)=>`${NICHE_BENEFITS[niche] || "Experience premium service."} Our expert team is dedicated to your success, every step of the way.`,
    (niche)=>`Stop settling for average. ${NICHE_BENEFITS[niche] || "Choose excellence."} Book your free consultation and see the difference.`
];
/**
 * Pick a random power word.
 * @returns {string} A power word
 */ const pickPower = ()=>{
    return POWER_WORDS[Math.floor(Math.random() * POWER_WORDS.length)];
};
const improveHeroCopy = ({ heroTitle, heroDesc, logoText, logoSpan, niche })=>{
    const brandName = `${logoText || ""} ${logoSpan || ""}`.trim() || "Us";
    const nicheKey = niche || "coaching";
    // Pick random templates
    const headlineTemplate = HEADLINE_TEMPLATES[Math.floor(Math.random() * HEADLINE_TEMPLATES.length)];
    const descTemplate = DESC_TEMPLATES[Math.floor(Math.random() * DESC_TEMPLATES.length)];
    // Generate title — split into two parts for heroTitle + heroSpan
    const fullHeadline = headlineTemplate(brandName);
    const words = fullHeadline.split(" ");
    const midpoint = Math.ceil(words.length / 2);
    const newTitle = words.slice(0, midpoint).join(" ");
    const newSpan = words.slice(midpoint).join(" ");
    const newDesc = descTemplate(nicheKey);
    return {
        heroTitle: newTitle,
        heroSpan: newSpan,
        heroDesc: newDesc
    };
};
const __TURBOPACK__default__export__ = improveHeroCopy;
}),
"[project]/src/services/imageService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Fetch a hero image and grid images related to a specific niche/keyword
 * completely free without an API key by proxying Unsplash's public UI Search API.
 *
 * @param {string} niche - The business niche or keyword (e.g. "gym", "dentist", "coaching")
 * @returns {Promise<{heroImage: string, gridImages: string[]}>}
 */ __turbopack_context__.s([
    "fetchNicheImages",
    ()=>fetchNicheImages
]);
const fetchNicheImages = async (niche)=>{
    try {
        const query = niche || "business office";
        // We use Unsplash's own frontend API so we don't need a token
        const unsplashUrl = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`;
        // Pass through a CORS proxy to bypass browser restrictions
        const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(unsplashUrl)}`;
        const response = await fetch(proxyUrl, {
            method: "GET",
            // Add a slight timeout to prevent hanging forever
            signal: AbortSignal.timeout(8000)
        });
        if (!response.ok) {
            throw new Error(`Unsplash Proxy API error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || !data.results || data.results.length === 0) {
            throw new Error("No images found for this category.");
        }
        // Extract the raw image URLs and append our own resizing params for performance + quality
        const images = data.results.map((photo)=>{
            const baseRaw = photo.urls.raw;
            // Force 1080p width at 80% quality
            return `${baseRaw}&w=1600&q=80&fit=crop&auto=format`;
        });
        return {
            heroImage: images[0] || "",
            gridImages: images.slice(1, 5)
        };
    } catch (err) {
        console.error("Unsplash Free Image Fetch Error:", err);
        throw err;
    }
};
}),
"[project]/src/app/demo/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>DemoPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * Demo Page — Next.js wrapper for the original DemoApp component.
 * DemoApp.jsx contains all 4256 lines of section variants, theme system,
 * customizer sidebar, onboarding form, and niche-specific sections.
 * We wrap it here with "use client" for Next.js compatibility.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$routes$2f$DemoApp$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/routes/DemoApp.jsx [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$routes$2f$DemoApp$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$routes$2f$DemoApp$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
function DemoPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$routes$2f$DemoApp$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/demo/page.jsx",
        lineNumber: 14,
        columnNumber: 10
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=src_97163571._.js.map
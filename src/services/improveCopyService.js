/**
 * improveCopyService.js
 * Generates improved, high-converting hero copy
 * based on the current title, description, and niche.
 * Uses rule-based templates (no AI API needed).
 */

// Power words for high-converting copy
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
  "Unleash",
];

// Benefit-driven sub-headlines by niche
const NICHE_BENEFITS = {
  coaching:
    "Join thousands of successful students who achieved their dream scores.",
  clinic: "Trusted by families for compassionate, world-class medical care.",
  realestate:
    "Discover your perfect space — handpicked luxury properties await.",
  gym: "Push your limits. Crush your goals. Transform your body.",
  consultant: "Data-driven strategies that double your revenue — guaranteed.",
  marketing: "Drive explosive growth with campaigns that actually convert.",
  restaurant: "Unforgettable flavors crafted from the finest ingredients.",
  ecommerce: "Shop premium products at unbeatable prices with free shipping.",
};

// High-converting headline templates
const HEADLINE_TEMPLATES = [
  (brand) => `${pickPower()} Your ${brand} Experience`,
  (brand) => `The #1 ${brand} You Can Trust`,
  (brand) => `${pickPower()} Results with ${brand}`,
  (brand) => `Why Thousands Choose ${brand}`,
  (brand) => `${brand} — Where Excellence Meets Results`,
  (brand) => `Your Success Starts with ${brand}`,
];

// Description templates
const DESC_TEMPLATES = [
  (niche) =>
    `We're not just another ${niche} — we deliver measurable results that speak for themselves. ${NICHE_BENEFITS[niche] || "Experience the difference today."}`,
  (niche) =>
    `${NICHE_BENEFITS[niche] || "Experience premium service."} Our expert team is dedicated to your success, every step of the way.`,
  (niche) =>
    `Stop settling for average. ${NICHE_BENEFITS[niche] || "Choose excellence."} Book your free consultation and see the difference.`,
];

/**
 * Pick a random power word.
 * @returns {string} A power word
 */
const pickPower = () => {
  return POWER_WORDS[Math.floor(Math.random() * POWER_WORDS.length)];
};

/**
 * Generate improved hero copy.
 * @param {{ heroTitle: string, heroDesc: string, logoText: string, logoSpan: string, niche: string }} params
 * @returns {{ heroTitle: string, heroSpan: string, heroDesc: string }}
 */
export const improveHeroCopy = ({
  heroTitle,
  heroDesc,
  logoText,
  logoSpan,
  niche,
}) => {
  const brandName = `${logoText || ""} ${logoSpan || ""}`.trim() || "Us";
  const nicheKey = niche || "coaching";

  // Pick random templates
  const headlineTemplate =
    HEADLINE_TEMPLATES[Math.floor(Math.random() * HEADLINE_TEMPLATES.length)];
  const descTemplate =
    DESC_TEMPLATES[Math.floor(Math.random() * DESC_TEMPLATES.length)];

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
    heroDesc: newDesc,
  };
};

export default improveHeroCopy;

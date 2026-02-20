/**
 * keywordClassifier.js
 * Classifies a website into a business niche based on keyword frequency
 * found in the page content.
 */

// Keyword dictionaries mapped to each niche
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
    "academy",
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
    "care",
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
    "township",
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
    "health club",
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
    "roi",
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
    "instagram",
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
    "bistro",
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
    "online store",
  ],
};

/**
 * Classify text into a business niche.
 * @param {string} text - The page text content to classify
 * @returns {{ niche: string, confidence: number, scores: Object }}
 */
export const classifyNiche = (text) => {
  if (!text) return { niche: "coaching", confidence: 0, scores: {} };

  const lowerText = text.toLowerCase();
  const scores = {};

  // Count keyword matches for each niche
  for (const [niche, keywords] of Object.entries(NICHE_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
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

  for (const [niche, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestNiche = niche;
    }
  }

  // Calculate a rough confidence (0-1)
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0 ? bestScore / totalScore : 0;

  return {
    niche: bestNiche,
    confidence: Math.round(confidence * 100) / 100,
    scores,
  };
};

export default classifyNiche;

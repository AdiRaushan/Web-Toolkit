// In-memory cache to prevent redundant API calls and stay within rate limits
const imageCache = {};

// Default Unsplash Access Key from environment variables
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_KEY || "";

/**
 * Maps categories to optimized Unsplash search queries.
 * Can be extended to support section-based or tone-based modifiers.
 */
const CATEGORY_QUERY_MAP = {
  ielts: "ielts classroom exam education student",
  digital_agency: "digital marketing agency modern office workspace",
  marketing: "digital marketing strategy data analytics",
  restaurant: "fine dining restaurant interior gourmet food",
  gym: "modern gym fitness training crossfit",
  realestate: "luxury real estate modern house interior architecture",
  clinic: "modern medical clinic doctor hospital healthcare",
  skin_clinic: "skin care clinic dermatology aesthetics facial treatment",
  coaching: "education classroom mentorship training",
  institute: "university campus college students learning",
  consultant: "business meeting strategy consulting professional",
  custom: "professional business office workspace",
};

/**
 * Fetches high-quality landscape images from Unsplash for a given category.
 * Supports "refreshing" to get totally new images on every call.
 *
 * @param {string} category - The selected business category (e.g., 'ielts', 'gym')
 * @param {Object} options - { refresh: boolean, section: string, per_page: number }
 * @returns {Promise<string[]>} - Array of optimized image URLs
 */
export const fetchCategoryImages = async (category, options = {}) => {
  const { refresh = false, per_page = 20 } = options;
  const baseQuery = CATEGORY_QUERY_MAP[category] || CATEGORY_QUERY_MAP.custom;

  const cacheKey = `${category}_${options.section || "default"}`;

  // Only return cache if we AREN'T explicitly refreshing
  if (!refresh && imageCache[cacheKey]) {
    console.log(`[ImageService] Returning cached images for: ${cacheKey}`);
    return imageCache[cacheKey];
  }

  // To ensure variety, we pick a random page (1 to 5)
  const randomPage = refresh ? Math.floor(Math.random() * 5) + 1 : 1;

  console.log(
    `[ImageService] Fetching ${refresh ? "FRESH" : "NEW"} images for: ${baseQuery} (Page: ${randomPage})`,
  );

  try {
    if (
      !UNSPLASH_ACCESS_KEY ||
      UNSPLASH_ACCESS_KEY === "PASTE_YOUR_UNSPLASH_ACCESS_KEY_HERE"
    ) {
      throw new Error(
        "Missing Unsplash API Key. Please update .env.local with your real Access Key.",
      );
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(baseQuery)}&orientation=landscape&per_page=${per_page}&page=${randomPage}&client_id=${UNSPLASH_ACCESS_KEY}`,
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.errors
          ? errorData.errors[0]
          : `HTTP Error ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error(`No images found for query: ${baseQuery}`);
    }

    // Extract raw URLs and apply performance optimizations
    const imageUrls = data.results.map((photo) => {
      const rawUrl = photo.urls.raw;
      // Parameters: w=1600 (HD), q=80 (Quality), fit=crop, auto=format
      return `${rawUrl}&w=1600&q=80&fit=crop&auto=format`;
    });

    // Shuffle the array to ensure variety
    const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);

    // Store in memory cache
    imageCache[cacheKey] = shuffledImages;

    return shuffledImages;
  } catch (error) {
    console.error("[ImageService] Error fetching images:", error.message);
    throw error;
  }
};

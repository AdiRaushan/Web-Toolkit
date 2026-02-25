/**
 * Fetch a hero image and grid images related to a specific niche/keyword
 * completely free without an API key by proxying Unsplash's public UI Search API.
 *
 * @param {string} niche - The business niche or keyword (e.g. "gym", "dentist", "coaching")
 * @returns {Promise<{heroImage: string, gridImages: string[]}>}
 */
export const fetchNicheImages = async (niche) => {
  try {
    const query = niche || "business office";
    // We use Unsplash's own frontend API so we don't need a token
    const unsplashUrl = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`;

    // Pass through a CORS proxy to bypass browser restrictions
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(unsplashUrl)}`;

    const response = await fetch(proxyUrl, {
      method: "GET",
      // Add a slight timeout to prevent hanging forever
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Unsplash Proxy API error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.results || data.results.length === 0) {
      throw new Error("No images found for this category.");
    }

    // Extract the raw image URLs and append our own resizing params for performance + quality
    const images = data.results.map((photo) => {
      const baseRaw = photo.urls.raw;
      // Force 1080p width at 80% quality
      return `${baseRaw}&w=1600&q=80&fit=crop&auto=format`;
    });

    return {
      heroImage: images[0] || "",
      gridImages: images.slice(1, 5), // Return 4 images for the grid
    };
  } catch (err) {
    console.error("Unsplash Free Image Fetch Error:", err);
    throw err;
  }
};

/**
 * colorExtractor.js
 * Extracts dominant/primary brand color from a website's HTML/CSS.
 * Uses inline styles, meta theme-color, and common CSS patterns.
 */

/**
 * Map a hex color to the closest supported theme color name.
 * Supported: red, blue, emerald, orange
 * @param {string} hex - Hex color string (e.g., "#ff0000")
 * @returns {string} Closest theme color name
 */
const mapToThemeColor = (hex) => {
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
 */
const extractHexColors = (html) => {
  if (!html) return [];
  const hexRegex = /#([0-9a-fA-F]{6})\b/g;
  const matches = html.match(hexRegex) || [];
  // Filter out common non-brand colors (white, black, grays)
  return matches.filter((color) => {
    const upper = color.toUpperCase();
    return (
      upper !== "#FFFFFF" &&
      upper !== "#000000" &&
      upper !== "#F5F5F5" &&
      upper !== "#333333" &&
      upper !== "#666666" &&
      upper !== "#999999" &&
      upper !== "#CCCCCC" &&
      upper !== "#EEEEEE"
    );
  });
};

/**
 * Extract the primary brand color from website HTML.
 * Checks: meta theme-color, inline styles, CSS variables.
 * @param {string} html - Raw HTML content
 * @returns {{ hex: string|null, themeColor: string }}
 */
export const extractPrimaryColor = (html) => {
  if (!html) return { hex: null, themeColor: "red" };

  // 1. Check for meta theme-color
  const metaMatch = html.match(
    /<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i,
  );
  if (metaMatch && metaMatch[1]) {
    return {
      hex: metaMatch[1],
      themeColor: mapToThemeColor(metaMatch[1]),
    };
  }

  // 2. Gather all hex colors from the page
  const colors = extractHexColors(html);

  if (colors.length === 0) {
    return { hex: null, themeColor: "red" };
  }

  // 3. Find the most frequently used color — likely the brand color
  const frequency = {};
  for (const color of colors) {
    const upper = color.toUpperCase();
    frequency[upper] = (frequency[upper] || 0) + 1;
  }

  const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
  const topColor = sorted[0][0];

  return {
    hex: topColor,
    themeColor: mapToThemeColor(topColor),
  };
};

export default extractPrimaryColor;

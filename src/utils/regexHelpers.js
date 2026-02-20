/**
 * regexHelpers.js
 * Utility functions for extracting structured data from raw HTML/text
 * using regular expressions.
 */

/**
 * Extract all phone numbers from text.
 * Supports formats: +1 555-0123, (02) 9876 5432, 9319933553, +91 98765 43210
 * @param {string} text - Raw text to search
 * @returns {string[]} Array of found phone numbers
 */
export const extractPhones = (text) => {
  if (!text) return [];
  const phoneRegex =
    /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{3,5}/g;
  const matches = text.match(phoneRegex) || [];
  // Filter out matches that are too short (likely false positives like years)
  return matches.filter((m) => m.replace(/\D/g, "").length >= 7);
};

/**
 * Extract all email addresses from text.
 * @param {string} text - Raw text to search
 * @returns {string[]} Array of found emails
 */
export const extractEmails = (text) => {
  if (!text) return [];
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(emailRegex) || [];
};

/**
 * Extract potential addresses from text.
 * Looks for patterns containing street/road/avenue/sector keywords.
 * @param {string} text - Raw text to search
 * @returns {string|null} First detected address or null
 */
export const extractAddress = (text) => {
  if (!text) return null;
  // Look for common address patterns
  const addressPatterns = [
    /\d{1,5}\s[\w\s]+(?:street|st|road|rd|avenue|ave|blvd|dr|lane|ln|way|sector|sec|block|plot|floor|building|bldg|suite|ste|plaza|tower)[,.\s][\w\s,.-]+/gi,
    /(?:sector|sec)\s*[-]?\s*\d{1,3}[,.\s]+[\w\s,.-]+/gi,
    /[\w\s]+,\s*[\w\s]+,\s*[\w\s]+\s+\d{5,6}/g, // City, State, ZIP pattern
  ];

  for (const pattern of addressPatterns) {
    const match = text.match(pattern);
    if (match && match[0]) {
      // Clean up the match — trim and limit length
      return match[0].trim().substring(0, 120);
    }
  }
  return null;
};

/**
 * Extract the first meaningful image URL from HTML text.
 * Skips tiny icons and tracking pixels.
 * @param {string} html - Raw HTML string
 * @returns {string|null} First image URL or null
 */
export const extractFirstImage = (html) => {
  if (!html) return null;
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    // Skip tracking pixels, icons, and tiny images
    if (
      src.includes("1x1") ||
      src.includes("pixel") ||
      src.includes("spacer") ||
      src.includes(".ico") ||
      src.includes("data:image")
    ) {
      continue;
    }
    return src;
  }
  return null;
};

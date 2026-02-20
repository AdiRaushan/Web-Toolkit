/**
 * scrapeService.js
 * Fetches and parses a website's HTML to extract structured business data.
 * Uses a CORS proxy for client-side fetching, with graceful fallback.
 */

import {
  extractPhones,
  extractEmails,
  extractAddress,
  extractFirstImage,
} from "../utils/regexHelpers";
import { classifyNiche } from "../utils/keywordClassifier";
import { extractPrimaryColor } from "../utils/colorExtractor";

// List of free CORS proxy services (fallback chain)
const CORS_PROXIES = [
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
  "https://api.codetabs.com/v1/proxy?quest=",
];

/**
 * Attempt to fetch HTML through CORS proxies.
 * @param {string} url - Target website URL
 * @returns {Promise<string>} Raw HTML string
 */
const fetchHTML = async (url) => {
  // Ensure URL has protocol
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  for (const proxy of CORS_PROXIES) {
    try {
      const response = await fetch(
        `${proxy}${encodeURIComponent(normalizedUrl)}`,
        {
          signal: AbortSignal.timeout(10000), // 10 second timeout
        },
      );
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
 */
const extractLogo = (html, baseUrl) => {
  // Try to find apple-touch-icon or og:image first (usually higher quality)
  const ogImage = html.match(
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
  );
  if (ogImage && ogImage[1]) return resolveUrl(ogImage[1], baseUrl);

  // Look for apple-touch-icon
  const appleTouchIcon = html.match(
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i,
  );
  if (appleTouchIcon && appleTouchIcon[1])
    return resolveUrl(appleTouchIcon[1], baseUrl);

  // Fallback to favicon
  const favicon = html.match(
    /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i,
  );
  if (favicon && favicon[1]) return resolveUrl(favicon[1], baseUrl);

  // Ultimate fallback: Google favicon service
  return `https://www.google.com/s2/favicons?domain=${baseUrl}&sz=128`;
};

/**
 * Resolve relative URL to absolute URL.
 * @param {string} path - Relative or absolute URL
 * @param {string} base - Base URL
 * @returns {string} Absolute URL
 */
const resolveUrl = (path, base) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("//")) return `https:${path}`;
  try {
    return new URL(path, base).href;
  } catch {
    return path;
  }
};

/**
 * Extract the page title from HTML.
 * @param {string} html - Raw HTML
 * @returns {string} Page title
 */
const extractTitle = (html) => {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match ? match[1].trim() : "";
};

/**
 * Extract meta description from HTML.
 * @param {string} html - Raw HTML
 * @returns {string} Meta description
 */
const extractMetaDescription = (html) => {
  const match = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i,
  );
  return match ? match[1].trim() : "";
};

/**
 * Main function: Fetch and parse a website to extract structured business data.
 * @param {string} url - Website URL to scrape
 * @returns {Promise<Object>} Structured website data
 */
export const fetchWebsiteData = async (url) => {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  // Fetch the raw HTML
  const html = await fetchHTML(url);

  // Extract the visible text content (strip HTML tags)
  const textContent = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Run all extractors
  const title = extractTitle(html);
  const description = extractMetaDescription(html);
  const phones = extractPhones(textContent);
  const emails = extractEmails(textContent);
  const address = extractAddress(textContent);
  const logo = extractLogo(html, normalizedUrl);
  const firstImage = extractFirstImage(html);
  const colorData = extractPrimaryColor(html);
  const nicheData = classifyNiche(textContent);

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
      textLength: textContent.length,
    },
  };
};

export default fetchWebsiteData;

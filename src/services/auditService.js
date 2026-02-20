/**
 * auditService.js
 * Performs a comprehensive website audit on fetched HTML.
 * Checks SEO basics, conversion elements, and mobile readiness.
 * Returns a structured report with scores and suggestions.
 */

/**
 * Run a full audit on raw HTML content.
 * @param {string} html - Raw HTML of the website
 * @param {string} url - The website URL (for HTTPS check)
 * @returns {Object} Complete audit report
 */
export const runAudit = (html, url) => {
  const issues = [];
  const suggestions = [];
  let score = 100;

  // =============================================
  // 1. BASIC SEO AUDIT
  // =============================================

  // HTTPS check
  const isHttps = url.startsWith("https://");
  if (!isHttps) {
    issues.push({ type: "security", label: "Website is not using HTTPS" });
    suggestions.push("Enable SSL certificate for your domain to use HTTPS.");
    score -= 10;
  }

  // Title tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const hasTitle = !!titleMatch && titleMatch[1].trim().length > 0;
  if (!hasTitle) {
    issues.push({ type: "seo", label: "Missing or empty <title> tag" });
    suggestions.push("Add a descriptive <title> tag (50-60 characters).");
    score -= 10;
  } else if (titleMatch[1].trim().length > 70) {
    issues.push({ type: "seo", label: "Title tag is too long (>70 chars)" });
    suggestions.push("Shorten your title to 50-60 characters for best SEO.");
    score -= 3;
  }

  // Meta description
  const metaDescMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i,
  );
  const hasMetaDesc = !!metaDescMatch && metaDescMatch[1].trim().length > 0;
  if (!hasMetaDesc) {
    issues.push({ type: "seo", label: "Missing meta description" });
    suggestions.push("Add a compelling meta description (120-160 characters).");
    score -= 10;
  }

  // H1 tag
  const h1Match = html.match(/<h1[^>]*>/i);
  const hasH1 = !!h1Match;
  if (!hasH1) {
    issues.push({ type: "seo", label: "No <h1> heading found" });
    suggestions.push("Add a single <h1> tag with your main page keyword.");
    score -= 8;
  }

  // Multiple H1 check
  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  if (h1Count > 1) {
    issues.push({ type: "seo", label: `Multiple H1 tags found (${h1Count})` });
    suggestions.push(
      "Use only one <h1> per page for proper heading hierarchy.",
    );
    score -= 5;
  }

  // Images missing alt text
  const allImages = html.match(/<img[^>]*>/gi) || [];
  const imagesWithoutAlt = allImages.filter(
    (img) => !img.match(/alt=["'][^"']+["']/i),
  );
  if (imagesWithoutAlt.length > 0) {
    issues.push({
      type: "seo",
      label: `${imagesWithoutAlt.length} image(s) missing alt text`,
    });
    suggestions.push(
      "Add descriptive alt attributes to all images for accessibility and SEO.",
    );
    score -= Math.min(imagesWithoutAlt.length * 2, 10);
  }

  // Mobile viewport meta
  const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(html);
  if (!hasViewport) {
    issues.push({ type: "mobile", label: "Missing mobile viewport meta tag" });
    suggestions.push(
      'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to <head>.',
    );
    score -= 10;
  }

  // =============================================
  // 2. CONVERSION AUDIT
  // =============================================

  // CTA button detection
  const ctaPatterns = [
    /(?:buy|order|book|sign\s*up|register|get\s*started|contact|call|download|subscribe|join|apply|enroll|enrol|start)/i,
  ];
  const buttons = html.match(/<button[^>]*>[\s\S]*?<\/button>/gi) || [];
  const links = html.match(/<a[^>]*>[\s\S]*?<\/a>/gi) || [];
  const allClickables = [...buttons, ...links];
  const hasCTA = allClickables.some((el) =>
    ctaPatterns.some((pattern) => pattern.test(el)),
  );
  if (!hasCTA) {
    issues.push({ type: "conversion", label: "No clear CTA button found" });
    suggestions.push(
      "Add a prominent Call-to-Action button (e.g., 'Book Now', 'Get Started').",
    );
    score -= 8;
  }

  // Contact form detection
  const hasForm = /<form[^>]*>/i.test(html);
  const hasInputFields =
    (html.match(/<input[^>]*type=["'](?:text|email|tel|number)["']/gi) || [])
      .length >= 2;
  const hasContactForm = hasForm && hasInputFields;
  if (!hasContactForm) {
    issues.push({ type: "conversion", label: "No contact form detected" });
    suggestions.push("Add a contact/lead form to capture visitor information.");
    score -= 7;
  }

  // Phone clickable (tel: link)
  const hasClickablePhone = /href=["']tel:/i.test(html);
  if (!hasClickablePhone) {
    issues.push({ type: "conversion", label: "Phone number is not clickable" });
    suggestions.push(
      'Wrap phone numbers in <a href="tel:+1234567890"> for mobile users.',
    );
    score -= 5;
  }

  // =============================================
  // 3. ADDITIONAL CHECKS
  // =============================================

  // Favicon
  const hasFavicon = /<link[^>]*rel=["'](?:shortcut )?icon["']/i.test(html);
  if (!hasFavicon) {
    issues.push({ type: "branding", label: "No favicon detected" });
    suggestions.push("Add a favicon for brand recognition in browser tabs.");
    score -= 3;
  }

  // Open Graph tags
  const hasOG = /<meta[^>]*property=["']og:/i.test(html);
  if (!hasOG) {
    issues.push({ type: "social", label: "Missing Open Graph tags" });
    suggestions.push(
      "Add og:title, og:description, og:image for better social media sharing.",
    );
    score -= 5;
  }

  // Language attribute
  const hasLang = /<html[^>]*lang=["']/i.test(html);
  if (!hasLang) {
    issues.push({
      type: "accessibility",
      label: "Missing lang attribute on <html>",
    });
    suggestions.push(
      'Add lang="en" (or appropriate language) to the <html> tag.',
    );
    score -= 3;
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  // Build structured results
  return {
    score,
    totalIssues: issues.length,
    grade: getGrade(score),
    basic: {
      https: isHttps,
      title: hasTitle,
      titleText: titleMatch ? titleMatch[1].trim() : "",
      metaDescription: hasMetaDesc,
      metaDescText: metaDescMatch ? metaDescMatch[1].trim() : "",
      h1Present: hasH1,
      h1Count,
      imagesTotal: allImages.length,
      imagesMissingAlt: imagesWithoutAlt.length,
      viewport: hasViewport,
    },
    conversion: {
      ctaFound: hasCTA,
      contactForm: hasContactForm,
      clickablePhone: hasClickablePhone,
    },
    extra: {
      favicon: hasFavicon,
      openGraph: hasOG,
      langAttribute: hasLang,
    },
    issues,
    suggestions,
  };
};

/**
 * Get a letter grade based on score.
 * @param {number} score - Numeric score 0-100
 * @returns {string} Letter grade
 */
const getGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 50) return "D";
  return "F";
};

export default runAudit;

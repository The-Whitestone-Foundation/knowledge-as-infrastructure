import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  // Highlights fenced code blocks at build time (Prism, no client-side JS).
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addFilter("readableDate", (value, format = "dd LLL yyyy") => {
    const date = toDate(value);
    if (!date) return "";
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(format);
  });
  eleventyConfig.addFilter("htmlDateString", (value) => {
    const date = toDate(value);
    if (!date) return "";
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });
  eleventyConfig.addFilter("isoDate", (value) => {
    const date = toDate(value) || new Date();
    return DateTime.fromJSDate(date, { zone: "utc" }).toUTC().toISO();
  });
  eleventyConfig.addFilter("currentYear", () => DateTime.now().toFormat("yyyy"));
  eleventyConfig.addFilter("yearDate", (value) => {
    const date = toDate(value);
    if (!date) return "";
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat("yyyy");
  });
  eleventyConfig.addFilter("slugify", (value) => String(value || "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"));
  eleventyConfig.addFilter("absoluteUrl", (url, base = "http://localhost:8080") => {
    if (!url) return base;
    return new URL(url, base).toString();
  });
  eleventyConfig.addFilter("buttonUrl", (buttons, name = "") => {
    if (!Array.isArray(buttons)) return "";
    const target = String(name).trim().toLowerCase();
    if (!target) return "";
    const match = buttons.find((button) => String(button?.name || "").trim().toLowerCase() === target);
    return match?.url || "";
  });
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/posts/*.{md,njk,html}")
      .filter((item) => item.data.draft !== true)
      .sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tags = new Set();
    for (const item of collectionApi.getFilteredByGlob("src/posts/*.{md,njk,html}")) {
      for (const tag of item.data.tags || []) {
        if (["all", "posts"].includes(tag)) continue;
        tags.add(tag);
      }
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  });
  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" }
  };
}

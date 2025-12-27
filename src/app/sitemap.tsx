import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aashirsiddiqui.vercel.app";
  const lastModified = new Date();

  // For single-page portfolio, only include main URL
  // Hash links (#about, #skills, etc.) are NOT crawlable by search engines
  // Google ignores everything after the # symbol

  return [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}

// ============================================
// NOTE: If you add separate pages in future:
// ============================================
//
// {
//   url: `${baseUrl}/blog`,
//   lastModified: new Date(),
//   changeFrequency: "daily",
//   priority: 0.9,
// },
// {
//   url: `${baseUrl}/projects/medivault-ai`,
//   lastModified: new Date(),
//   changeFrequency: "monthly",
//   priority: 0.8,
// },

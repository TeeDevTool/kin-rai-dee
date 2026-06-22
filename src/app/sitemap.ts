import type { MetadataRoute } from "next";

const BASE_URL = "https://www.kinraidee.info";
const LOCALES = ["th", "en"] as const;

type RouteDef = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

// Path is appended after the locale prefix. "" = locale home.
const ROUTES: RouteDef[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy-policies", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      // Slightly favour the Thai (default) locale in priority.
      priority: locale === "th" ? route.priority : route.priority - 0.1,
      alternates: {
        languages: {
          th: `${BASE_URL}/th${route.path}`,
          en: `${BASE_URL}/en${route.path}`,
        },
      },
    })),
  );
}

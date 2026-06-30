import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllArticles, getAllCategories, getAllTags } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/blog", "/about", "/categories", "/tags", "/search"].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: now
    })
  );

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${siteConfig.url}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt)
  }));

  const categoryRoutes = getAllCategories().map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: now
  }));

  const tagRoutes = getAllTags().map((tag) => ({
    url: `${siteConfig.url}/tags/${tag.slug}`,
    lastModified: now
  }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes, ...tagRoutes];
}

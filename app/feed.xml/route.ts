import { siteConfig } from "@/config/site";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const articles = getAllArticles();
  const items = articles
    .map(
      (article) => `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${siteConfig.url}/blog/${article.slug}</link>
          <guid>${siteConfig.url}/blog/${article.slug}</guid>
          <description>${escapeXml(article.description)}</description>
          <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
        </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.title)}</title>
        <link>${siteConfig.url}</link>
        <description>${escapeXml(siteConfig.description)}</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article, ArticleFrontmatter, TocItem } from "@/types/article";
import { slugify } from "@/lib/utils";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function extractToc(body: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(body)) !== null) {
    const title = match[2].replace(/<[^>]*>/g, "").trim();
    items.push({
      id: slugify(title),
      title,
      level: match[1].length
    });
  }

  return items;
}

function normalizeArticle(fileName: string): Article {
  const fullPath = path.join(articlesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as ArticleFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    body: content,
    readingTime: frontmatter.readingTime ?? stats.text,
    wordCount: content.split(/\s+/).filter(Boolean).length,
    toc: extractToc(content)
  };
}

export function getAllArticles({ includeDrafts = false } = {}) {
  if (!fs.existsSync(articlesDirectory)) return [];

  return fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(normalizeArticle)
    .filter((article) => includeDrafts || !article.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getFeaturedArticle() {
  return getAllArticles().find((article) => article.featured) ?? getAllArticles()[0];
}

export function getAllCategories() {
  const counts = new Map<string, number>();

  for (const article of getAllArticles()) {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count, slug: slugify(name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllTags() {
  const counts = new Map<string, number>();

  for (const article of getAllArticles()) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count, slug: slugify(name) }))
    .sort((a, b) => b.count - a.count);
}

export function getArticlesByCategory(categorySlug: string) {
  return getAllArticles().filter(
    (article) => slugify(article.category) === categorySlug
  );
}

export function getArticlesByTag(tagSlug: string) {
  return getAllArticles().filter((article) =>
    article.tags.some((tag) => slugify(tag) === tagSlug)
  );
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getAllArticles()
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({
      article: item,
      score:
        (item.category === article.category ? 3 : 0) +
        item.tags.filter((tag) => article.tags.includes(tag)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);
}

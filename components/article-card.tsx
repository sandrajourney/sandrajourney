"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bookmark, Clock } from "lucide-react";
import type { Article } from "@/types/article";
import { formatDate, slugify } from "@/lib/utils";
import { useBookmarks } from "@/hooks/use-bookmarks";

export function ArticleCard({
  article,
  priority = false
}: {
  article: Article;
  priority?: boolean;
}) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-soft"
    >
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-accent">
          <Link href={`/categories/${slugify(article.category)}`}>
            {article.category}
          </Link>
          <button
            type="button"
            aria-label="Bookmark article"
            onClick={() => toggleBookmark(article.slug)}
            className="rounded-full p-2 text-muted transition hover:bg-background hover:text-accent"
          >
            <Bookmark
              size={17}
              fill={isBookmarked(article.slug) ? "currentColor" : "none"}
            />
          </button>
        </div>
        <Link href={`/blog/${article.slug}`}>
          <h3 className="mt-4 font-serif text-2xl leading-tight">
            {article.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">
            {article.description}
          </p>
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span>{article.author}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} />
            {article.readingTime}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

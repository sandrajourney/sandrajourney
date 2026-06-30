"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";

export function SearchClient({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;

    return articles.filter((article) =>
      [
        article.title,
        article.description,
        article.category,
        article.tags.join(" "),
        article.body
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [articles, query]);

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted" size={19} />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title, content, tags, categories..."
          className="h-14 w-full rounded-full border border-border bg-card pl-12 pr-5 text-base outline-none transition focus:border-accent"
        />
      </div>
      <div className="mt-8 grid gap-4">
        {results.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="rounded-lg border border-border bg-card p-5 transition hover:border-accent"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              {article.category}
            </p>
            <h2 className="mt-3 font-serif text-2xl">{article.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              {article.description}
            </p>
            <p className="mt-4 text-xs text-muted">
              {formatDate(article.publishedAt)} / {article.readingTime}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

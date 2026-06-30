import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero } from "@/components/hero";
import { ArticleCard } from "@/components/article-card";
import { Newsletter } from "@/components/newsletter";
import { RandomQuote } from "@/components/random-quote";
import { ReadingStats } from "@/components/reading-stats";
import { SectionHeading } from "@/components/section-heading";
import {
  getAllArticles,
  getAllCategories,
  getAllTags,
  getFeaturedArticle
} from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle();
  const latest = articles.slice(0, 3);
  const popular = [...articles]
    .sort((a, b) => b.wordCount - a.wordCount)
    .slice(0, 3);
  const categories = getAllCategories();
  const tags = getAllTags().slice(0, 18);

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {featured ? (
          <section id="featured" className="py-20">
            <SectionHeading
              eyebrow="Featured Article"
              title="Begin with the piece that carries the room."
              description="A selected essay or tutorial to set the tone before visitors wander deeper into the archive."
            />
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <ArticleCard article={featured} priority />
              <div className="rounded-lg border border-border bg-card p-8">
                <Sparkles className="text-accent" size={24} />
                <h3 className="mt-5 font-serif text-4xl leading-tight">
                  A calm, generous archive for long-form reading.
                </h3>
                <p className="mt-5 leading-8 text-muted">
                  This site is designed like a digital reading room: quiet
                  navigation, warm surfaces, careful typography, and enough
                  space for ideas to breathe.
                </p>
                <Link
                  href="/blog"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                >
                  Explore all writing
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        <section className="py-12">
          <SectionHeading eyebrow="Latest Articles" title="Recently published" />
          <div className="grid gap-6 md:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section className="py-12">
          <SectionHeading eyebrow="Popular Articles" title="Long reads worth saving" />
          <div className="grid gap-6 md:grid-cols-3">
            {popular.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Categories" title="Rooms in the archive" />
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="rounded-lg border border-border bg-card p-5 transition hover:border-accent"
                >
                  <p className="font-serif text-2xl">{category.name}</p>
                  <p className="mt-2 text-sm text-muted">
                    {category.count} article{category.count > 1 ? "s" : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Tags" title="Small doors into ideas" />
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <RandomQuote />

        <section className="py-16">
          <SectionHeading eyebrow="Statistics" title="The reading shelf" />
          <ReadingStats articles={articles} />
        </section>

        <section className="py-16">
          <Newsletter />
        </section>
      </div>
    </>
  );
}

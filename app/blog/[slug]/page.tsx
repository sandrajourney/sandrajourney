import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { BackToTop } from "@/components/back-to-top";
import { mdxComponents } from "@/components/mdx-components";
import { ReadingControls } from "@/components/reading-controls";
import { ReadingProgress } from "@/components/reading-progress";
import { RecentlyReadMarker } from "@/components/recently-read-marker";
import { SectionHeading } from "@/components/section-heading";
import { ShareActions } from "@/components/share-actions";
import { TableOfContents } from "@/components/table-of-contents";
import { siteConfig } from "@/config/site";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles
} from "@/lib/articles";
import { formatDate, slugify } from "@/lib/utils";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `/blog/${article.slug}`
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [article.cover]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.cover]
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const { content } = await compileMDX({
    source: article.body,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex, rehypePrism]
      }
    }
  });

  const articles = getAllArticles();
  const currentIndex = articles.findIndex((item) => item.slug === article.slug);
  const previous = articles[currentIndex + 1];
  const next = articles[currentIndex - 1];
  const related = getRelatedArticles(article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.cover,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name
    }
  };

  return (
    <>
      <ReadingProgress />
      <RecentlyReadMarker slug={article.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="mx-auto max-w-5xl px-5 pb-12 pt-16 text-center sm:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
          >
            <ArrowLeft size={16} />
            Back to articles
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            {article.category}
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">
            {article.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-muted">
            {article.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
            <span>{article.author}</span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} />
              Published {formatDate(article.publishedAt)}
            </span>
            <span>Updated {formatDate(article.updatedAt)}</span>
            <span className="inline-flex items-center gap-2">
              <Clock size={16} />
              {article.readingTime}
            </span>
          </div>
          <div className="mt-8 flex justify-center">
            <ShareActions title={article.title} />
          </div>
        </header>

        <figure className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={article.cover}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-muted">
            Cover image selected to support the atmosphere of the article.
          </figcaption>
        </figure>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 xl:grid-cols-[1fr_minmax(0,var(--reader-width,740px))_1fr]">
          <div className="hide-in-focus hidden xl:block" />
          <div className="min-w-0">
            <div className="prose-luxury">{content}</div>

            <div className="mt-12 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slugify(tag)}`}
                  className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-accent"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <section className="mt-16 rounded-lg border border-border bg-card p-7">
              <h2 className="font-serif text-3xl">About the author</h2>
              <p className="mt-4 leading-8 text-muted">{siteConfig.author.bio}</p>
            </section>

            <nav className="mt-10 grid gap-4 md:grid-cols-2">
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="rounded-lg border border-border bg-card p-5 hover:border-accent"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    Previous
                  </span>
                  <p className="mt-3 font-serif text-2xl">{previous.title}</p>
                </Link>
              ) : <div />}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="rounded-lg border border-border bg-card p-5 text-right hover:border-accent"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    Next
                  </span>
                  <p className="mt-3 font-serif text-2xl">{next.title}</p>
                </Link>
              ) : null}
            </nav>

            <section className="mt-16 rounded-lg border border-dashed border-border p-8 text-center">
              <h2 className="font-serif text-3xl">Comments</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                A comment system can be connected here with Giscus, Supabase,
                Firebase, or another provider when the site is ready to publish.
              </p>
            </section>
          </div>
          <TableOfContents items={article.toc} />
        </div>
      </article>

      {related.length ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <SectionHeading eyebrow="Related Articles" title="Read next" />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}

      <ReadingControls />
      <BackToTop />
    </>
  );
}

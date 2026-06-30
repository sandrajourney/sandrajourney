import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllTags, getArticlesByTag } from "@/lib/articles";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

type TagPageProps = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const tag = getAllTags().find((item) => item.slug === tagSlug);
  return {
    title: tag?.name ?? "Tag",
    description: `Articles tagged ${tag?.name ?? "tag"}.`
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const tag = getAllTags().find((item) => item.slug === tagSlug);
  const articles = getArticlesByTag(tagSlug);

  if (!tag) notFound();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Tag"
        title={tag.name}
        description={`${articles.length} article${articles.length > 1 ? "s" : ""} with this tag.`}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

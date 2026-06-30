import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Essays, tutorials, stories, journals, and personal notes."
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Archive"
        title="Articles for quiet hours"
        description="Browse essays, tutorials, opinions, stories, journals, and notes collected in one calm place."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard key={article.slug} article={article} priority={index < 3} />
        ))}
      </div>
    </div>
  );
}

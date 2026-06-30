import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllCategories, getArticlesByCategory } from "@/lib/articles";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }));
}

type CategoryPageProps = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getAllCategories().find((item) => item.slug === categorySlug);
  return {
    title: category?.name ?? "Category",
    description: `Articles in ${category?.name ?? "this category"}.`
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getAllCategories().find((item) => item.slug === categorySlug);
  const articles = getArticlesByCategory(categorySlug);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Category"
        title={category.name}
        description={`${articles.length} article${articles.length > 1 ? "s" : ""} in this category.`}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { getAllCategories } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse articles by category."
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Categories"
        title="Every room has a subject"
        description="Move through the archive by theme and mood."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="rounded-lg border border-border bg-card p-6 transition hover:border-accent"
          >
            <h2 className="font-serif text-3xl">{category.name}</h2>
            <p className="mt-3 text-sm text-muted">{category.count} articles</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

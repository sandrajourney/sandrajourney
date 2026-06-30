import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { getAllTags } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Tags",
  description: "Clickable tags for the writing archive."
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Tags"
        title="The small index"
        description="Tags connect related thoughts across categories."
      />
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="rounded-full border border-border bg-card px-5 py-3 text-sm text-muted transition hover:border-accent hover:text-accent"
          >
            {tag.name} <span className="text-xs">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

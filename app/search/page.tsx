import type { Metadata } from "next";
import { SearchClient } from "@/components/search-client";
import { SectionHeading } from "@/components/section-heading";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles by title, content, tags, categories, and description."
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Search"
        title="Find a thought quickly"
        description="Instant search across titles, descriptions, article content, categories, and tags."
      />
      <SearchClient articles={getAllArticles()} />
    </div>
  );
}

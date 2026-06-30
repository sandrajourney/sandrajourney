import type { Article } from "@/types/article";

export function ReadingStats({ articles }: { articles: Article[] }) {
  const words = articles.reduce((total, article) => total + article.wordCount, 0);
  const categories = new Set(articles.map((article) => article.category)).size;

  const stats = [
    { label: "Published pieces", value: articles.length },
    { label: "Words archived", value: words.toLocaleString("en") },
    { label: "Categories", value: categories },
    { label: "Reading hours", value: Math.max(1, Math.round(words / 220 / 60)) }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div key={item.label} className="rounded-lg border border-border bg-card p-6">
          <p className="font-serif text-4xl">{item.value}</p>
          <p className="mt-2 text-sm text-muted">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

import Link from "next/link";
import { Rss } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-28 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="font-serif text-2xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
            {siteConfig.description} Built as a calm archive for essays,
            tutorials, journals, stories, and slow thinking.
          </p>
        </div>
        <div className="flex flex-wrap items-start justify-start gap-3 md:justify-end">
          <Link href="/feed.xml" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-accent">
            <Rss size={16} />
            RSS
          </Link>
          <Link href="/about" className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-accent">
            About
          </Link>
          <Link href="/search" className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-accent">
            Search
          </Link>
        </div>
      </div>
    </footer>
  );
}

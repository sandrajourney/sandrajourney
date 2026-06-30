"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/types/article";
import { cn } from "@/lib/utils";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="hide-in-focus sticky top-28 hidden max-h-[70vh] overflow-auto xl:block">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        Contents
      </p>
      <nav className="grid gap-2 border-l border-border pl-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "text-sm leading-6 text-muted transition hover:text-accent",
              item.level === 3 && "pl-4 text-xs",
              activeId === item.id && "text-accent"
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

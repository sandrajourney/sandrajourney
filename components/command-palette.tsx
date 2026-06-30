"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const staticItems = [
  ...siteConfig.nav,
  { label: "Search", href: "/search" },
  { label: "RSS Feed", href: "/feed.xml" }
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const openPalette = () => setOpen(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("open-command-palette", openPalette);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("open-command-palette", openPalette);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const items = useMemo(() => {
    const q = query.toLowerCase();
    return staticItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-foreground/20 px-4 pt-24 backdrop-blur-sm">
      <div className="mx-auto max-w-xl overflow-hidden rounded-lg border border-border bg-card shadow-soft">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={18} className="text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search commands..."
            className="h-14 flex-1 bg-transparent text-sm outline-none"
          />
          <button
            type="button"
            aria-label="Close command palette"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-muted hover:bg-background hover:text-accent"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-4 py-3 text-sm text-muted hover:bg-background hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

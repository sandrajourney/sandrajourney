"use client";

import { useEffect } from "react";

const key = "writing-room-recently-read";

export function useRecentlyRead(slug: string) {
  useEffect(() => {
    const current = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
    const next = [slug, ...current.filter((item) => item !== slug)].slice(0, 12);
    localStorage.setItem(key, JSON.stringify(next));
  }, [slug]);
}

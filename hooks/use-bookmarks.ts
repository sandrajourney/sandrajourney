"use client";

import { useEffect, useState } from "react";

const key = "writing-room-bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    setBookmarks(JSON.parse(localStorage.getItem(key) ?? "[]"));
  }, []);

  function persist(next: string[]) {
    setBookmarks(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  return {
    bookmarks,
    isBookmarked: (slug: string) => bookmarks.includes(slug),
    toggleBookmark: (slug: string) => {
      persist(
        bookmarks.includes(slug)
          ? bookmarks.filter((item) => item !== slug)
          : [...bookmarks, slug]
      );
    }
  };
}

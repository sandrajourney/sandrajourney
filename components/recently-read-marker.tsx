"use client";

import { useRecentlyRead } from "@/hooks/use-recently-read";

export function RecentlyReadMarker({ slug }: { slug: string }) {
  useRecentlyRead(slug);
  return null;
}

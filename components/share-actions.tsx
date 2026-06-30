"use client";

import { Copy, Printer, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
    } else {
      await copyLink();
    }
  }

  return (
    <div className="no-print flex flex-wrap gap-2">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
      >
        <Share2 size={16} />
        Share
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
      >
        <Copy size={16} />
        {copied ? "Copied" : "Copy"}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
      >
        <Printer size={16} />
        Print
      </button>
    </div>
  );
}

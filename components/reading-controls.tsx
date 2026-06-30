"use client";

import { AlignJustify, Focus, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function ReadingControls() {
  const [fontSize, setFontSize] = useState(19);
  const [width, setWidth] = useState(740);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--reader-font-size",
      `${fontSize}px`
    );
  }, [fontSize]);

  useEffect(() => {
    document.body.classList.toggle("focus-reading", focus);
    return () => document.body.classList.remove("focus-reading");
  }, [focus]);

  return (
    <div className="no-print hide-in-focus fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card/88 p-1 shadow-soft backdrop-blur-xl">
      <button
        type="button"
        aria-label="Decrease font size"
        onClick={() => setFontSize((value) => Math.max(17, value - 1))}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-background hover:text-accent"
      >
        <Minus size={16} />
      </button>
      <button
        type="button"
        aria-label="Increase font size"
        onClick={() => setFontSize((value) => Math.min(23, value + 1))}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-background hover:text-accent"
      >
        <Plus size={16} />
      </button>
      <button
        type="button"
        aria-label="Adjust reading width"
        onClick={() => setWidth((value) => (value === 740 ? 860 : 740))}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-background hover:text-accent"
      >
        <AlignJustify size={16} />
      </button>
      <button
        type="button"
        aria-label="Toggle focus reading"
        onClick={() => setFocus((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-background hover:text-accent"
      >
        <Focus size={16} />
      </button>
      <style jsx global>{`
        :root {
          --reader-width: ${width}px;
        }
      `}</style>
    </div>
  );
}

import Image from "next/image";
import type { HTMLAttributes, ReactNode } from "react";
import { Info, Lightbulb, Quote } from "lucide-react";
import { slugify } from "@/lib/utils";

export const mdxComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={slugify(String(props.children))} {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={slugify(String(props.children))} {...props} />
  ),
  Image,
  Callout: ({
    type = "note",
    children
  }: {
    type?: "note" | "idea";
    children: ReactNode;
  }) => (
    <div className="my-8 rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
        {type === "idea" ? <Lightbulb size={17} /> : <Info size={17} />}
        {type === "idea" ? "Idea" : "Note"}
      </div>
      <div className="text-muted">{children}</div>
    </div>
  ),
  PullQuote: ({ children }: { children: ReactNode }) => (
    <blockquote className="relative border-none px-0 py-8 font-serif text-3xl leading-snug text-foreground">
      <Quote className="mb-4 text-accent" size={28} />
      {children}
    </blockquote>
  ),
  YouTube: ({ id, title }: { id: string; title: string }) => (
    <div className="my-10 aspect-video overflow-hidden rounded-lg border border-border">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ),
  AudioNote: ({ src }: { src: string }) => (
    <audio className="my-8 w-full" controls src={src}>
      Your browser does not support the audio element.
    </audio>
  )
};

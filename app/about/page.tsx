import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Mail, Quote, Send } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: "Author profile, skills, journey, favorite books, and contact."
};

const skills = [
  "Writing",
  "Web Development",
  "Cybersecurity Learning",
  "Digital Marketing",
  "Content Creation",
  "Fashion Design"
];

const timeline = [
  ["2024", "Started collecting notes, tutorials, and personal essays."],
  ["2025", "Built a learning rhythm across technology, design, and marketing."],
  ["2026", "Opened this digital reading room as a public archive."]
];

const books = [
  "The Creative Act",
  "Atomic Habits",
  "Steal Like an Artist",
  "The Design of Everyday Things"
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <Image
            src={siteConfig.author.avatar}
            alt={siteConfig.author.name}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            About the author
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">
            {siteConfig.author.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{siteConfig.author.role}</p>
          <p className="mt-7 text-lg leading-9 text-muted">
            {siteConfig.author.bio}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
            >
              <Mail size={16} />
              Contact
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-muted hover:text-accent"
            >
              <Send size={16} />
              Read articles
            </Link>
          </div>
        </div>
      </div>

      <section className="py-16">
        <SectionHeading eyebrow="Skills" title="What this room is built from" />
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-card px-5 py-3 text-sm text-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-8 py-8 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Journey" title="A simple timeline" />
          <div className="grid gap-4">
            {timeline.map(([year, text]) => (
              <div key={year} className="rounded-lg border border-border bg-card p-5">
                <p className="font-serif text-2xl text-accent">{year}</p>
                <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Books" title="Favorite shelves" />
          <div className="grid gap-3">
            {books.map((book) => (
              <div key={book} className="rounded-lg border border-border bg-card p-5">
                {book}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-border bg-card p-8">
        <Quote className="text-accent" size={26} />
        <p className="mt-5 font-serif text-3xl leading-snug">
          Learning is easier when your notes become a place you actually want
          to return to.
        </p>
      </section>
    </div>
  );
}

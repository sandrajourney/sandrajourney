"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden px-5 sm:px-8">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -18, 0], y: [0, 28, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-[20%] h-72 w-72 rounded-full bg-foreground/5 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,transparent_38%,hsl(var(--background))_76%)]" />
        {Array.from({ length: 18 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-accent/40"
            style={{
              left: `${8 + ((index * 47) % 84)}%`,
              top: `${14 + ((index * 31) % 58)}%`
            }}
            animate={{ opacity: [0.2, 0.75, 0.2], y: [0, -16, 0] }}
            transition={{
              duration: 6 + (index % 6),
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center justify-center pb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-accent"
        >
          Essays / Notes / Tutorials / Stories
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl leading-[1.05] sm:text-7xl lg:text-8xl"
        >
          Welcome to SandraJourney
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-7 max-w-2xl text-lg leading-9 text-muted sm:text-xl"
        >
          A place where ideas, stories, curiosity, and knowledge are collected.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            Latest Article
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:border-accent hover:text-accent"
          >
            Explore Articles
          </Link>
        </motion.div>
      </div>
      <a
        href="#featured"
        aria-label="Scroll to featured article"
        className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 animate-bounce rounded-full border border-border bg-card/70 p-3 text-muted backdrop-blur"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  );
}

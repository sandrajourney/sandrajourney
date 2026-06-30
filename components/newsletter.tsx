import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="rounded-lg border border-border bg-card p-8 shadow-sm md:p-10">
      <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
        <div>
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-accent">
            <Mail size={19} />
          </div>
          <h2 className="font-serif text-3xl">Letters for slow readers.</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
            A quiet newsletter for new essays, practical tutorials, and notes
            worth keeping. No noise, no daily pressure.
          </p>
        </div>
        <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="h-12 rounded-full border border-border bg-background px-5 text-sm outline-none transition focus:border-accent"
          />
          <button
            type="button"
            className="h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

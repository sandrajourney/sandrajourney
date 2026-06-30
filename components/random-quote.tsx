const quotes = [
  "The mind is not a vessel to be filled, but a fire to be kindled.",
  "Attention is the beginning of devotion.",
  "What we read with care becomes part of the way we see.",
  "Small notes, kept faithfully, become a second memory."
];

export function RandomQuote() {
  const quote = quotes[new Date().getDate() % quotes.length];

  return (
    <section className="border-y border-border py-14 text-center">
      <p className="mx-auto max-w-3xl font-serif text-3xl leading-snug sm:text-4xl">
        "{quote}"
      </p>
    </section>
  );
}

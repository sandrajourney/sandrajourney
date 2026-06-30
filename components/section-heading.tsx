export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

import Container from "@/components/Container";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-indigo-950 py-16 text-white sm:py-20">
      <Container>
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-400">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-xl text-lg text-stone-300">{description}</p>}
      </Container>
    </section>
  );
}

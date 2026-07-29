import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import Container, { SectionHeading } from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import WovenDivider from "@/components/WovenDivider";
import { getContent } from "@/lib/content";
import { db } from "@/lib/db";
import { formatEventDate } from "@/lib/format";

type Hero = {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  imageUrl?: string;
};

type Stats = { items: { value: string; label: string }[] };
type MissionTeaser = { eyebrow: string; headline: string; body: string };
type Programs = { eyebrow: string; headline: string; items: { title: string; description: string }[] };
type GetInvolvedCta = { headline: string; body: string; ctaLabel: string; ctaHref: string };

export default async function HomePage() {
  const [hero, stats, mission, programs, getInvolvedCta, latestPosts] = await Promise.all([
    getContent<Hero>("home.hero"),
    getContent<Stats>("home.stats"),
    getContent<MissionTeaser>("home.missionTeaser"),
    getContent<Programs>("home.programs"),
    getContent<GetInvolvedCta>("home.getInvolvedCta"),
    db.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-indigo-950 text-stone-50">
        <div className="woven-pattern pointer-events-none absolute inset-0 text-indigo-800 opacity-40" />
        <Container className="relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-400">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-stone-200">{hero.description}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={hero.primaryCtaHref} variant="primary">
                {hero.primaryCtaLabel}
              </Button>
              <Button href={hero.secondaryCtaHref} variant="ghost-light">
                {hero.secondaryCtaLabel}
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-indigo-800 bg-indigo-900 lg:aspect-[4/5]">
            {hero.imageUrl ? (
              <Image src={hero.imageUrl} alt="" fill className="object-cover" priority />
            ) : (
              <div className="woven-pattern flex h-full w-full items-center justify-center text-indigo-600" />
            )}
          </div>
        </Container>
      </section>

      {/* Stats strip */}
      <section className="border-b border-stone-200 bg-stone-50">
        <Container className="grid grid-cols-2 divide-x divide-stone-200 py-8 sm:grid-cols-4">
          {stats.items.map((item) => (
            <div key={item.label} className="px-4 text-center first:pl-0 sm:text-left sm:first:pl-4">
              <p className="font-display text-3xl font-extrabold text-indigo-950">{item.value}</p>
              <p className="mt-1 text-sm text-indigo-900/70">{item.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Mission teaser */}
      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={mission.eyebrow} headline={mission.headline} />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-indigo-900/80">{mission.body}</p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 font-semibold text-clay-600 hover:text-clay-500"
            >
              Read our story <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <WovenDivider className="text-stone-200" />

      {/* Programs preview */}
      <section id="programs" className="bg-stone-100 py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={programs.eyebrow} headline={programs.headline} />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-stone-200 bg-stone-50 p-6">
                  <h3 className="font-display text-lg font-bold text-indigo-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-indigo-900/70">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Latest news */}
      {latestPosts.length > 0 && (
        <section className="py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Stay informed" headline="News & upcoming events" />
              <Link href="/news" className="font-semibold text-clay-600 hover:text-clay-500">
                View all
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="group rounded-2xl border border-stone-200 p-6 transition-colors hover:border-clay-500"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-clay-600">
                    {post.kind === "event" ? <Calendar className="h-3.5 w-3.5" /> : null}
                    {post.kind === "event" ? formatEventDate(post.eventDate) : "News"}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-indigo-950 group-hover:text-clay-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-indigo-900/70">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Get involved CTA */}
      <section className="bg-indigo-950 py-16 text-stone-50">
        <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{getInvolvedCta.headline}</h2>
            <p className="mt-2 max-w-lg text-stone-300">{getInvolvedCta.body}</p>
          </div>
          <Button href={getInvolvedCta.ctaHref} variant="primary">
            {getInvolvedCta.ctaLabel}
          </Button>
        </Container>
      </section>
    </>
  );
}

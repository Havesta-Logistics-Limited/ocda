import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  HandHeart,
  Landmark,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Container, { SectionHeading } from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import NewsletterForm from "@/components/NewsletterForm";
import { getContent } from "@/lib/content";
import { db } from "@/lib/db";
import { formatEventDate } from "@/lib/format";
import { getYouTubeId } from "@/lib/youtube";

type Hero = {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  imageUrl?: string;
  backgroundVideoUrl?: string;
};
type FeatureBar = { items: { title: string; description: string }[] };
type Stats = { items: { value: string; label: string }[] };
type MissionTeaser = { eyebrow: string; headline: string; body: string };
type Programs = {
  eyebrow: string;
  headline: string;
  items: { title: string; description: string; imageUrl?: string }[];
};
type Spotlight = { eyebrow: string; quote: string; name: string; role: string; photoUrl?: string };
type Testimonials = {
  eyebrow: string;
  headline: string;
  items: { quote: string; name: string; role: string; photoUrl?: string }[];
};
type GetInvolvedCta = { headline: string; body: string; ctaLabel: string; ctaHref: string };
type Newsletter = { headline: string; body: string };

const FEATURE_ICONS = [ShieldCheck, Landmark, Sparkles];

export default async function HomePage() {
  const [hero, featureBar, stats, mission, programs, spotlight, testimonials, getInvolvedCta, newsletter, latestPosts] =
    await Promise.all([
      getContent<Hero>("home.hero"),
      getContent<FeatureBar>("home.featureBar"),
      getContent<Stats>("home.stats"),
      getContent<MissionTeaser>("home.missionTeaser"),
      getContent<Programs>("home.programs"),
      getContent<Spotlight>("home.spotlight"),
      getContent<Testimonials>("home.testimonials"),
      getContent<GetInvolvedCta>("home.getInvolvedCta"),
      getContent<Newsletter>("site.newsletter"),
      db.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 }),
    ]);

  const youtubeId = hero.backgroundVideoUrl ? getYouTubeId(hero.backgroundVideoUrl) : null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-indigo-950 pb-28 pt-16 text-white sm:pb-32 sm:pt-24">
        <div className="absolute inset-0 overflow-hidden">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&playsinline=1`}
              title=""
              allow="autoplay; encrypted-media"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[100vh] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 opacity-60"
            />
          ) : hero.backgroundVideoUrl ? (
            <video
              src={hero.backgroundVideoUrl}
              className="h-full w-full object-cover opacity-60"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Photo src={hero.imageUrl} alt="" className="opacity-60" icon={Users} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/70 to-indigo-950/30" />
        </div>

        <Container className="relative max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-400">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-stone-200">{hero.description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={hero.primaryCtaHref} variant="primary" withArrow>
              {hero.primaryCtaLabel}
            </Button>
            <Button href={hero.secondaryCtaHref} variant="ghost-light">
              {hero.secondaryCtaLabel}
            </Button>
          </div>
        </Container>

        {/* Feature bar, overlapping the bottom of the hero */}
        <Container className="relative mt-16 sm:mt-20">
          <div className="grid gap-px overflow-hidden rounded-2xl bg-stone-200 shadow-xl sm:grid-cols-3">
            {featureBar.items.map((item, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <div key={item.title} className="bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/10 text-gold-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-indigo-950">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-indigo-900/60">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Spotlight quote */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal className="grid gap-10 rounded-3xl bg-stone-100 p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg lg:mx-0">
              <Photo src={spotlight.photoUrl} alt={spotlight.name} icon={Users} />
            </div>
            <div>
              <Quote className="h-8 w-8 text-gold-500" />
              <p className="mt-3 max-w-2xl font-display text-xl font-medium leading-snug text-indigo-950 sm:text-2xl">
                {spotlight.quote}
              </p>
              <p className="mt-4 text-sm font-semibold text-indigo-950">
                {spotlight.name} <span className="font-normal text-indigo-900/50">— {spotlight.role}</span>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Stats + about */}
      <section className="py-4 sm:py-8">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal className="grid grid-cols-2 gap-4">
            {stats.items.map((item, i) => (
              <div
                key={item.label}
                className={`rounded-2xl p-6 ${i % 2 === 0 ? "bg-gold-500 text-white" : "bg-indigo-950 text-white"}`}
              >
                <p className="font-display text-3xl font-extrabold sm:text-4xl">{item.value}</p>
                <p className="mt-1.5 text-sm text-white/80">{item.label}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={80}>
            <SectionHeading eyebrow={mission.eyebrow} headline={mission.headline} />
            <p className="mt-5 max-w-xl leading-relaxed text-indigo-900/70">{mission.body}</p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 font-semibold text-gold-600 hover:text-gold-500"
            >
              Discover our story <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 sm:py-24">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={programs.eyebrow} headline={programs.headline} />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 60}>
                <div className="group h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Photo src={item.imageUrl} alt={item.title} icon={HandHeart} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-indigo-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-indigo-900/60">{item.description}</p>
                    <Link
                      href="/about#programs"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 group-hover:text-gold-500"
                    >
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-stone-100 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={testimonials.eyebrow} headline={testimonials.headline} />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.items.map((item, i) => (
              <Reveal key={item.name} delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm">
                  <Quote className="h-6 w-6 text-gold-500" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-indigo-900/80">{item.quote}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                      <Photo src={item.photoUrl} alt={item.name} icon={Users} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-indigo-950">{item.name}</p>
                      <p className="text-xs text-indigo-900/50">{item.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Get involved CTA */}
      <section className="relative overflow-hidden py-24 text-white sm:py-28">
        <div className="absolute inset-0 bg-indigo-950">
          <Photo alt="" icon={HandHeart} className="opacity-30" />
        </div>
        <div className="absolute inset-0 bg-indigo-950/60" />
        <Container className="relative max-w-xl text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{getInvolvedCta.headline}</h2>
          <p className="mt-3 text-stone-200">{getInvolvedCta.body}</p>
          <div className="mt-8 flex justify-center">
            <Button href={getInvolvedCta.ctaHref} variant="primary" withArrow>
              {getInvolvedCta.ctaLabel}
            </Button>
          </div>
        </Container>
      </section>

      {/* Latest news */}
      {latestPosts.length > 0 && (
        <section className="py-20 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Stay informed" headline="News & upcoming events" />
              <Link href="/news" className="font-semibold text-gold-600 hover:text-gold-500">
                View all
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {latestPosts.map((post, i) => (
                <Reveal key={post.id} delay={i * 60}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Photo src={post.coverImageUrl} alt="" icon={Calendar} />
                      <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-indigo-950 shadow">
                        {post.kind === "event" ? formatEventDate(post.eventDate) : "News"}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-indigo-950 group-hover:text-gold-600">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-indigo-900/60">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                        Read more <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-gold-500 py-14">
        <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-extrabold text-white">{newsletter.headline}</h2>
            <p className="mt-2 text-white/85">{newsletter.body}</p>
          </div>
          <NewsletterForm dark />
        </Container>
      </section>
    </>
  );
}

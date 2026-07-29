import type { Metadata } from "next";
import Container, { SectionHeading } from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "Get Involved" };

type Intro = { headline: string; body: string };
type Ways = { items: { title: string; description: string; ctaLabel?: string; ctaHref?: string }[] };
type Donate = { headline: string; body: string; bankName: string; accountName: string; accountNumber: string };

export default async function GetInvolvedPage() {
  const [intro, ways, donate] = await Promise.all([
    getContent<Intro>("getInvolved.intro"),
    getContent<Ways>("getInvolved.ways"),
    getContent<Donate>("getInvolved.donate"),
  ]);

  return (
    <>
      <section className="bg-indigo-950 py-16 text-stone-50 sm:py-20">
        <Container>
          <h1 className="max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {intro.headline}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-stone-300">{intro.body}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Ways to help" headline="Find your place at OCDA" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ways.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-stone-200 p-6">
                  <h3 className="font-display text-lg font-bold text-indigo-950">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-indigo-900/70">{item.description}</p>
                  {item.ctaLabel && item.ctaHref && (
                    <div className="mt-5">
                      <Button href={item.ctaHref} variant="secondary" className="w-full">
                        {item.ctaLabel}
                      </Button>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-stone-100 py-16 sm:py-20">
        <Container className="max-w-2xl">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-clay-600">Donate</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-indigo-950">
              {donate.headline}
            </h2>
            <p className="mt-4 text-indigo-900/80">{donate.body}</p>

            <dl className="mt-8 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-stone-50">
              <div className="flex items-center justify-between px-6 py-4">
                <dt className="text-sm text-indigo-900/60">Bank</dt>
                <dd className="font-semibold text-indigo-950">{donate.bankName}</dd>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <dt className="text-sm text-indigo-900/60">Account name</dt>
                <dd className="font-semibold text-indigo-950">{donate.accountName}</dd>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <dt className="text-sm text-indigo-900/60">Account number</dt>
                <dd className="font-semibold text-indigo-950">{donate.accountNumber}</dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Users } from "lucide-react";
import Container, { SectionHeading } from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

type Story = { eyebrow: string; headline: string; body: string; imageUrl?: string };
type Pillars = { items: { title: string; body: string }[] };
type Team = { items: { name: string; role: string; bio: string; photoUrl?: string }[] };

export default async function AboutPage() {
  const [story, pillars, team] = await Promise.all([
    getContent<Story>("about.story"),
    getContent<Pillars>("about.pillars"),
    getContent<Team>("about.team"),
  ]);

  const paragraphs = story.body.split("\n").filter(Boolean);

  return (
    <>
      <PageHeader eyebrow={story.eyebrow} title={story.headline} />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal className="space-y-4 text-lg leading-relaxed text-indigo-900/80">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={80} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">
            <Photo src={story.imageUrl} alt="" icon={Users} />
          </Reveal>
        </Container>
      </section>

      <section id="values" className="bg-stone-100 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What guides us" headline="Our values" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {pillars.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-indigo-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-indigo-900/70">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="programs" className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Leadership" headline="The executive council" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.items.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-sm">
                  {member.photoUrl ? (
                    <Photo src={member.photoUrl} alt={member.name} icon={Users} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-indigo-950 font-display text-3xl font-extrabold text-gold-400">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                  )}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-indigo-950">{member.name}</h3>
                <p className="text-sm font-semibold text-gold-600">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-indigo-900/70">{member.bio}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

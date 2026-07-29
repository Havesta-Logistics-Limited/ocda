import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { db } from "@/lib/db";
import { formatEventDate } from "@/lib/format";

export const metadata: Metadata = { title: "News & Events" };

export default async function NewsPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader title="News & Events" description="Announcements, project updates, and upcoming gatherings from OCDA." />

      <section className="py-16 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-indigo-900/70">Nothing posted yet — check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 60}>
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
                      <h2 className="font-display text-lg font-bold text-indigo-950 group-hover:text-gold-600">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm text-indigo-900/70">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                        Read more <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

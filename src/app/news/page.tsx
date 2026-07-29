import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Newspaper } from "lucide-react";
import Container from "@/components/Container";
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
      <section className="bg-indigo-950 py-16 text-stone-50 sm:py-20">
        <Container>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">News & Events</h1>
          <p className="mt-4 max-w-xl text-lg text-stone-300">
            Announcements, project updates, and upcoming gatherings from OCDA.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-indigo-900/70">Nothing posted yet — check back soon.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 60}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-stone-200 p-6 transition-colors hover:border-clay-500"
                  >
                    <span className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-clay-600">
                      {post.kind === "event" ? (
                        <>
                          <Calendar className="h-3.5 w-3.5" /> {formatEventDate(post.eventDate)}
                        </>
                      ) : (
                        <>
                          <Newspaper className="h-3.5 w-3.5" /> News
                        </>
                      )}
                    </span>
                    <h2 className="mt-3 font-display text-lg font-bold text-indigo-950 group-hover:text-clay-600">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-indigo-900/70">{post.excerpt}</p>
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

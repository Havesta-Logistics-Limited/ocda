import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Container from "@/components/Container";
import Photo from "@/components/Photo";
import { db } from "@/lib/db";
import { formatEventDate } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  return { title: post?.title ?? "Not found" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  const paragraphs = post.body.split("\n").filter(Boolean);

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500">
          <ArrowLeft className="h-4 w-4" /> Back to News & Events
        </Link>

        <div className="mt-6">
          {post.kind === "event" && (
            <div className="mb-3 flex flex-wrap gap-4 text-sm font-semibold text-gold-600">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatEventDate(post.eventDate)}
              </span>
              {post.eventLocation && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {post.eventLocation}
                </span>
              )}
            </div>
          )}
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-indigo-950 sm:text-4xl">
            {post.title}
          </h1>
        </div>

        {post.coverImageUrl && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl shadow-sm">
            <Photo src={post.coverImageUrl} alt="" icon={Calendar} />
          </div>
        )}

        <div className="mt-8 space-y-4 text-lg leading-relaxed text-indigo-900/80">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}

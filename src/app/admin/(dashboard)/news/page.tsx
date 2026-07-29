import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { formatEventDate } from "@/lib/format";
import DeleteButton from "@/components/admin/DeleteButton";
import { deletePostAction } from "@/lib/actions/posts";

export default async function AdminNewsPage() {
  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-indigo-950">News & Events</h1>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gold-600"
        >
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      <div className="mt-6 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white shadow-sm">
        {posts.length === 0 && <p className="p-6 text-sm text-indigo-900/60">No posts yet.</p>}
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${
                    post.kind === "event" ? "bg-clay-500/10 text-clay-600" : "bg-indigo-500/10 text-indigo-700"
                  }`}
                >
                  {post.kind}
                </span>
                {!post.published && (
                  <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs font-semibold text-indigo-900/60">
                    Draft
                  </span>
                )}
                {post.kind === "event" && post.eventDate && (
                  <span className="text-xs text-indigo-900/50">{formatEventDate(post.eventDate)}</span>
                )}
              </div>
              <p className="mt-1 truncate font-semibold text-indigo-950">{post.title}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link href={`/admin/news/${post.id}`} className="text-sm font-semibold text-indigo-900/70 hover:text-indigo-950">
                Edit
              </Link>
              <DeleteButton action={deletePostAction.bind(null, post.id)} label="Delete this post?" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

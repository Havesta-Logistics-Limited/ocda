import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PostForm from "@/components/admin/PostForm";
import { updatePostAction } from "@/lib/actions/posts";
import { db } from "@/lib/db";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });
  if (!post) notFound();

  const action = updatePostAction.bind(null, id);

  return (
    <div>
      <Link href="/admin/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-900/60 hover:text-indigo-950">
        <ArrowLeft className="h-4 w-4" /> News & Events
      </Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-indigo-950">Edit post</h1>
      <div className="mt-8">
        <PostForm action={action} post={post} />
      </div>
    </div>
  );
}

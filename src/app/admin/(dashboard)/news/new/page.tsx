import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostForm from "@/components/admin/PostForm";
import { createPostAction } from "@/lib/actions/posts";

export default function NewPostPage() {
  return (
    <div>
      <Link href="/admin/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-900/60 hover:text-indigo-950">
        <ArrowLeft className="h-4 w-4" /> News & Events
      </Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-indigo-950">New post</h1>
      <div className="mt-8">
        <PostForm action={createPostAction} />
      </div>
    </div>
  );
}

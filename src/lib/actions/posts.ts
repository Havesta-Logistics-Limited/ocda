"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/format";

const postSchema = z.object({
  kind: z.enum(["news", "event"]),
  title: z.string().trim().min(1, "Enter a title."),
  slug: z.string().trim().min(1, "Enter a URL slug."),
  excerpt: z.string().trim().min(1, "Enter a short excerpt."),
  body: z.string().trim().min(1, "Enter the full text."),
  coverImageUrl: z.string().trim().optional(),
  eventDate: z.string().trim().optional(),
  eventLocation: z.string().trim().optional(),
  published: z.boolean(),
});

export type PostFormState = { ok: boolean; error?: string };

function parsePostForm(formData: FormData) {
  return postSchema.safeParse({
    kind: formData.get("kind"),
    title: formData.get("title"),
    slug: slugify(String(formData.get("slug") ?? formData.get("title") ?? "")),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    coverImageUrl: formData.get("coverImageUrl") || undefined,
    eventDate: formData.get("eventDate") || undefined,
    eventLocation: formData.get("eventLocation") || undefined,
    published: formData.get("published") === "on",
  });
}

export async function createPostAction(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  await requireAdmin();
  const parsed = parsePostForm(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  const existing = await db.post.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) return { ok: false, error: "That URL slug is already used by another post." };

  await db.post.create({
    data: {
      ...parsed.data,
      eventDate: parsed.data.eventDate ? new Date(parsed.data.eventDate) : null,
    },
  });

  revalidatePath("/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function updatePostAction(id: string, _prev: PostFormState, formData: FormData): Promise<PostFormState> {
  await requireAdmin();
  const parsed = parsePostForm(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  const existing = await db.post.findFirst({ where: { slug: parsed.data.slug, NOT: { id } } });
  if (existing) return { ok: false, error: "That URL slug is already used by another post." };

  await db.post.update({
    where: { id },
    data: {
      ...parsed.data,
      eventDate: parsed.data.eventDate ? new Date(parsed.data.eventDate) : null,
    },
  });

  revalidatePath("/news");
  revalidatePath(`/news/${parsed.data.slug}`);
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  await db.post.delete({ where: { id } });
  revalidatePath("/news");
  revalidatePath("/");
}

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({
  url: z.string().trim().min(1, "Add an image first."),
  caption: z.string().trim().optional(),
});

export type GalleryFormState = { ok: boolean; error?: string };

export async function addGalleryImageAction(_prev: GalleryFormState, formData: FormData): Promise<GalleryFormState> {
  await requireAdmin();
  const parsed = schema.safeParse({
    url: formData.get("url"),
    caption: formData.get("caption") || undefined,
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  const count = await db.galleryImage.count();
  await db.galleryImage.create({ data: { url: parsed.data.url, caption: parsed.data.caption, position: count } });

  revalidatePath("/gallery");
  return { ok: true };
}

export async function deleteGalleryImageAction(id: string) {
  await requireAdmin();
  await db.galleryImage.delete({ where: { id } });
  revalidatePath("/gallery");
}

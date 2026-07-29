"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { setContent } from "@/lib/content";

export async function saveSectionContent(key: string, data: unknown) {
  const admin = await requireAdmin();
  await setContent(key, data, admin.email);
  revalidatePath("/", "layout");
  return { ok: true as const };
}

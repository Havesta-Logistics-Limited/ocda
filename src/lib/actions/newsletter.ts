"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({ email: z.string().trim().email("Enter a valid email address.") });

export type NewsletterFormState = { ok: boolean; error?: string };

export async function subscribeToNewsletter(_prev: NewsletterFormState, formData: FormData): Promise<NewsletterFormState> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  await db.newsletterSubscriber.upsert({
    where: { email: parsed.data.email.toLowerCase().trim() },
    update: {},
    create: { email: parsed.data.email.toLowerCase().trim() },
  });

  return { ok: true };
}

export async function deleteSubscriberAction(id: string) {
  await requireAdmin();
  await db.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/admin/subscribers");
}

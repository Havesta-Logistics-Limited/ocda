"use server";

import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(200),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().max(50).optional(),
  message: z.string().trim().min(1, "Enter a message.").max(4000),
  company: z.string().max(0).optional(), // honeypot — real users never fill this in
});

export type ContactFormState = { ok: boolean; error?: string };

export async function submitContactMessage(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    company: formData.get("company") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  if (parsed.data.company) {
    // Honeypot tripped — silently succeed so bots don't learn anything.
    return { ok: true };
  }

  await db.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
    },
  });

  return { ok: true };
}

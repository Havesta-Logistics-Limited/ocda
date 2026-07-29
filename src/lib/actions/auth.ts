"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createFirstAdmin, hasAnyAdmin, signIn, signOut, requireAdmin, changePassword } from "@/lib/auth";

export type AuthFormState = { ok: boolean; error?: string };

const setupSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(10, "Use at least 10 characters."),
});

export async function setupAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (await hasAnyAdmin()) {
    return { ok: false, error: "Setup has already been completed." };
  }

  const parsed = setupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  await createFirstAdmin(parsed.data);
  redirect("/admin");
}

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export async function loginAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const result = await signIn(parsed.data.email, parsed.data.password);
  if (!result.ok) return { ok: false, error: result.error };
  redirect("/admin");
}

export async function logoutAction() {
  await signOut();
  redirect("/admin/login");
}

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password."),
  newPassword: z.string().min(10, "Use at least 10 characters."),
});

export async function changePasswordAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const admin = await requireAdmin();
  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const result = await changePassword(admin.adminId, parsed.data.currentPassword, parsed.data.newPassword);
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true };
}

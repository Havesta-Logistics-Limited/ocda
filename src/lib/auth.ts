import "server-only";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession, destroySession, getSession, type SessionPayload } from "@/lib/session";

export async function hasAnyAdmin() {
  const count = await db.adminUser.count();
  return count > 0;
}

export async function createFirstAdmin(input: { email: string; password: string; name: string }) {
  if (await hasAnyAdmin()) {
    throw new Error("An admin account already exists.");
  }
  const passwordHash = await bcrypt.hash(input.password, 12);
  const admin = await db.adminUser.create({
    data: { email: input.email.toLowerCase().trim(), passwordHash, name: input.name },
  });
  await createSession({ adminId: admin.id, email: admin.email, name: admin.name });
  return admin;
}

export async function signIn(email: string, password: string) {
  const admin = await db.adminUser.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!admin) return { ok: false as const, error: "Incorrect email or password." };

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return { ok: false as const, error: "Incorrect email or password." };

  await db.adminUser.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });
  await createSession({ adminId: admin.id, email: admin.email, name: admin.name });
  return { ok: true as const };
}

export async function signOut() {
  await destroySession();
}

export async function currentAdmin(): Promise<SessionPayload | null> {
  return getSession();
}

/** Call at the top of any admin server component / server action that must be protected. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (session) return session;
  redirect((await hasAnyAdmin()) ? "/admin/login" : "/admin/setup");
}

/** Same check for Route Handlers, where a redirect() would break a fetch() caller — returns null instead. */
export async function requireAdminApi(): Promise<SessionPayload | null> {
  return getSession();
}

export async function changePassword(adminId: string, currentPassword: string, newPassword: string) {
  const admin = await db.adminUser.findUnique({ where: { id: adminId } });
  if (!admin) throw new Error("Admin not found.");

  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) return { ok: false as const, error: "Current password is incorrect." };

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await db.adminUser.update({ where: { id: adminId }, data: { passwordHash } });
  return { ok: true as const };
}

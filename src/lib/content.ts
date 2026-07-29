import "server-only";
import { db } from "@/lib/db";
import { DEFAULT_CONTENT } from "@/lib/content-schema";

export async function getContent<T = Record<string, unknown>>(key: string): Promise<T> {
  const row = await db.siteContent.findUnique({ where: { key } });
  if (row) return JSON.parse(row.data) as T;
  return (DEFAULT_CONTENT[key] ?? {}) as T;
}

export async function getAllContent(): Promise<Record<string, unknown>> {
  const rows = await db.siteContent.findMany();
  const byKey = new Map(rows.map((r) => [r.key, JSON.parse(r.data)]));
  const merged: Record<string, unknown> = { ...DEFAULT_CONTENT };
  for (const [key, value] of byKey) merged[key] = value;
  return merged;
}

export async function setContent(key: string, data: unknown, updatedBy: string) {
  await db.siteContent.upsert({
    where: { key },
    update: { data: JSON.stringify(data), updatedBy },
    create: { key, data: JSON.stringify(data), updatedBy },
  });
}

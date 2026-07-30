import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";

export default async function proxy(request: NextRequest) {
  const row = await db.siteContent.findUnique({ where: { key: "site.maintenance" } });
  const enabled = row ? (JSON.parse(row.data) as { enabled?: boolean }).enabled : false;

  if (enabled) {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!admin|api|maintenance|icon|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};

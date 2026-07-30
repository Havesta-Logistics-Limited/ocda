import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Kept deliberately dependency-free (no Prisma) — Netlify's Next.js plugin
// rejects native binary addons (Prisma's query engine) inside Middleware,
// regardless of the configured runtime. The actual maintenance-mode check
// happens in the root layout, a normal server function, using this header
// to know the current path.
export default function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};

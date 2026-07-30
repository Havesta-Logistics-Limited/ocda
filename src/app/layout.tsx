import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaintenanceNotice from "@/components/MaintenanceNotice";
import { getContent } from "@/lib/content";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// The whole site reads content from the database that the admin dashboard
// edits live — always render fresh rather than serving a stale build-time
// snapshot.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Ojobeda Community Development Association",
    template: "%s — OCDA",
  },
  description:
    "OCDA is a community-led association investing in the infrastructure, education, health, and opportunity Ojobeda needs to thrive.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";

  // The admin dashboard has its own sidebar/chrome and never shows the
  // public navbar, footer, or maintenance notice — skip the four DB round
  // trips those need entirely, rather than paying for them on every click.
  if (pathname.startsWith("/admin")) {
    return (
      <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
        <body className="min-h-full bg-stone-50 text-indigo-950">{children}</body>
      </html>
    );
  }

  const [contact, footer, branding, maintenance] = await Promise.all([
    getContent<{ phone: string; email: string }>("contact.info"),
    getContent<{ facebookUrl?: string; instagramUrl?: string; twitterUrl?: string }>("site.footer"),
    getContent<{ logoUrl?: string }>("site.branding"),
    getContent<{ enabled: boolean; message: string }>("site.maintenance"),
  ]);

  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-indigo-950">
        {maintenance.enabled ? (
          <MaintenanceNotice message={maintenance.message} logoUrl={branding.logoUrl} />
        ) : (
          <>
            <Navbar
              logoUrl={branding.logoUrl}
              topBar={{
                phone: contact.phone,
                email: contact.email,
                facebookUrl: footer.facebookUrl,
                instagramUrl: footer.instagramUrl,
                twitterUrl: footer.twitterUrl,
              }}
            />
            <main className="flex-1">{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}

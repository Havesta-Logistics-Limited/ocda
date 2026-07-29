import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${publicSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-indigo-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

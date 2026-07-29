import Link from "next/link";
import { getContent } from "@/lib/content";
import WovenDivider from "@/components/WovenDivider";

export default async function Footer() {
  const footer = await getContent<{
    tagline: string;
    body: string;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
  }>("site.footer");

  const contact = await getContent<{
    address: string;
    phone: string;
    email: string;
  }>("contact.info");

  const year = new Date().getFullYear();

  return (
    <footer className="bg-indigo-950 text-stone-100">
      <WovenDivider className="text-indigo-800" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <span className="font-display text-lg font-extrabold text-gold-400">OCDA</span>
          <p className="mt-3 max-w-sm text-sm text-stone-300">{footer.tagline}</p>
          <p className="mt-3 max-w-sm text-sm text-stone-400">{footer.body}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-stone-300">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-stone-300">
            <li><Link href="/about" className="hover:text-gold-400">About</Link></li>
            <li><Link href="/get-involved" className="hover:text-gold-400">Get Involved</Link></li>
            <li><Link href="/news" className="hover:text-gold-400">News & Events</Link></li>
            <li><Link href="/gallery" className="hover:text-gold-400">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-stone-300">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-stone-300">
            <li>{contact.address}</li>
            <li>{contact.phone}</li>
            <li>{contact.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-indigo-800 px-6 py-5 text-center text-xs text-stone-500">
        © {year} Ojobeda Community Development Association. All rights reserved.
      </div>
    </footer>
  );
}

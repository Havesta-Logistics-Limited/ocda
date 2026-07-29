import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/SocialIcon";
import { getContent } from "@/lib/content";

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
  const socialLinks = [
    { url: footer.facebookUrl, Icon: FacebookIcon, label: "Facebook" },
    { url: footer.instagramUrl, Icon: InstagramIcon, label: "Instagram" },
    { url: footer.twitterUrl, Icon: XIcon, label: "X / Twitter" },
  ].filter((s) => s.url);

  return (
    <footer className="bg-indigo-950 text-stone-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display text-base font-extrabold text-white">
              O
            </span>
            <span className="font-display text-lg font-extrabold text-white">OCDA</span>
          </div>
          <p className="mt-4 max-w-sm text-sm font-medium text-stone-100">{footer.tagline}</p>
          <p className="mt-3 max-w-sm text-sm text-stone-400">{footer.body}</p>
          {socialLinks.length > 0 && (
            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map(({ url, Icon, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-stone-400">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-stone-300">
            <li><Link href="/about" className="hover:text-gold-400">About</Link></li>
            <li><Link href="/get-involved" className="hover:text-gold-400">Get Involved</Link></li>
            <li><Link href="/news" className="hover:text-gold-400">News & Events</Link></li>
            <li><Link href="/gallery" className="hover:text-gold-400">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-stone-400">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-stone-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {contact.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" /> {contact.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" /> {contact.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-stone-500">
        © {year} Ojobeda Community Development Association. All rights reserved.
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/SocialIcon";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/news", label: "News & Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

type TopBarInfo = {
  phone?: string;
  email?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
};

export default function Navbar({ topBar }: { topBar?: TopBarInfo }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const hasTopBar = topBar && (topBar.phone || topBar.email || topBar.facebookUrl || topBar.instagramUrl || topBar.twitterUrl);

  return (
    <header className="sticky top-0 z-40">
      {hasTopBar && (
        <div className="hidden bg-indigo-950 text-stone-50 lg:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
            <div className="flex items-center gap-5">
              {topBar?.phone && (
                <a href={`tel:${topBar.phone}`} className="flex items-center gap-1.5 hover:text-gold-400">
                  <Phone className="h-3.5 w-3.5" /> {topBar.phone}
                </a>
              )}
              {topBar?.email && (
                <a href={`mailto:${topBar.email}`} className="flex items-center gap-1.5 hover:text-gold-400">
                  <Mail className="h-3.5 w-3.5" /> {topBar.email}
                </a>
              )}
            </div>
            <div className="flex items-center gap-3">
              {topBar?.facebookUrl && (
                <a href={topBar.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold-400">
                  <FacebookIcon className="h-3.5 w-3.5" />
                </a>
              )}
              {topBar?.instagramUrl && (
                <a href={topBar.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold-400">
                  <InstagramIcon className="h-3.5 w-3.5" />
                </a>
              )}
              {topBar?.twitterUrl && (
                <a href={topBar.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="hover:text-gold-400">
                  <XIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display text-base font-extrabold text-white">
              O
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-indigo-950">OCDA</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active ? "bg-gold-500/10 text-gold-600" : "text-indigo-950/70 hover:text-indigo-950",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/get-involved"
              className="inline-flex items-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-gold-500/25 transition-colors hover:bg-gold-600"
            >
              Join OCDA
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-stone-200 text-indigo-950 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-4 bg-current transition-transform",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span className={cn("absolute left-0 top-1.5 h-px w-4 bg-current transition-opacity", open && "opacity-0")} />
              <span
                className={cn(
                  "absolute left-0 top-3 h-px w-4 bg-current transition-transform",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        {open && (
          <nav className="border-t border-stone-200 px-6 py-3 lg:hidden">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2.5 text-sm font-semibold text-indigo-950/80 hover:text-gold-600"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-involved"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Join OCDA
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost-light";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-gold-500 text-indigo-950 hover:bg-gold-400",
  secondary: "border border-indigo-800 text-indigo-950 hover:border-indigo-950",
  "ghost-light": "border border-stone-50/40 text-stone-50 hover:border-gold-400 hover:text-gold-400",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
    VARIANT_CLASSES[variant],
    className,
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

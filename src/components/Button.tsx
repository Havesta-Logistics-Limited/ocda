import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost-light";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-gold-500 text-white shadow-lg shadow-gold-500/25 hover:bg-gold-600",
  secondary: "border-2 border-stone-200 bg-white text-indigo-950 hover:border-gold-500",
  "ghost-light": "border-2 border-white/30 text-white hover:border-gold-400 hover:text-gold-400",
};

const ARROW_BUBBLE_CLASSES: Record<Variant, string> = {
  primary: "bg-white/20",
  secondary: "bg-stone-100",
  "ghost-light": "bg-white/15",
};

export default function Button({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cn(
    "inline-flex items-center justify-center gap-3 rounded-full py-3 pl-6 text-sm font-semibold transition-colors",
    withArrow ? "pr-2" : "pr-6",
    VARIANT_CLASSES[variant],
    className,
  );

  const content = (
    <>
      {children}
      {withArrow && (
        <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", ARROW_BUBBLE_CLASSES[variant])}>
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export default function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-6xl px-6", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  headline,
  className,
}: {
  eyebrow?: string;
  headline: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-600">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-indigo-950 sm:text-4xl">
        {headline}
      </h2>
    </div>
  );
}

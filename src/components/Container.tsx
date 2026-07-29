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
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-clay-600">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-indigo-950 sm:text-4xl">
        {headline}
      </h2>
    </div>
  );
}

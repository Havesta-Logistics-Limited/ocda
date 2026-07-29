import { cn } from "@/lib/cn";

export default function WovenDivider({ className }: { className?: string }) {
  return <div aria-hidden className={cn("woven-pattern h-2.5 w-full opacity-70", className)} />;
}

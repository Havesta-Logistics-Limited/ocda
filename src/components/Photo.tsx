import Image from "next/image";
import { ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Fills an absolutely-positioned, already-sized parent (e.g.
 * `relative aspect-[4/3] overflow-hidden rounded-2xl`) with either the
 * real photo or a soft placeholder — image fields are commonly empty
 * before an admin uploads real photos, and this keeps that state looking
 * intentional instead of a broken <img>.
 */
export default function Photo({
  src,
  alt,
  className,
  icon: Icon = ImageIcon,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  icon?: LucideIcon;
}) {
  if (src) {
    return <Image src={src} alt={alt} fill className={cn("object-cover", className)} />;
  }

  return (
    <div className={cn("photo-placeholder absolute inset-0", className)}>
      <Icon className="h-8 w-8" strokeWidth={1.5} />
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSection } from "@/lib/content-schema";
import { getContent } from "@/lib/content";
import SectionEditor from "@/components/admin/SectionEditor";

export default async function EditContentPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const section = getSection(key);
  if (!section) notFound();

  const data = await getContent(key);

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-900/60 hover:text-indigo-950">
        <ArrowLeft className="h-4 w-4" /> Dashboard
      </Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-indigo-950">{section.label}</h1>
      <p className="mt-1 text-sm text-indigo-900/60">{section.description}</p>

      <div className="mt-8 max-w-2xl">
        <SectionEditor section={section} initialData={data as Record<string, unknown>} />
      </div>
    </div>
  );
}

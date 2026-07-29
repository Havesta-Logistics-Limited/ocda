import Image from "next/image";
import { db } from "@/lib/db";
import AddImageForm from "@/components/admin/AddImageForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteGalleryImageAction } from "@/lib/actions/gallery";

export default async function AdminGalleryPage() {
  const images = await db.galleryImage.findMany({ orderBy: [{ position: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo-950">Gallery</h1>
      <p className="mt-1 text-sm text-indigo-900/60">Photos shown on the public Gallery page.</p>

      <div className="mt-6 max-w-md">
        <AddImageForm />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
            <div className="relative aspect-square">
              <Image src={image.url} alt={image.caption ?? ""} fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between gap-2 p-3">
              <p className="truncate text-xs text-indigo-900/60">{image.caption || "No caption"}</p>
              <DeleteButton action={deleteGalleryImageAction.bind(null, image.id)} label="Delete?" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const images = await db.galleryImage.findMany({ orderBy: [{ position: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <PageHeader title="Gallery" description="Moments from OCDA's projects and community life." />

      <section className="py-16 sm:py-20">
        <Container>
          {images.length === 0 ? (
            <p className="text-indigo-900/70">No photos yet — add some from the admin dashboard.</p>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {images.map((image) => (
                <figure key={image.id} className="break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
                    <Image src={image.url} alt={image.caption ?? ""} fill className="object-cover" />
                  </div>
                  {image.caption && (
                    <figcaption className="px-4 py-3 text-sm text-indigo-900/70">{image.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const images = await db.galleryImage.findMany({ orderBy: [{ position: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <section className="bg-indigo-950 py-16 text-stone-50 sm:py-20">
        <Container>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Gallery</h1>
          <p className="mt-4 max-w-xl text-lg text-stone-300">Moments from OCDA&apos;s projects and community life.</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {images.length === 0 ? (
            <p className="text-indigo-900/70">
              No photos yet — add some from the admin dashboard.
            </p>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {images.map((image) => (
                <figure key={image.id} className="break-inside-avoid overflow-hidden rounded-2xl border border-stone-200">
                  <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
                    <Image src={image.url} alt={image.caption ?? ""} fill className="object-cover" />
                  </div>
                  {image.caption && (
                    <figcaption className="bg-stone-50 px-4 py-3 text-sm text-indigo-900/70">
                      {image.caption}
                    </figcaption>
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

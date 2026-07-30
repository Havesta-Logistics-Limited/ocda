import { ImageResponse } from "next/og";
import { db } from "@/lib/db";
import { getContent } from "@/lib/content";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function Icon() {
  const branding = await getContent<{ faviconUrl?: string }>("site.branding");
  const uploaded = await loadUploadedFavicon(branding.faviconUrl);
  if (uploaded) {
    return new Response(new Uint8Array(uploaded.bytes), { headers: { "Content-Type": uploaded.mimeType } });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6fa331",
          color: "white",
          fontSize: 20,
          fontWeight: 800,
          borderRadius: "50%",
        }}
      >
        O
      </div>
    ),
    { ...size },
  );
}

async function loadUploadedFavicon(faviconUrl?: string) {
  if (!faviconUrl) return null;
  const match = /\/api\/uploads\/([^/?#]+)/.exec(faviconUrl);
  if (!match) return null;
  return db.upload.findUnique({ where: { id: match[1] }, select: { bytes: true, mimeType: true } });
}

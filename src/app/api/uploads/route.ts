import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";

// Netlify's serverless functions hard-cap request bodies at ~6MB at the
// platform level — above that, the request never reaches this code at all
// (it fails with a raw 413 straight from their infrastructure). Both limits
// stay well under that so our own, friendlier error is what users see.
const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4MB
const MAX_VIDEO_BYTES = 4 * 1024 * 1024; // 4MB — paste a hosted URL instead for anything bigger
const ALLOWED_IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"]);
const ALLOWED_VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);

export async function POST(req: Request) {
  const admin = await requireAdminApi();
  if (!admin) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  const isImage = ALLOWED_IMAGE_TYPES.has(file.type);
  const isVideo = ALLOWED_VIDEO_TYPES.has(file.type);
  if (!isImage && !isVideo) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }
  const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: `File is too large (max ${Math.round(maxBytes / (1024 * 1024))}MB).` },
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const upload = await db.upload.create({ data: { mimeType: file.type, bytes } });

  return NextResponse.json({ id: upload.id, url: `/api/uploads/${upload.id}` });
}

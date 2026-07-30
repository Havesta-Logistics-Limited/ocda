import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const upload = await db.upload.findUnique({ where: { id } });
  if (!upload) return new NextResponse("Not found", { status: 404 });

  const bytes = upload.bytes;
  const total = bytes.length;
  const range = req.headers.get("range");

  // Video playback (especially Safari) requires range-request support to work at all.
  if (range) {
    const match = /bytes=(\d*)-(\d*)/.exec(range);
    const start = match?.[1] ? parseInt(match[1], 10) : 0;
    const end = match?.[2] ? parseInt(match[2], 10) : total - 1;
    const chunkEnd = Math.min(end, total - 1);

    if (Number.isNaN(start) || Number.isNaN(chunkEnd) || start > chunkEnd || start >= total) {
      return new NextResponse(null, { status: 416, headers: { "Content-Range": `bytes */${total}` } });
    }

    return new NextResponse(new Uint8Array(bytes.subarray(start, chunkEnd + 1)), {
      status: 206,
      headers: {
        "Content-Type": upload.mimeType,
        "Content-Range": `bytes ${start}-${chunkEnd}/${total}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(chunkEnd - start + 1),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": upload.mimeType,
      "Accept-Ranges": "bytes",
      "Content-Length": String(total),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

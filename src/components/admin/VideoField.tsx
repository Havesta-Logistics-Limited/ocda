"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { getYouTubeId } from "@/lib/youtube";

const MAX_UPLOAD_MB = 4;
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

export default function VideoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const youtubeId = value ? getYouTubeId(value) : null;

  async function handleFile(file: File) {
    setError(null);
    if (file.size > MAX_UPLOAD_BYTES) {
      setError(`Video is too large for direct upload — keep it under ${MAX_UPLOAD_MB}MB, or paste a hosted URL instead.`);
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed.");
      onChange(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-indigo-950">{label}</label>
      <div className="mt-1.5 flex items-start gap-4">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
          {youtubeId ? (
            <Image
              src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
              alt=""
              fill
              className="object-cover"
            />
          ) : (
            value && <video src={value} className="h-full w-full object-cover" muted loop playsInline autoPlay />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste a YouTube link, a direct video URL, or upload below"
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-indigo-950 outline-none focus:border-indigo-500"
          />
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="file"
              accept="video/mp4,video/webm"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-full border border-stone-200 px-4 py-1.5 text-xs font-semibold text-indigo-950 hover:border-indigo-950 disabled:opacity-60"
            >
              {uploading ? "Uploading…" : "Upload video"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-xs font-semibold text-clay-600 hover:text-clay-500"
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-xs text-indigo-900/50">
            A YouTube link works best — it plays muted and looped automatically. Direct upload is MP4 or WebM, up to{" "}
            {MAX_UPLOAD_MB}MB; for anything bigger, host it elsewhere and paste that URL instead.
          </p>
          {error && <p className="text-xs font-medium text-clay-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

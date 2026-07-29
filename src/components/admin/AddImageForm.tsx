"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ImageField from "@/components/admin/ImageField";
import { addGalleryImageAction, type GalleryFormState } from "@/lib/actions/gallery";

const initialState: GalleryFormState = { ok: false };

export default function AddImageForm() {
  const [state, formAction, pending] = useActionState(addGalleryImageAction, initialState);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const router = useRouter();

  // Reset the form the moment a new successful submission comes back —
  // done during render (not an effect) since it's just deriving local
  // state from a prop-like value, per https://react.dev/learn/you-might-not-need-an-effect
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state.ok) {
      setUrl("");
      setCaption("");
    }
  }

  const lastOk = useRef(state.ok);
  useEffect(() => {
    if (state.ok && !lastOk.current) router.refresh();
    lastOk.current = state.ok;
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-stone-200 bg-white shadow-sm p-5">
      <ImageField label="Photo" value={url} onChange={setUrl} />
      <input type="hidden" name="url" value={url} />
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-indigo-950">
          Caption (optional)
        </label>
        <input
          id="caption"
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-indigo-950 outline-none focus:border-indigo-500"
        />
      </div>
      {state.error && <p className="text-sm font-medium text-clay-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending || !url}
        className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold-600 disabled:opacity-60"
      >
        {pending ? "Adding…" : "Add to gallery"}
      </button>
    </form>
  );
}

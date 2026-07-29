"use client";

import { useActionState, useState } from "react";
import type { Post } from "@prisma/client";
import ImageField from "@/components/admin/ImageField";
import type { PostFormState } from "@/lib/actions/posts";

const initialState: PostFormState = { ok: false };

export default function PostForm({
  action,
  post,
}: {
  action: (prev: PostFormState, formData: FormData) => Promise<PostFormState>;
  post?: Post;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [kind, setKind] = useState(post?.kind ?? "news");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div>
        <span className="block text-sm font-medium text-indigo-950">Type</span>
        <div className="mt-1.5 flex gap-2">
          {(["news", "event"] as const).map((option) => (
            <label
              key={option}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold ${
                kind === option ? "border-indigo-950 bg-indigo-950 text-gold-400" : "border-stone-200 text-indigo-950"
              }`}
            >
              <input
                type="radio"
                name="kind"
                value={option}
                checked={kind === option}
                onChange={() => setKind(option)}
                className="hidden"
              />
              {option === "news" ? "News" : "Event"}
            </label>
          ))}
        </div>
      </div>

      <Field label="Title" name="title" defaultValue={post?.title} required />
      <Field
        label="URL slug"
        name="slug"
        defaultValue={post?.slug}
        placeholder="auto-generated from title if left blank"
      />
      <Field label="Excerpt (shown in lists)" name="excerpt" defaultValue={post?.excerpt} textarea rows={2} required />
      <Field label="Full text (one paragraph per line)" name="body" defaultValue={post?.body} textarea rows={8} required />

      <ImageField label="Cover image (optional)" value={coverImageUrl} onChange={setCoverImageUrl} />
      <input type="hidden" name="coverImageUrl" value={coverImageUrl} />

      {kind === "event" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Event date"
            name="eventDate"
            type="date"
            defaultValue={post?.eventDate ? post.eventDate.toISOString().slice(0, 10) : undefined}
          />
          <Field label="Location" name="eventLocation" defaultValue={post?.eventLocation ?? undefined} />
        </div>
      )}

      <label className="flex items-center gap-2 text-sm font-medium text-indigo-950">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? true} className="h-4 w-4" />
        Published (visible on the site)
      </label>

      {state.error && <p className="text-sm font-medium text-clay-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-600 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  textarea,
  rows,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-indigo-950">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-indigo-950 outline-none focus:border-indigo-500"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          required={required}
          className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-indigo-950 outline-none focus:border-indigo-500"
        />
      )}
    </div>
  );
}

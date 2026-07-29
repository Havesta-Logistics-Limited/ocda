"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type NewsletterFormState } from "@/lib/actions/newsletter";

const initialState: NewsletterFormState = { ok: false };

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  if (state.ok) {
    return (
      <p className={dark ? "font-semibold text-white" : "font-semibold text-indigo-950"}>
        You&apos;re subscribed — thanks for staying in touch.
      </p>
    );
  }

  return (
    <form action={formAction} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          className="min-w-0 flex-1 rounded-full border-2 border-transparent bg-white px-5 py-3 text-sm text-indigo-950 outline-none placeholder:text-indigo-950/40 focus:border-indigo-950"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-indigo-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-900 disabled:opacity-60"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {state.error && (
        <p className={`mt-2 text-sm font-medium ${dark ? "text-white" : "text-clay-600"}`}>{state.error}</p>
      )}
    </form>
  );
}

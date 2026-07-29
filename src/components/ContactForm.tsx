"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { ok: false };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-moss-500/40 bg-moss-500/10 p-6 text-indigo-950">
        <p className="font-display font-bold">Message sent.</p>
        <p className="mt-1 text-sm text-indigo-900/70">Thanks for reaching out — we&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <Field label="Phone (optional)" name="phone" autoComplete="tel" />
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-indigo-950">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-100 px-4 py-3 text-indigo-950 outline-none focus:border-indigo-500"
        />
      </div>

      {state.error && <p className="text-sm font-medium text-clay-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-gold-500/25 transition-colors hover:bg-gold-600 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-indigo-950">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-100 px-4 py-3 text-indigo-950 outline-none focus:border-indigo-500"
      />
    </div>
  );
}

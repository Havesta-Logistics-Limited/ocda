"use client";

import { useActionState } from "react";
import { setupAction, type AuthFormState } from "@/lib/actions/auth";

const initialState: AuthFormState = { ok: false };

export default function SetupForm() {
  const [state, formAction, pending] = useActionState(setupAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <TextField label="Your name" name="name" autoComplete="name" required />
      <TextField label="Email" name="email" type="email" autoComplete="username" required />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        hint="At least 10 characters."
      />

      {state.error && <p className="text-sm font-medium text-clay-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-600 disabled:opacity-60"
      >
        {pending ? "Creating…" : "Create account"}
      </button>
    </form>
  );
}

function TextField({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  hint?: string;
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
        className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-indigo-950 outline-none focus:border-indigo-500"
      />
      {hint && <p className="mt-1 text-xs text-indigo-900/50">{hint}</p>}
    </div>
  );
}

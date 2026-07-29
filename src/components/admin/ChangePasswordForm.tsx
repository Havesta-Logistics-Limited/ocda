"use client";

import { useActionState } from "react";
import { changePasswordAction, type AuthFormState } from "@/lib/actions/auth";

const initialState: AuthFormState = { ok: false };

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-stone-200 bg-stone-50 p-6">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-indigo-950">
          Current password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-indigo-950 outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-indigo-950">
          New password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-indigo-950 outline-none focus:border-indigo-500"
        />
        <p className="mt-1 text-xs text-indigo-900/50">At least 10 characters.</p>
      </div>

      {state.error && <p className="text-sm font-medium text-clay-600">{state.error}</p>}
      {state.ok && <p className="text-sm font-medium text-moss-500">Password updated.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-indigo-950 hover:bg-gold-400 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Update password"}
      </button>
    </form>
  );
}

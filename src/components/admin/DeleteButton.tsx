"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ action, label }: { action: () => Promise<void>; label: string }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-sm">
        <span className="text-indigo-900/60">{label}</span>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await action();
              router.refresh();
            })
          }
          className="font-semibold text-clay-600 hover:text-clay-500"
        >
          Yes
        </button>
        <button type="button" onClick={() => setConfirming(false)} className="font-semibold text-indigo-900/60">
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1 text-sm font-semibold text-clay-600 hover:text-clay-500"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

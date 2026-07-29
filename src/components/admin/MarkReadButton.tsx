"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { markMessageReadAction } from "@/lib/actions/messages";

export default function MarkReadButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await markMessageReadAction(id);
          router.refresh();
        })
      }
      className="font-semibold text-indigo-900/70 hover:text-indigo-950"
    >
      Mark read
    </button>
  );
}

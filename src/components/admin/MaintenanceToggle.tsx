"use client";

import { useState, useTransition } from "react";
import { saveSectionContent } from "@/lib/actions/content";

type Maintenance = { enabled: boolean; message: string };

export default function MaintenanceToggle({ initial }: { initial: Maintenance }) {
  const [enabled, setEnabled] = useState(initial.enabled);
  const [message, setMessage] = useState(initial.message);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function save(next: Maintenance) {
    setSaved(false);
    startTransition(async () => {
      await saveSectionContent("site.maintenance", next);
      setSaved(true);
    });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-stone-200 bg-white shadow-sm p-6">
      <label className="flex items-center justify-between gap-4">
        <span>
          <span className="block text-sm font-medium text-indigo-950">Maintenance mode</span>
          <span className="block text-xs text-indigo-900/50">
            Shows visitors a maintenance message instead of the site. The admin dashboard stays accessible so you
            can turn it back off.
          </span>
        </span>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => {
            const next = e.target.checked;
            setEnabled(next);
            save({ enabled: next, message });
          }}
          className="h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full bg-stone-200 transition-colors checked:bg-gold-500 relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
        />
      </label>

      <div>
        <label htmlFor="maintenanceMessage" className="block text-sm font-medium text-indigo-950">
          Message shown to visitors
        </label>
        <textarea
          id="maintenanceMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => save({ enabled, message })}
          rows={3}
          className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-indigo-950 outline-none focus:border-indigo-500"
        />
      </div>

      {pending && <p className="text-xs text-indigo-900/50">Saving…</p>}
      {!pending && saved && <p className="text-xs font-medium text-moss-500">Saved.</p>}
    </div>
  );
}

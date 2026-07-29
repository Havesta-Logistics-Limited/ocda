"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import type { ContentSection, SimpleField } from "@/lib/content-schema";
import { saveSectionContent } from "@/lib/actions/content";
import ImageField from "@/components/admin/ImageField";

type ListItem = Record<string, string>;
type FieldValue = string | ListItem[];
type FormState = Record<string, FieldValue>;

export default function SectionEditor({
  section,
  initialData,
}: {
  section: ContentSection;
  initialData: Record<string, unknown>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormState>(() => normalize(section, initialData));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function setField(key: string, value: FieldValue) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSectionContent(section.key, values);
      setSaved(true);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {section.fields.map((field) =>
        field.type === "list" ? (
          <ListFieldEditor
            key={field.key}
            field={field}
            items={(values[field.key] as ListItem[]) ?? []}
            onChange={(items) => setField(field.key, items)}
          />
        ) : (
          <SimpleFieldEditor
            key={field.key}
            field={field}
            value={(values[field.key] as string) ?? ""}
            onChange={(v) => setField(field.key, v)}
          />
        ),
      )}

      <div className="flex items-center gap-4 border-t border-stone-200 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-600 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm font-medium text-moss-500">Saved.</span>}
      </div>
    </form>
  );
}

function SimpleFieldEditor({
  field,
  value,
  onChange,
}: {
  field: SimpleField;
  value: string;
  onChange: (v: string) => void;
}) {
  if (field.type === "image") {
    return <ImageField label={field.label} value={value} onChange={onChange} />;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-indigo-950">{field.label}</label>
      {field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-indigo-950 outline-none focus:border-indigo-500"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-indigo-950 outline-none focus:border-indigo-500"
        />
      )}
    </div>
  );
}

function ListFieldEditor({
  field,
  items,
  onChange,
}: {
  field: Extract<ContentSection["fields"][number], { type: "list" }>;
  items: ListItem[];
  onChange: (items: ListItem[]) => void;
}) {
  function updateItem(index: number, key: string, value: string) {
    const next = items.slice();
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  }

  function addItem() {
    const blank: ListItem = Object.fromEntries(field.fields.map((f) => [f.key, ""]));
    onChange([...items, blank]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-indigo-950">{field.label}</label>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-3 py-1 text-xs font-semibold text-indigo-950 hover:border-indigo-950"
        >
          <Plus className="h-3.5 w-3.5" /> Add {field.itemLabel.toLowerCase()}
        </button>
      </div>

      <div className="mt-3 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-stone-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-900/50">
                {field.itemLabel} {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-clay-600 hover:text-clay-500"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
            <div className="mt-3 space-y-3">
              {field.fields.map((sub) => (
                <SimpleFieldEditor
                  key={sub.key}
                  field={sub}
                  value={item[sub.key] ?? ""}
                  onChange={(v) => updateItem(index, sub.key, v)}
                />
              ))}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-indigo-900/50">Nothing here yet.</p>}
      </div>
    </div>
  );
}

function normalize(section: ContentSection, data: Record<string, unknown>): FormState {
  const result: FormState = {};
  for (const field of section.fields) {
    if (field.type === "list") {
      const raw = data[field.key];
      result[field.key] = Array.isArray(raw) ? (raw as ListItem[]) : [];
    } else {
      result[field.key] = typeof data[field.key] === "string" ? (data[field.key] as string) : "";
    }
  }
  return result;
}

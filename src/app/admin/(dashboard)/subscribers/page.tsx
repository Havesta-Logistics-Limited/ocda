import { db } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteSubscriberAction } from "@/lib/actions/newsletter";

export default async function AdminSubscribersPage() {
  const subscribers = await db.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-indigo-950">Newsletter subscribers</h1>
          <p className="mt-1 text-sm text-indigo-900/60">Everyone who signed up from the site.</p>
        </div>
        {subscribers.length > 0 && (
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(
              ["email,subscribed_at", ...subscribers.map((s) => `${s.email},${s.createdAt.toISOString()}`)].join("\n"),
            )}`}
            download="ocda-newsletter-subscribers.csv"
            className="rounded-full border-2 border-stone-200 px-4 py-2 text-sm font-semibold text-indigo-950 hover:border-gold-500"
          >
            Export CSV
          </a>
        )}
      </div>

      <div className="mt-6 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
        {subscribers.length === 0 && <p className="p-6 text-sm text-indigo-900/60">No subscribers yet.</p>}
        {subscribers.map((subscriber) => (
          <div key={subscriber.id} className="flex items-center justify-between gap-4 p-4">
            <span className="text-sm font-medium text-indigo-950">{subscriber.email}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-indigo-900/50">{subscriber.createdAt.toLocaleDateString()}</span>
              <DeleteButton action={deleteSubscriberAction.bind(null, subscriber.id)} label="Delete?" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

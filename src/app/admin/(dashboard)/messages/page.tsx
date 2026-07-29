import { db } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import MarkReadButton from "@/components/admin/MarkReadButton";
import { deleteMessageAction } from "@/lib/actions/messages";

export default async function AdminMessagesPage() {
  const messages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo-950">Messages</h1>
      <p className="mt-1 text-sm text-indigo-900/60">Submissions from the Contact page form.</p>

      <div className="mt-6 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white shadow-sm">
        {messages.length === 0 && <p className="p-6 text-sm text-indigo-900/60">No messages yet.</p>}
        {messages.map((message) => (
          <div key={message.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  {!message.read && <span className="h-2 w-2 rounded-full bg-clay-500" />}
                  <p className="font-semibold text-indigo-950">{message.name}</p>
                  <span className="text-sm text-indigo-900/50">{message.email}</span>
                </div>
                {message.phone && <p className="mt-0.5 text-sm text-indigo-900/50">{message.phone}</p>}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-indigo-900/40">{message.createdAt.toLocaleDateString()}</span>
                {!message.read && <MarkReadButton id={message.id} />}
                <DeleteButton action={deleteMessageAction.bind(null, message.id)} label="Delete?" />
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-indigo-900/80">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

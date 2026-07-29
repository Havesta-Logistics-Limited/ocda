import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTENT_SECTIONS } from "@/lib/content-schema";
import { db } from "@/lib/db";

const GROUP_LABELS: Record<string, string> = {
  home: "Home page",
  about: "About page",
  getInvolved: "Get Involved page",
  contact: "Contact page",
  site: "Site-wide",
};

export default async function AdminDashboardPage() {
  const [postCount, imageCount, unreadCount, subscriberCount] = await Promise.all([
    db.post.count(),
    db.galleryImage.count(),
    db.contactMessage.count({ where: { read: false } }),
    db.newsletterSubscriber.count(),
  ]);

  const groups = new Map<string, typeof CONTENT_SECTIONS>();
  for (const section of CONTENT_SECTIONS) {
    const groupKey = section.key.split(".")[0];
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey)!.push(section);
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold text-indigo-950">Dashboard</h1>
        <p className="mt-1 text-sm text-indigo-900/60">Everything below is live on the site as soon as you save it.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="News & events posts" value={postCount} href="/admin/news" />
        <StatCard label="Gallery photos" value={imageCount} href="/admin/gallery" />
        <StatCard label="Unread messages" value={unreadCount} href="/admin/messages" highlight={unreadCount > 0} />
        <StatCard label="Newsletter subscribers" value={subscriberCount} href="/admin/subscribers" />
      </div>

      <div className="space-y-8">
        {Array.from(groups.entries()).map(([groupKey, sections]) => (
          <div key={groupKey}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-indigo-900/50">
              {GROUP_LABELS[groupKey] ?? groupKey}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {sections.map((section) => (
                <Link
                  key={section.key}
                  href={`/admin/content/${section.key}`}
                  className="group flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm transition-colors hover:border-gold-500"
                >
                  <div>
                    <p className="font-semibold text-indigo-950">{section.label}</p>
                    <p className="mt-0.5 text-sm text-indigo-900/60">{section.description}</p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-indigo-900/40 group-hover:bg-gold-500/10 group-hover:text-gold-600">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  highlight,
}: {
  label: string;
  value: number;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-colors hover:border-gold-500"
    >
      <p className={`font-display text-3xl font-extrabold ${highlight ? "text-clay-600" : "text-indigo-950"}`}>
        {value}
      </p>
      <p className="mt-1 text-sm text-indigo-900/60">{label}</p>
    </Link>
  );
}

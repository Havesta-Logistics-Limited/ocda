import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-stone-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="mb-6">
              <p className="font-display text-lg font-bold text-indigo-950">OCDA Admin</p>
              <p className="text-sm text-indigo-900/60">{admin.name}</p>
            </div>
            <AdminNav />
            <div className="mt-6 space-y-3 border-t border-stone-200 pt-4">
              <Link href="/" className="block text-sm font-medium text-indigo-900/70 hover:text-indigo-950">
                View site →
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="text-sm font-medium text-clay-600 hover:text-clay-500">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

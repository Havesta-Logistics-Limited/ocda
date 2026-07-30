import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import MaintenanceToggle from "@/components/admin/MaintenanceToggle";
import { getContent } from "@/lib/content";

export default async function SettingsPage() {
  const maintenance = await getContent<{ enabled: boolean; message: string }>("site.maintenance");

  return (
    <div className="max-w-md space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold text-indigo-950">Settings</h1>
        <p className="mt-1 text-sm text-indigo-900/60">Change your admin password.</p>
        <div className="mt-6">
          <ChangePasswordForm />
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-bold text-indigo-950">Site status</h2>
        <p className="mt-1 text-sm text-indigo-900/60">Take the public site offline temporarily.</p>
        <div className="mt-6">
          <MaintenanceToggle initial={maintenance} />
        </div>
      </div>
    </div>
  );
}

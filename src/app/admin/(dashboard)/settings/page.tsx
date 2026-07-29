import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default function SettingsPage() {
  return (
    <div className="max-w-md">
      <h1 className="font-display text-2xl font-bold text-indigo-950">Settings</h1>
      <p className="mt-1 text-sm text-indigo-900/60">Change your admin password.</p>
      <div className="mt-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
}

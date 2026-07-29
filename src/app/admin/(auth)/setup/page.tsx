import { redirect } from "next/navigation";
import { hasAnyAdmin } from "@/lib/auth";
import SetupForm from "@/components/admin/SetupForm";

export default async function SetupPage() {
  if (await hasAnyAdmin()) redirect("/admin/login");

  return (
    <>
      <h1 className="font-display text-xl font-bold text-indigo-950">Create your admin account</h1>
      <p className="mt-1.5 text-sm text-indigo-900/60">
        This runs once. Once created, sign in from /admin/login to edit the site.
      </p>
      <div className="mt-6">
        <SetupForm />
      </div>
    </>
  );
}

import { redirect } from "next/navigation";
import { hasAnyAdmin, currentAdmin } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage() {
  if (!(await hasAnyAdmin())) redirect("/admin/setup");
  if (await currentAdmin()) redirect("/admin");

  return (
    <>
      <h1 className="font-display text-xl font-bold text-indigo-950">Sign in</h1>
      <p className="mt-1.5 text-sm text-indigo-900/60">Manage the OCDA website.</p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </>
  );
}

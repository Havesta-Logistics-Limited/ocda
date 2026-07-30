import { Wrench } from "lucide-react";

export default function MaintenanceNotice({ message }: { message: string }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-600">
        <Wrench className="h-6 w-6" />
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold text-indigo-950">We'll be right back</h1>
      <p className="mt-3 text-indigo-900/70">{message}</p>
    </div>
  );
}

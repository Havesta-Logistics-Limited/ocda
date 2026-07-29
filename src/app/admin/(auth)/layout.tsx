export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-stone-100 px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-display text-2xl font-extrabold text-indigo-950">OCDA</span>
          <p className="text-sm text-indigo-900/60">Site administration</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white shadow-sm p-8">{children}</div>
      </div>
    </div>
  );
}

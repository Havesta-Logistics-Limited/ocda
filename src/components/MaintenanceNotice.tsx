import Image from "next/image";

export default function MaintenanceNotice({ message, logoUrl }: { message: string; logoUrl?: string }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-indigo-950 px-6 text-center text-stone-50">
      <div className="relative flex flex-col items-center">
        {logoUrl ? (
          <Image src={logoUrl} alt="OCDA" width={160} height={40} className="h-10 w-auto" priority />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 font-display text-base font-extrabold text-white">
            O
          </span>
        )}

        <h1 className="mt-8 max-w-lg font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Building a stronger site, together.
        </h1>
        <p className="mt-4 max-w-sm text-indigo-200">{message}</p>

        <div className="maintenance-road mt-12 h-px w-64 max-w-[70vw] bg-indigo-800">
          <span className="maintenance-marker" />
        </div>
      </div>
    </div>
  );
}

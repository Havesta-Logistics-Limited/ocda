// lucide-react dropped brand/logo glyphs, so these are small hand-drawn
// stand-ins — enough to read as "Facebook / Instagram / X" at icon size.
type Props = { className?: string };

export function FacebookIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C16.5 3.06 15.55 3 14.44 3 12.1 3 10.5 4.42 10.5 7.2v2.4H7.75v3.2h2.75V21h3z" />
    </svg>
  );
}

export function InstagramIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4 4l7.3 8.4L4.4 20h1.9l6-6.9 4.6 6.9H20l-7.6-8.8L19.6 4h-1.9l-5.6 6.4L8 4H4z" />
    </svg>
  );
}

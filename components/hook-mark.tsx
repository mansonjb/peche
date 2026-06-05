/** Petit hameçon — la marque du site. Hérite de la couleur via currentColor. */
export function HookMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="4" r="1.9" />
      <path d="M12 5.9V13c0 4.4-5.2 5-6.4 1.1" />
      <path d="M5.6 14.1 7.2 14.8M5.6 14.1 5.4 15.9" />
    </svg>
  );
}

interface FlairPillProps {
  label: string;
  accent?: boolean;
  className?: string;
}

export default function FlairPill({ label, accent = false, className = "" }: FlairPillProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${className}`}
      style={{
        backgroundColor: accent ? "var(--pill-accent-bg)" : "var(--pill-bg)",
        color: accent ? "var(--pill-accent-text)" : "var(--pill-text)",
      }}
    >
      {label}
    </span>
  );
}

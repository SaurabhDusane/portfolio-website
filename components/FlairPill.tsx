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
        backgroundColor: accent ? "var(--accent-soft-bg)" : "var(--pill-bg)",
        color: accent ? "var(--accent-soft-text)" : "var(--pill-text)",
        transition: "background-color 0.2s, color 0.2s",
      }}
    >
      {label}
    </span>
  );
}

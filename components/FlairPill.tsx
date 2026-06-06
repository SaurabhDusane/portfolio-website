interface FlairPillProps {
  label: string;
  color?: string;
  className?: string;
}

export default function FlairPill({ label, color, className = "" }: FlairPillProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}
      style={{
        backgroundColor: color ? `${color}20` : "var(--card-hover)",
        borderColor: color || "var(--border)",
        color: color || "var(--text-muted)",
      }}
    >
      {label}
    </span>
  );
}

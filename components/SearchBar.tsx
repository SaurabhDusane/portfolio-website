"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search posts\u2026" }: SearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-md">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-hint)" }} />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch?.(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full pl-8 pr-3 py-1.5 rounded-full text-[12px] transition-colors focus:outline-none"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          transition: "background-color 0.2s, border-color 0.2s, color 0.2s",
        }}
      />
    </div>
  );
}

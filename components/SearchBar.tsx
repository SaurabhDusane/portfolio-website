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
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch?.(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-1.5 rounded-full bg-surface border border-border text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
      />
    </div>
  );
}

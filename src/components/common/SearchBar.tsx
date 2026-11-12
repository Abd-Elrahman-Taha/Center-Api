import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#858ba0]"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#141724] border border-white/10 rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#8b75f5] focus:ring-1 focus:ring-[#8b75f5] transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858ba0] hover:text-white"
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}

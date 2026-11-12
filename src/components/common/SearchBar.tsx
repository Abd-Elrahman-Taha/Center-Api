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
        size={17}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]/70"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#0d101b]/90 border border-white/10 rounded-xl text-white placeholder-[#72788c] focus:outline-none focus:border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/15 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858ba0] hover:text-[#f3dc92]"
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}

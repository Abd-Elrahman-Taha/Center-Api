import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-14 text-center rounded-2xl border border-dashed border-[#d4af37]/25 bg-gradient-to-b from-[#111420]/90 to-[#0b0d15]/95 shadow-[0_14px_36px_rgba(0,0,0,0.35)]">
      <div className="p-4 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#f3dc92] mb-4">
        <Icon size={30} />
      </div>
      <h3 className="text-xl font-bold text-white mb-1.5 font-['Cormorant_Garamond',serif]">
        {title}
      </h3>
      <p className="text-sm text-[#9ba1b6] max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0b0d14] bg-gradient-to-r from-[#f3dc92] via-[#d4af37] to-[#b58b24] hover:brightness-110 rounded-xl shadow-[0_10px_28px_rgba(212,175,55,0.28)] transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

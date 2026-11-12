import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
  count?: number;
}

export default function PageHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  icon: Icon,
  count,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/15">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/30 text-[#f3dc92] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <Icon size={22} />
          </div>
        )}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white font-['Cormorant_Garamond',serif]">
              {title}
            </h1>
            {count !== undefined && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#d4af37]/15 text-[#f3dc92] border border-[#d4af37]/30 font-['Outfit']">
                {count}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[#9ba1b6]">{subtitle}</p>
        </div>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0b0d14] bg-gradient-to-r from-[#f3dc92] via-[#d4af37] to-[#b58b24] hover:brightness-110 rounded-xl shadow-[0_10px_28px_rgba(212,175,55,0.28)] transition-all active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.4} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}

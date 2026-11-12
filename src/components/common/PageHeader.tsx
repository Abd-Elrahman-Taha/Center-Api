import React from "react";
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
      <div className="flex items-center gap-3.5">
        {Icon && (
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b75f5]/20 to-[#5599f5]/10 border border-[#8b75f5]/30 text-[#8b75f5]">
            <Icon size={24} />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white font-['Outfit']">
              {title}
            </h1>
            {count !== undefined && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#8b75f5]/20 text-[#a898ff] border border-[#8b75f5]/30">
                {count}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[#858ba0]">{subtitle}</p>
        </div>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#8b75f5] to-[#5543bc] hover:brightness-110 rounded-xl shadow-lg shadow-[#8b75f5]/25 transition-all active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}

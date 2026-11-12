import React from "react";
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
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-white/10 bg-[#141724]/60">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[#8b75f5] mb-4">
        <Icon size={32} />
      </div>
      <h3 className="text-base font-semibold text-white mb-1 font-['Outfit']">
        {title}
      </h3>
      <p className="text-sm text-[#858ba0] max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8b75f5] to-[#5543bc] hover:brightness-110 rounded-xl shadow-lg shadow-[#8b75f5]/25 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

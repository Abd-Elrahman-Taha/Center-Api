import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "purple" | "blue" | "green" | "amber" | "gray";
  size?: "sm" | "md";
}

export default function Badge({
  children,
  variant = "gold",
  size = "sm",
}: BadgeProps) {
  const variantStyles = {
    gold: "bg-[#d4af37]/15 text-[#f3dc92] border-[#d4af37]/30",
    purple: "bg-[#9b87f5]/15 text-[#c8bcff] border-[#9b87f5]/30",
    blue: "bg-[#5fa4f8]/15 text-[#9bc7ff] border-[#5fa4f8]/30",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    amber: "bg-[#d4af37]/15 text-[#f0d78c] border-[#d4af37]/30",
    gray: "bg-white/5 text-[#9ba1b6] border-white/10",
  }[variant];

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3 py-1 text-xs font-semibold",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg border ${variantStyles} ${sizeStyles}`}
    >
      {children}
    </span>
  );
}

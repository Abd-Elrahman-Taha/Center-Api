/**
 * Reusable Accessible Modal Component
 * Handles Escape key closing, body scroll locking, and backdrop clicks.
 */

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "lg",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidthClasses} my-8 bg-gradient-to-b from-[#131726] to-[#0b0e18] border border-[#d4af37]/25 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.08)] p-6 md:p-8 text-white transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#d4af37]/15">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white font-['Cormorant_Garamond',serif]">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-[#9ba1b6]">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9ba1b6] hover:text-[#f3dc92] rounded-xl hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

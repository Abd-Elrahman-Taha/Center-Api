import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

export default function LoadingSpinner({
  message = "Loading data...",
  size = 32,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <Loader2 size={size} className="animate-spin text-[#d4af37]" />
      <span className="text-sm font-medium text-[#9ba1b6]">{message}</span>
    </div>
  );
}

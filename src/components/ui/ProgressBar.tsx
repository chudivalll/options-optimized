import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: "blue" | "green" | "yellow" | "red";
}

export default function ProgressBar({
  value,
  max = 100,
  className,
  color = "blue",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    blue: "bg-gradient-to-r from-blue-500 to-blue-600",
    green: "bg-gradient-to-r from-green-500 to-emerald-600",
    yellow: "bg-gradient-to-r from-yellow-400 to-yellow-500",
    red: "bg-gradient-to-r from-red-500 to-red-600",
  };

  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2.5 overflow-hidden", className)}>
      <div
        className={cn("h-2.5 rounded-full transition-all duration-500", colors[color])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

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
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-500",
    red: "bg-red-600",
  };

  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2.5", className)}>
      <div
        className={cn("h-2.5 rounded-full transition-all duration-500", colors[color])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

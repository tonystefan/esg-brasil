import type { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryTagProps {
  category: Category;
  size?: "sm" | "md";
  className?: string;
}

const categoryConfig: Record<Category, { label: string; className: string }> = {
  E: { label: "Ambiental", className: "bg-green-100 text-green-700" },
  S: { label: "Social", className: "bg-blue-100 text-blue-700" },
  G: { label: "Governança", className: "bg-purple-100 text-purple-700" },
  SST: { label: "SST", className: "bg-orange-100 text-orange-700" },
};

export function CategoryTag({ category, size = "md", className }: CategoryTagProps) {
  const config = categoryConfig[category];
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full uppercase tracking-wide",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

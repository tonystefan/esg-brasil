import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: "Início", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center gap-1 text-sm">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
            {item.href && index < allItems.length - 1 ? (
              <Link href={item.href} className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
                {index === 0 && <Home className="w-3.5 h-3.5" />}
                {index > 0 && item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

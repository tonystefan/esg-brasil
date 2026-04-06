import { ArticleCard } from "@/components/ui/ArticleCard";
import { CategoryTag } from "@/components/ui/CategoryTag";
import type { Article, Category } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
  category: Category;
  articles: Article[];
  description: string;
}

export function CategorySection({ category, articles, description }: CategorySectionProps) {
  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div className="flex items-center gap-3">
          <CategoryTag category={category} />
          <p className="text-sm text-gray-500 hidden sm:block">{description}</p>
        </div>
        <Link href={`/noticias?cat=${category}`} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm transition-colors">
          Ver mais <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} variant="compact" />
        ))}
      </div>
    </div>
  );
}

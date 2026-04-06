import { ArticleCard } from "@/components/ui/ArticleCard";
import type { Article } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedNewsProps {
  articles: Article[];
}

export function FeaturedNews({ articles }: FeaturedNewsProps) {
  const [main, ...rest] = articles;
  if (!main) return null;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-2">Em destaque</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
            Últimas notícias
          </h2>
        </div>
        <Link href="/noticias" className="hidden sm:flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-600 transition-colors">
          Ver todas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main featured */}
        <div className="lg:col-span-2">
          <ArticleCard article={main} variant="featured" />
        </div>

        {/* Side list */}
        <div className="flex flex-col gap-2">
          {rest.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} variant="horizontal" />
          ))}
          <Link href="/noticias" className="flex items-center justify-center gap-2 mt-2 py-3 border border-green-200 rounded-xl text-green-700 font-medium text-sm hover:bg-green-50 transition-colors sm:hidden">
            Ver todas as notícias <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

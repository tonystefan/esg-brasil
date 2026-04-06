import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { CategoryTag } from "./CategoryTag";
import { formatDateShort } from "@/lib/utils";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  variant?: "featured" | "default" | "compact" | "horizontal";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <Link href={`/noticias/${article.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl card-hover h-full">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <CategoryTag category={article.category} className="mb-3" />
              <h2 className="font-bold text-xl md:text-2xl text-white leading-tight mb-2 group-hover:text-green-200 transition-colors" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
                {article.title}
              </h2>
              <p className="text-gray-300 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
              <div className="flex items-center gap-3 text-gray-400 text-xs">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDateShort(article.date)}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime} min</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/noticias/${article.slug}`} className="group block">
        <article className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={article.imageUrl} alt={article.title} fill className="object-cover" sizes="96px" />
          </div>
          <div className="flex-1 min-w-0">
            <CategoryTag category={article.category} size="sm" className="mb-1" />
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 leading-tight">{article.title}</h3>
            <p className="text-xs text-gray-400 mt-1">{formatDateShort(article.date)}</p>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/noticias/${article.slug}`} className="group block">
        <article className="border border-gray-100 rounded-xl overflow-hidden hover:border-green-200 card-hover transition-all">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image src={article.imageUrl} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
          <div className="p-4">
            <CategoryTag category={article.category} size="sm" className="mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-green-700 transition-colors line-clamp-2 leading-tight">{article.title}</h3>
            <p className="text-xs text-gray-400 mt-2">{formatDateShort(article.date)} · {article.readingTime} min</p>
          </div>
        </article>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/noticias/${article.slug}`} className="group block">
      <article className="border border-gray-100 rounded-2xl overflow-hidden card-hover h-full flex flex-col">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <CategoryTag category={article.category} className="mb-3 self-start" />
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-700 transition-colors line-clamp-2 leading-tight mb-2" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed flex-1">{article.excerpt}</p>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50 text-gray-400 text-xs">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDateShort(article.date)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime} min de leitura</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllArticles, getArticlesByCategory } from "@/lib/articles";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { AdSlot } from "@/components/ui/AdSlot";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { Category } from "@/types";
import Link from "next/link";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Notícias ESG e SST",
  description: "Todas as notícias, análises e artigos sobre ESG (Environmental, Social and Governance) e SST (Saúde e Segurança do Trabalho) no Brasil.",
};

const categories: { id: Category | "ALL"; label: string }[] = [
  { id: "ALL", label: "Todas" },
  { id: "E", label: "Ambiental" },
  { id: "S", label: "Social" },
  { id: "G", label: "Governança" },
  { id: "SST", label: "SST" },
];

interface PageProps {
  searchParams: Promise<{ cat?: string; q?: string; page?: string }>;
}

export default async function NoticiasPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeCategory = params.cat as Category | undefined;
  const searchQuery = params.q || "";

  let articles = activeCategory
    ? getArticlesByCategory(activeCategory)
    : getAllArticles();

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  const allArticles = getAllArticles();
  const mostRead = allArticles.slice(0, 5);
  const allTags = Array.from(new Set(allArticles.flatMap((a) => a.tags))).slice(0, 20);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Notícias" }]} />
          <div className="pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
              Notícias ESG & SST
            </h1>

            {/* Search */}
            <form method="get" className="relative max-w-lg mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Buscar por tema, NR, regulação..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              />
            </form>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.id === "ALL" ? "/noticias" : `/noticias?cat=${cat.id}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    (cat.id === "ALL" && !activeCategory) || cat.id === activeCategory
                      ? "bg-green-700 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {articles.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg font-medium mb-2">Nenhum resultado encontrado</p>
                <p className="text-sm">Tente outro termo ou categoria</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-6">
                  {articles.length} {articles.length === 1 ? "artigo encontrado" : "artigos encontrados"}
                  {activeCategory && <span> em <strong>{categories.find(c => c.id === activeCategory)?.label}</strong></span>}
                  {searchQuery && <span> para <strong>&ldquo;{searchQuery}&rdquo;</strong></span>}
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {articles.map((article) => (
                    <ArticleCard key={article.slug} article={article} variant="default" />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdSlot position="sidebar" />

            {/* Most read */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Mais lidos</h3>
              <div className="space-y-4">
                {mostRead.map((article, i) => (
                  <Link key={article.slug} href={`/noticias/${article.slug}`} className="flex items-start gap-3 group">
                    <span className="text-2xl font-black text-gray-200 leading-none w-6 flex-shrink-0">{i + 1}</span>
                    <div>
                      <CategoryTag category={article.category} size="sm" className="mb-1" />
                      <p className="text-sm text-gray-700 font-medium group-hover:text-green-700 transition-colors leading-tight line-clamp-2">{article.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Tags populares</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/noticias?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-gray-50 hover:bg-green-50 hover:text-green-700 border border-gray-200 hover:border-green-200 rounded-full text-xs text-gray-600 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter mini */}
            <div className="bg-green-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">Newsletter ESG Brasil</h3>
              <p className="text-green-200 text-sm mb-4">Receba as principais notícias toda semana.</p>
              <Link href="/#newsletter" className="block w-full text-center bg-white text-green-700 font-semibold py-2.5 rounded-xl text-sm hover:bg-green-50 transition-colors">
                Inscrever-se grátis
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

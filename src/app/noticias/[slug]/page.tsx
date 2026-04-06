import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, Share2, Globe, MessageCircle, X } from "lucide-react";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado" };

  return {
    title: article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.metaDescription || article.excerpt,
      images: [{ url: article.imageUrl }],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, article.category);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esgbrasil.com.br";
  const articleUrl = `${siteUrl}/noticias/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: article.imageUrl,
    datePublished: article.date,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "ESG Brasil", logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` } },
    url: articleUrl,
  };

  // Convert markdown-like content to HTML (simple transform for display)
  const htmlContent = article.content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\*\*(.+?)\*\*$/gm, '<strong>$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|b|l])/gm, '')
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      if (line.startsWith('<h2>') || line.startsWith('<h3>') || line.startsWith('<ul>') || line.startsWith('<blockquote>')) return line;
      if (line.startsWith('<li>')) return line;
      return `<p>${line}</p>`;
    })
    .join('\n');

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ label: "Notícias", href: "/noticias" }, { label: article.title }]} />
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Meta */}
          <div className="mb-6">
            <CategoryTag category={article.category} className="mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
              {article.title}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-6">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{article.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(article.date)}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readingTime} min de leitura</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-10">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Ad slot */}
          <AdSlot position="in-content" className="mb-10" />

          {/* Content */}
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/noticias?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1.5 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200 rounded-full text-xs text-gray-600 hover:text-green-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-600"><Share2 className="w-4 h-4" />Compartilhar:</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Globe className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" /> X
              </a>
            </div>
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
                Leia também
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom ad */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdSlot position="footer" />
        </div>
      </div>
    </>
  );
}

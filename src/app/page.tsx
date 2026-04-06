import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedNews } from "@/components/home/FeaturedNews";
import { CategorySection } from "@/components/home/CategorySection";
import { CTABanner } from "@/components/home/CTABanner";
import { NormasSection } from "@/components/home/NormasSection";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { AdSlot } from "@/components/ui/AdSlot";
import { getAllArticles, getArticlesByCategory, getFeaturedArticles } from "@/lib/articles";
import { getAllNormas } from "@/lib/normas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESG Brasil — Referência em ESG e SST no Brasil",
  description: "Notícias, análises e ferramentas sobre ESG (Environmental, Social and Governance) e SST (Saúde e Segurança do Trabalho) para profissionais e empresas brasileiras.",
};

export default function HomePage() {
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const mainFeatured = featuredArticles[0] || allArticles[0];
  const normas = getAllNormas();

  const envArticles = getArticlesByCategory("E");
  const socialArticles = getArticlesByCategory("S");
  const govArticles = getArticlesByCategory("G");
  const sstArticles = getArticlesByCategory("SST");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ESG Brasil",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://esgbrasil.com.br",
    description: "Portal de referência em ESG e SST no Brasil",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://esgbrasil.com.br"}/noticias?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <HeroSection featuredArticle={mainFeatured} />

      {/* Ad slot - after hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdSlot position="header" />
      </div>

      {/* Featured News Grid */}
      <FeaturedNews articles={allArticles.slice(0, 4)} />

      {/* CTA Banner */}
      <CTABanner />

      {/* Por Categoria */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Por categoria</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
            Explore por tema
          </h2>
        </div>
        <div className="mt-10 space-y-14">
          {envArticles.length > 0 && (
            <CategorySection category="E" articles={envArticles} description="Clima, carbono e meio ambiente" />
          )}
          <div className="border-t border-gray-100 pt-14">
            {socialArticles.length > 0 && (
              <CategorySection category="S" articles={socialArticles} description="Pessoas, diversidade e comunidade" />
            )}
          </div>
          <div className="border-t border-gray-100 pt-14">
            {govArticles.length > 0 && (
              <CategorySection category="G" articles={govArticles} description="Ética, transparência e compliance" />
            )}
          </div>
          <div className="border-t border-gray-100 pt-14">
            {sstArticles.length > 0 && (
              <CategorySection category="SST" articles={sstArticles} description="NRs, riscos e bem-estar" />
            )}
          </div>
        </div>
      </section>

      {/* Normas em Foco */}
      <NormasSection normas={normas} />

      {/* Ad slot - before newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdSlot position="in-content" />
      </div>

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
}

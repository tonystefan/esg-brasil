"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Shield, Leaf } from "lucide-react";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { formatDateShort } from "@/lib/utils";
import type { Article } from "@/types";

interface HeroSectionProps {
  featuredArticle: Article;
}

export function HeroSection({ featuredArticle }: HeroSectionProps) {
  return (
    <section className="hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-green-700/50 text-green-200 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                <TrendingUp className="w-3 h-3" />
                Destaque do dia
              </span>
            </div>
            <CategoryTag category={featuredArticle.category} className="mb-4" />
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-sora, system-ui)" }}
            >
              {featuredArticle.title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {featuredArticle.excerpt}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/noticias/${featuredArticle.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-green-900/30"
              >
                Ler artigo completo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculadora"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Shield className="w-4 h-4" />
                Verificar Conformidade
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Por {featuredArticle.author} · {formatDateShort(featuredArticle.date)}
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent" />
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Portal ESG líder</p>
                <p className="text-sm font-bold text-gray-900">10.000+ profissionais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

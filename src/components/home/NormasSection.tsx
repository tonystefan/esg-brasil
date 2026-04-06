import Link from "next/link";
import { FileText, ArrowRight, AlertCircle } from "lucide-react";
import type { NormaGuide } from "@/types";

interface NormasSectionProps {
  normas: NormaGuide[];
}

export function NormasSection({ normas }: NormasSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-2">Regulatório</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
              Normas em foco
            </h2>
          </div>
          <Link href="/normas" className="hidden sm:flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm transition-colors">
            Ver todas as normas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {normas.slice(0, 3).map((norma) => (
            <Link key={norma.nr} href={`/normas#${norma.nr.toLowerCase().replace("-", "")}`} className="group block">
              <article className="bg-white border border-gray-200 rounded-2xl p-6 h-full hover:border-orange-200 card-hover transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">{norma.nr}</span>
                    <p className="text-xs text-gray-400">Atualização: {norma.lastUpdate}</p>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-3 group-hover:text-orange-700 transition-colors">
                  {norma.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{norma.summary}</p>
                <div className="flex items-center gap-1 mt-4 text-xs text-orange-600 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Ver obrigações
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-12 bg-green-50 border-y border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
              Descubra o nível de conformidade ESG da sua empresa →
            </h2>
            <div className="flex flex-wrap gap-4 mt-3">
              {["Análise gratuita", "Resultado imediato", "Recomendações práticas"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/calculadora"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all hover:shadow-lg shadow-green-200"
          >
            Calcular minha conformidade <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

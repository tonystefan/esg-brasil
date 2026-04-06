import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CalculatorWrapper } from "@/components/calculadora/CalculatorWrapper";
import { CheckCircle, Shield, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Calculadora de Conformidade ESG",
  description: "Descubra o nível de conformidade ESG e SST da sua empresa. Avaliação gratuita com resultado imediato e recomendações práticas.",
};

export default function CalculadoraPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Calculadora ESG" }]} />
          <div className="pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
                  Calculadora de Conformidade ESG
                </h1>
              </div>
            </div>
            <p className="text-gray-500 text-lg max-w-2xl">
              Avalie o nível de conformidade ESG e SST da sua empresa em minutos. Identifique gaps e receba recomendações priorizadas.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              {["100% gratuito", "Resultado imediato", "Dados salvos automaticamente", "Recomendações práticas"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CalculatorWrapper />
      </div>

      {/* Info section */}
      <div className="bg-white border-t border-gray-200 py-16 mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
            Como funciona a avaliação?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Perfil da empresa", desc: "Informe setor, porte e número de funcionários para personalizar os critérios de avaliação." },
              { step: "2", title: "Checklist por categoria", desc: "Responda perguntas sobre práticas ambientais, sociais, de governança e segurança do trabalho." },
              { step: "3", title: "Score e recomendações", desc: "Receba um score visual, identifique gaps e veja ações prioritárias para melhorar sua conformidade." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

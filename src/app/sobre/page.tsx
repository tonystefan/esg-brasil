import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Leaf, Mail, Globe, Shield, Target, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre o ESG Brasil",
  description: "Conheça o portal ESG Brasil, a referência em ESG e SST para profissionais e empresas no Brasil.",
};

export default function SobrePage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Sobre" }]} />
          <div className="pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
              Sobre o ESG Brasil
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="flex items-start gap-6 mb-16 p-8 bg-green-50 rounded-2xl border border-green-100">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Leaf className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-sora, system-ui)" }}>Nossa missão</h2>
            <p className="text-gray-600 leading-relaxed">
              O ESG Brasil nasceu para ser a referência brasileira em ESG (Environmental, Social and Governance) e SST (Saúde e Segurança do Trabalho).
              Acreditamos que informação de qualidade, acessível e contextualizada para a realidade brasileira é o primeiro passo para empresas de todos os portes avançarem em sustentabilidade e conformidade.
            </p>
          </div>
        </div>

        {/* What we do */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: BookOpen, title: "Conteúdo editorial", desc: "Notícias, análises e artigos escritos por especialistas em ESG e SST, contextualizados para o mercado brasileiro." },
            { icon: Target, title: "Ferramentas práticas", desc: "Calculadora de conformidade ESG, guias de NRs e calendário regulatório para apoiar a tomada de decisão." },
            { icon: Shield, title: "Foco regulatório", desc: "Acompanhamento das principais mudanças legislativas, normativas e regulatórias que impactam as empresas brasileiras." },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div id="disclaimer" className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-16">
          <h2 className="text-lg font-bold text-amber-900 mb-3">Aviso legal importante</h2>
          <div className="text-sm text-amber-800 space-y-2 leading-relaxed">
            <p>O conteúdo publicado no portal ESG Brasil tem caráter estritamente informativo e educacional.</p>
            <p>As informações aqui disponibilizadas <strong>não constituem assessoria jurídica, consultoria técnica ou recomendação profissional</strong> de qualquer natureza.</p>
            <p>A legislação trabalhista, ambiental e de SST está em constante evolução. Sempre consulte um profissional habilitado (advogado, engenheiro de segurança, médico do trabalho) antes de tomar decisões baseadas no conteúdo deste portal.</p>
            <p>O portal ESG Brasil não se responsabiliza por decisões tomadas com base no conteúdo aqui publicado.</p>
          </div>
        </div>

        {/* Contact */}
        <div id="contato" className="bg-gray-900 rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-sora, system-ui)" }}>Entre em contato</h2>
          <div className="space-y-4">
            <a href="mailto:contato@esgbrasil.com.br" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              contato@esgbrasil.com.br
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
              linkedin.com/company/esgbrasil
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              Para parcerias editoriais, publicidade ou propostas de conteúdo, entre em contato pelo e-mail acima.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

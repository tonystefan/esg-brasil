import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getAllNormas } from "@/lib/normas";
import { AdSlot } from "@/components/ui/AdSlot";
import { FileText, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Guia de Normas Regulamentadoras (NRs) e Legislação ESG",
  description: "Guia completo das principais NRs de saúde e segurança do trabalho e da legislação ESG brasileira. Resumo executivo, obrigações e penalidades.",
};

const regulacaoESG = [
  { title: "Lei 14.611/23 — Equidade Salarial", desc: "Transparência salarial de gênero e raça para empresas com 100+ funcionários", tag: "Social", date: "2023" },
  { title: "Lei 13.709/18 — LGPD", desc: "Proteção de dados pessoais, base legal para tratamento, direitos dos titulares", tag: "Governança", date: "2018/2020" },
  { title: "Lei 12.846/13 — Lei Anticorrupção", desc: "Responsabilização de pessoas jurídicas por atos contra a administração pública", tag: "Governança", date: "2013" },
  { title: "Lei 14.133/21 — Nova Lei de Licitações", desc: "Incorpora critérios ESG nos processos de contratação pública", tag: "Governança", date: "2021" },
  { title: "Lei 14.457/22 — Programa Emprega + Mulheres", desc: "Canal de denúncias obrigatório e medidas contra assédio no trabalho", tag: "Social", date: "2022" },
  { title: "Res. CVM 59/21 — Informe de Sustentabilidade", desc: "Obrigação de divulgação ESG para companhias abertas (modelo pratique ou explique)", tag: "Ambiental/ESG", date: "2021" },
];

const tagColors: Record<string, string> = {
  Social: "bg-blue-50 text-blue-700",
  Governança: "bg-purple-50 text-purple-700",
  "Ambiental/ESG": "bg-green-50 text-green-700",
};

export default function NormasPage() {
  const normas = getAllNormas();

  const calendarItems = [
    { date: "Março / Setembro", event: "Relatório de Transparência Salarial (Lei 14.611/23)", category: "Social" },
    { date: "Janeiro", event: "Renovação de ASOs periódicos (PCMSO — NR-7)", category: "SST" },
    { date: "Anual", event: "Revisão do PGR — Programa de Gerenciamento de Riscos (NR-1)", category: "SST" },
    { date: "Anual", event: "Eleições da CIPA (NR-5)", category: "SST" },
    { date: "Abril", event: "SIPAT — Semana Interna de Prevenção de Acidentes de Trabalho", category: "SST" },
    { date: "Contínuo", event: "Envio de eventos SST ao eSocial (S-2210, S-2220, S-2240)", category: "SST" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Normas & NRs" }]} />
          <div className="pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
              Normas &amp; Legislação ESG
            </h1>
            <p className="text-gray-500 max-w-2xl">
              Guia executivo das principais NRs, leis trabalhistas e regulações ESG que impactam as empresas brasileiras.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AdSlot position="header" className="mb-10" />

        {/* NRs Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
              Normas Regulamentadoras (NRs) em destaque
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {normas.map((norma) => (
              <article
                key={norma.nr}
                id={norma.nr.toLowerCase().replace("-", "")}
                className="border border-gray-200 rounded-2xl p-6 hover:border-orange-200 transition-colors scroll-mt-20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-orange-600 uppercase tracking-wide">{norma.nr}</span>
                      <p className="text-xs text-gray-400">Atualização: {norma.lastUpdate}</p>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-3 leading-tight">{norma.title}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{norma.summary}</p>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Quem se aplica
                    </p>
                    <p className="text-gray-600 bg-gray-50 rounded-lg p-3 text-xs leading-relaxed">{norma.appliesTo}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" /> Principais obrigações
                    </p>
                    <ul className="space-y-1">
                      {norma.obligations.map((obs, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                          {obs}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Penalidades
                    </p>
                    <p className="text-xs text-red-600 bg-red-50 rounded-lg p-3 leading-relaxed">{norma.penalties}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Legislação ESG */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
              Legislação ESG Brasileira
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regulacaoESG.map((lei) => (
              <article key={lei.title} className="border border-gray-100 rounded-2xl p-5 hover:border-green-200 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[lei.tag] || "bg-gray-100 text-gray-600"}`}>
                    {lei.tag}
                  </span>
                  <span className="text-xs text-gray-400">{lei.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">{lei.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{lei.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Calendário */}
        <section id="calendario" className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
              Calendário Regulatório
            </h2>
          </div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="divide-y divide-gray-200">
              {calendarItems.map((item, i) => (
                <div key={i} className="flex items-center gap-6 px-6 py-4 hover:bg-white transition-colors">
                  <div className="w-32 flex-shrink-0">
                    <span className="text-sm font-bold text-green-700">{item.date}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.event}</p>
                  </div>
                  <div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      item.category === "SST" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                    }`}>
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AdSlot position="footer" />
      </div>
    </div>
  );
}

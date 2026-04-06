"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Mail } from "lucide-react";
import type { ChecklistItem, CalculatorProfile, Category } from "@/types";

// ---- CHECKLIST DATA ----
const checklistItems: ChecklistItem[] = [
  // ENVIRONMENTAL
  { id: "e1", description: "A empresa realiza inventário anual de resíduos sólidos gerados na operação", legalBasis: "Lei 12.305/10 (PNRS)", riskLevel: "important", category: "E", status: "non-compliant" },
  { id: "e2", description: "Existe plano de gerenciamento de resíduos sólidos (PGRS) documentado", legalBasis: "Lei 12.305/10 art. 20", riskLevel: "important", category: "E", status: "non-compliant" },
  { id: "e3", description: "A empresa monitora e registra seu consumo mensal de energia elétrica", legalBasis: "ISO 14001 / GRI 302", riskLevel: "recommended", category: "E", status: "non-compliant" },
  { id: "e4", description: "Existe política formal de compras sustentáveis ou critérios de ESG para fornecedores", legalBasis: "ISO 14001 / GRI 308", riskLevel: "recommended", category: "E", status: "non-compliant" },
  { id: "e5", description: "A empresa possui licenças ambientais vigentes exigidas para sua atividade", legalBasis: "Lei 6.938/81 / Resolução CONAMA 237", riskLevel: "critical", category: "E", status: "non-compliant" },
  { id: "e6", description: "Existe programa de redução de emissões de gases de efeito estufa (GEE)", legalBasis: "GHG Protocol / GRI 305", riskLevel: "recommended", category: "E", status: "non-compliant" },
  // SOCIAL
  { id: "s1", description: "A empresa cumpre a cota de pessoas com deficiência (Lei 8.213/91) quando obrigatório", legalBasis: "Lei 8.213/91 art. 93", riskLevel: "critical", category: "S", status: "non-compliant", appliesTo: ["100+"] },
  { id: "s2", description: "Foi realizada pesquisa de clima organizacional no último ano", legalBasis: "GRI 401 / ISO 26000", riskLevel: "recommended", category: "S", status: "non-compliant" },
  { id: "s3", description: "A empresa publica relatório de transparência salarial (Lei 14.611/23)", legalBasis: "Lei 14.611/23", riskLevel: "critical", category: "S", status: "non-compliant", appliesTo: ["100+"] },
  { id: "s4", description: "Existe política formal de não discriminação e combate ao assédio documentada", legalBasis: "CLT / Lei 14.457/22", riskLevel: "important", category: "S", status: "non-compliant" },
  { id: "s5", description: "A empresa realiza programas de capacitação e desenvolvimento profissional para funcionários", legalBasis: "GRI 404", riskLevel: "recommended", category: "S", status: "non-compliant" },
  { id: "s6", description: "Existe canal de denúncias ativo para relatos de assédio (Lei 14.457/22)", legalBasis: "Lei 14.457/22 art. 23", riskLevel: "critical", category: "S", status: "non-compliant", appliesTo: ["CIPA"] },
  // GOVERNANCE
  { id: "g1", description: "A empresa possui Código de Conduta ou Ética formal e documentado", legalBasis: "Lei 12.846/13 / GRI 2-23", riskLevel: "important", category: "G", status: "non-compliant" },
  { id: "g2", description: "Existe canal de denúncias independente (ouvidoria/whistleblowing)", legalBasis: "Lei 12.846/13 / Dec. 8.420/15", riskLevel: "important", category: "G", status: "non-compliant" },
  { id: "g3", description: "A empresa tem política de compliance anticorrupção implementada", legalBasis: "Lei 12.846/13", riskLevel: "critical", category: "G", status: "non-compliant" },
  { id: "g4", description: "As demonstrações financeiras são auditadas por empresa independente", legalBasis: "Lei 6.404/76 / CVM", riskLevel: "important", category: "G", status: "non-compliant" },
  { id: "g5", description: "Existe política de proteção de dados pessoais (LGPD) implementada", legalBasis: "Lei 13.709/18 (LGPD)", riskLevel: "critical", category: "G", status: "non-compliant" },
  { id: "g6", description: "A empresa publica relatório de sustentabilidade ou ESG anualmente", legalBasis: "GRI / ISSB", riskLevel: "recommended", category: "G", status: "non-compliant" },
  // SST
  { id: "sst1", description: "O Programa de Gerenciamento de Riscos (PGR) está elaborado e atualizado", legalBasis: "NR-1", riskLevel: "critical", category: "SST", status: "non-compliant" },
  { id: "sst2", description: "O PCMSO (Programa de Controle Médico de Saúde Ocupacional) está vigente", legalBasis: "NR-7", riskLevel: "critical", category: "SST", status: "non-compliant" },
  { id: "sst3", description: "Todos os trabalhadores possuem ASO (Atestado de Saúde Ocupacional) vigente", legalBasis: "NR-7", riskLevel: "critical", category: "SST", status: "non-compliant" },
  { id: "sst4", description: "A CIPA está constituída e funcionando regularmente (quando obrigatória)", legalBasis: "NR-5", riskLevel: "critical", category: "SST", status: "non-compliant", appliesTo: ["CIPA"] },
  { id: "sst5", description: "Os EPIs necessários são fornecidos gratuitamente e estão com CA válido", legalBasis: "NR-6", riskLevel: "critical", category: "SST", status: "non-compliant" },
  { id: "sst6", description: "Os eventos SST do eSocial (S-2210, S-2220, S-2240) estão sendo enviados corretamente", legalBasis: "eSocial SST", riskLevel: "critical", category: "SST", status: "non-compliant" },
  { id: "sst7", description: "Existe laudo de insalubridade/periculosidade atualizado (quando aplicável)", legalBasis: "NR-15 / NR-16", riskLevel: "important", category: "SST", status: "non-compliant" },
  { id: "sst8", description: "Os trabalhadores que atuam em altura receberam treinamento NR-35", legalBasis: "NR-35", riskLevel: "critical", category: "SST", status: "non-compliant", appliesTo: ["altura"] },
];

type ItemStatus = "compliant" | "non-compliant" | "na";

interface StepConfig {
  title: string;
  description: string;
  category?: Category;
}

const steps: StepConfig[] = [
  { title: "Perfil da empresa", description: "Informe os dados básicos para personalizar a avaliação" },
  { title: "Ambiental (E)", description: "Avalie práticas ambientais e de gestão de recursos", category: "E" },
  { title: "Social (S)", description: "Avalie políticas sociais, trabalhistas e de diversidade", category: "S" },
  { title: "Governança (G)", description: "Avalie práticas de ética, compliance e transparência", category: "G" },
  { title: "SST — Saúde e Segurança", description: "Avalie conformidade com NRs e saúde ocupacional", category: "SST" },
  { title: "Resultado", description: "Seu score de conformidade ESG" },
];

const STORAGE_KEY = "esg-brasil-calculator";

function GaugeChart({ value, size = 120, label }: { value: number; size?: number; label?: string; color?: string }) {
  const r = size / 2 - 10;
  const circumference = Math.PI * r;
  const progress = (value / 100) * circumference;
  const getColor = (v: number) => v >= 70 ? "#15803d" : v >= 40 ? "#d97706" : "#dc2626";

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {/* Background arc */}
        <path
          d={`M 10 ${size / 2} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={`M 10 ${size / 2} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none"
          stroke={getColor(value)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
        <text x={size / 2} y={size / 2 + 4} textAnchor="middle" className="font-bold" style={{ fontSize: size * 0.18, fontWeight: 700, fill: "#111827" }}>
          {value}%
        </text>
      </svg>
      {label && <p className="text-xs font-medium text-gray-500 mt-1">{label}</p>}
    </div>
  );
}

const riskColors = { critical: "text-red-600 bg-red-50", important: "text-amber-600 bg-amber-50", recommended: "text-blue-600 bg-blue-50" };
const riskLabels = { critical: "Crítico", important: "Importante", recommended: "Recomendado" };

export function CalculatorWrapper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<CalculatorProfile>({ sector: "", size: "", employees: 10, hasSST: false });
  const [itemStatuses, setItemStatuses] = useState<Record<string, ItemStatus>>({});
  const [submitted, setSubmitted] = useState(false);
  const [expertEmail, setExpertEmail] = useState("");

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.profile) setProfile(data.profile);
        if (data.itemStatuses) setItemStatuses(data.itemStatuses);
        if (data.currentStep !== undefined) setCurrentStep(data.currentStep);
      }
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, itemStatuses, currentStep }));
    } catch {}
  }, [profile, itemStatuses, currentStep]);

  const setItemStatus = (id: string, status: ItemStatus) => {
    setItemStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const getItemsForStep = (step: number): ChecklistItem[] => {
    const stepConfig = steps[step];
    if (!stepConfig?.category) return [];
    return checklistItems.filter((item) => item.category === stepConfig.category);
  };

  const calculateScore = () => {
    const byCategory: Record<string, { total: number; compliant: number }> = { E: { total: 0, compliant: 0 }, S: { total: 0, compliant: 0 }, G: { total: 0, compliant: 0 }, SST: { total: 0, compliant: 0 } };
    checklistItems.forEach((item) => {
      const status = itemStatuses[item.id] || "non-compliant";
      if (status !== "na") {
        byCategory[item.category].total++;
        if (status === "compliant") byCategory[item.category].compliant++;
      }
    });

    const categoryScores: Record<string, number> = {};
    let totalPoints = 0, totalMax = 0;
    Object.entries(byCategory).forEach(([cat, { total, compliant }]) => {
      categoryScores[cat] = total > 0 ? Math.round((compliant / total) * 100) : 0;
      totalPoints += compliant;
      totalMax += total;
    });
    const overall = totalMax > 0 ? Math.round((totalPoints / totalMax) * 100) : 0;

    const gaps = checklistItems.filter((item) => (itemStatuses[item.id] || "non-compliant") === "non-compliant").sort((a, b) => {
      const order = { critical: 0, important: 1, recommended: 2 };
      return order[a.riskLevel] - order[b.riskLevel];
    });

    return { overall, categoryScores, gaps };
  };

  const canAdvance = (): boolean => {
    if (currentStep === 0) return !!profile.sector && !!profile.size;
    return true;
  };

  const reset = () => {
    setCurrentStep(0);
    setProfile({ sector: "", size: "", employees: 10, hasSST: false });
    setItemStatuses({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const progressPct = (currentStep / (steps.length - 1)) * 100;

  // STEP 0 — Profile
  if (currentStep === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Progress */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-green-600 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Passo 1 de {steps.length}</p>
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>{steps[0].title}</h2>
              <p className="text-sm text-gray-500 mt-1">{steps[0].description}</p>
            </div>
            <button onClick={reset} className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Setor de atuação *</label>
                <select
                  value={profile.sector}
                  onChange={(e) => setProfile((p) => ({ ...p, sector: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">Selecione o setor</option>
                  {["Indústria", "Comércio", "Serviços", "Construção Civil", "Saúde", "Agronegócio", "TI / Tecnologia", "Outro"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Porte da empresa *</label>
                <select
                  value={profile.size}
                  onChange={(e) => setProfile((p) => ({ ...p, size: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">Selecione o porte</option>
                  <option value="MEI">MEI (Microempreendedor Individual)</option>
                  <option value="ME">ME (Microempresa, até 9 func.)</option>
                  <option value="EPP">EPP (Pequeno Porte, 10-49 func.)</option>
                  <option value="Médio">Médio Porte (50-249 func.)</option>
                  <option value="Grande">Grande Empresa (250+ func.)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de funcionários: <strong className="text-green-700">{profile.employees}</strong>
              </label>
              <input
                type="range"
                min={1}
                max={5000}
                value={profile.employees}
                onChange={(e) => setProfile((p) => ({ ...p, employees: Number(e.target.value) }))}
                className="w-full accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span><span>100</span><span>500</span><span>1.000</span><span>5.000+</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Possui área ou profissional de SST (Saúde e Segurança do Trabalho)?</label>
              <div className="flex gap-3">
                {[{ value: true, label: "Sim" }, { value: false, label: "Não" }].map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => setProfile((p) => ({ ...p, hasSST: opt.value }))}
                    className={`px-6 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      profile.hasSST === opt.value
                        ? "bg-green-700 text-white border-green-700"
                        : "bg-white text-gray-600 border-gray-300 hover:border-green-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={() => canAdvance() && setCurrentStep(1)}
              disabled={!canAdvance()}
              className="flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Iniciar avaliação <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEPS 1-4 — Checklist
  if (currentStep >= 1 && currentStep <= 4) {
    const items = getItemsForStep(currentStep);
    const stepConfig = steps[currentStep];

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-green-600 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Passo {currentStep + 1} de {steps.length}</p>
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-sora, system-ui)" }}>{stepConfig.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{stepConfig.description}</p>
            </div>
            <button onClick={reset} className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
            </button>
          </div>

          <p className="text-xs text-gray-400 mb-6 bg-gray-50 rounded-lg px-4 py-2">
            Para cada item, selecione: <strong>Conforme</strong> (atende), <strong>Não conforme</strong> (não atende) ou <strong>N/A</strong> (não se aplica)
          </p>

          <div className="space-y-4">
            {items.map((item) => {
              const status = itemStatuses[item.id] || "non-compliant";
              return (
                <div key={item.id} className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${riskColors[item.riskLevel]}`}>
                          {riskLabels[item.riskLevel]}
                        </span>
                        <span className="text-xs text-gray-400">Base: {item.legalBasis}</span>
                      </div>
                      <p className="text-sm text-gray-800 font-medium leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {(["compliant", "non-compliant", "na"] as ItemStatus[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => setItemStatus(item.id, s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            status === s
                              ? s === "compliant"
                                ? "bg-green-600 text-white border-green-600"
                                : s === "non-compliant"
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-gray-400 text-white border-gray-400"
                              : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {s === "compliant" ? "✓ Sim" : s === "non-compliant" ? "✗ Não" : "N/A"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              className="flex items-center gap-2 text-gray-600 border border-gray-200 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" /> Voltar
            </button>
            <button
              onClick={() => setCurrentStep((s) => s + 1)}
              className="flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
            >
              {currentStep === 4 ? "Ver resultado" : "Próxima categoria"} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 5 — Results
  const { overall, categoryScores, gaps } = calculateScore();

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: "Excelente", color: "text-green-600" };
    if (score >= 60) return { label: "Bom", color: "text-blue-600" };
    if (score >= 40) return { label: "Regular", color: "text-amber-600" };
    return { label: "Crítico", color: "text-red-600" };
  };

  const scoreInfo = getScoreLabel(overall);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-1 bg-green-600" />
      <div className="p-8">
        <div className="text-center mb-10">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Avaliação concluída</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
            Seu Score de Conformidade ESG
          </h2>
          <GaugeChart value={overall} size={200} />
          <p className={`text-xl font-bold mt-4 ${scoreInfo.color}`}>{scoreInfo.label}</p>
          <p className="text-sm text-gray-500 mt-1">
            Empresa: {profile.sector} · {profile.size} · {profile.employees} funcionários
          </p>
        </div>

        {/* Category scores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 bg-gray-50 rounded-2xl">
          {(["E", "S", "G", "SST"] as Category[]).map((cat) => (
            <div key={cat} className="text-center">
              <GaugeChart value={categoryScores[cat] || 0} size={100} />
              <p className="text-xs font-semibold text-gray-600 mt-2">
                {cat === "E" ? "Ambiental" : cat === "S" ? "Social" : cat === "G" ? "Governança" : "SST"}
              </p>
            </div>
          ))}
        </div>

        {/* Gaps */}
        {gaps.length > 0 && (
          <div className="mb-10">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              {gaps.length} {gaps.length === 1 ? "gap identificado" : "gaps identificados"}
            </h3>
            <div className="space-y-3">
              {gaps.slice(0, 10).map((gap) => (
                <div key={gap.id} className={`flex items-start gap-3 p-4 rounded-xl border ${
                  gap.riskLevel === "critical" ? "bg-red-50 border-red-100" :
                  gap.riskLevel === "important" ? "bg-amber-50 border-amber-100" :
                  "bg-blue-50 border-blue-100"
                }`}>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${riskColors[gap.riskLevel]}`}>
                    {riskLabels[gap.riskLevel]}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{gap.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Base legal: {gap.legalBasis}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expert CTA */}
        <div className="bg-green-800 text-white rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-2">Precisa de ajuda para implementar?</h3>
          <p className="text-green-200 text-sm mb-4">Conectamos você com especialistas em ESG e SST para apoiar sua jornada de conformidade.</p>
          {submitted ? (
            <p className="text-green-300 font-medium">Recebemos seu contato! Retornaremos em breve.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex gap-3">
              <input
                type="email"
                placeholder="seu@email.com.br"
                value={expertEmail}
                onChange={(e) => setExpertEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-green-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button type="submit" className="flex items-center gap-2 bg-white text-green-800 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-50 transition-colors whitespace-nowrap">
                <Mail className="w-4 h-4" /> Falar com especialista
              </button>
            </form>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" /> Nova avaliação
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm"
          >
            Imprimir / Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

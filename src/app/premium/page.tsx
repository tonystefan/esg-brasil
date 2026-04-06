import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Star, TrendingUp, FileText, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Conteúdo Premium",
  description: "Acesse análises exclusivas, relatórios aprofundados e ferramentas avançadas de ESG e SST.",
};

export default function PremiumPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
            ESG Brasil Premium
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Análises exclusivas, relatórios aprofundados e ferramentas avançadas para profissionais e empresas sérios sobre ESG.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            { icon: FileText, title: "Relatórios exclusivos", desc: "Análises aprofundadas de regulações, setores e tendências ESG — publicadas mensalmente." },
            { icon: TrendingUp, title: "Benchmarks setoriais", desc: "Compare o desempenho ESG da sua empresa com o setor e identifique oportunidades de melhoria." },
            { icon: Users, title: "Comunidade de especialistas", desc: "Acesso à rede de profissionais de ESG e SST para networking e troca de experiências." },
            { icon: Lock, title: "Calculadora avançada", desc: "Versão completa da calculadora com export PDF, histórico de avaliações e recomendações personalizadas." },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center p-12 bg-green-50 rounded-2xl border border-green-100">
          <Lock className="w-12 h-12 text-green-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
            Em breve
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            O conteúdo premium está em desenvolvimento. Cadastre seu e-mail para ser o primeiro a saber quando lançarmos.
          </p>
          <Link href="/#newsletter" className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors">
            Cadastrar meu e-mail
          </Link>
        </div>
      </div>
    </div>
  );
}

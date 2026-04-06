"use client";
import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="bg-green-800 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
          Fique à frente em ESG & SST
        </h2>
        <p className="text-green-200 text-lg mb-8 leading-relaxed">
          Receba as principais notícias, mudanças regulatórias e análises de especialistas direto no seu e-mail. Gratuito.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-green-200">
            <CheckCircle className="w-6 h-6 text-green-300" />
            <span className="text-lg font-medium">Inscrição confirmada! Bem-vindo ao ESG Brasil.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com.br"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-white text-green-800 font-semibold rounded-xl hover:bg-green-50 transition-colors disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? "Inscrevendo..." : "Inscrever-se"}
            </button>
          </form>
        )}
        <p className="text-green-400 text-xs mt-4">
          Sem spam. Cancele quando quiser. Seus dados protegidos pela LGPD.
        </p>
      </div>
    </section>
  );
}

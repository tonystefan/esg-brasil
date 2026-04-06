import Link from "next/link";
import { Leaf, Globe, Share2, Mail } from "lucide-react";

const footerLinks = {
  conteudo: [
    { href: "/noticias", label: "Últimas Notícias" },
    { href: "/noticias?cat=E", label: "Ambiental" },
    { href: "/noticias?cat=S", label: "Social" },
    { href: "/noticias?cat=G", label: "Governança" },
    { href: "/noticias?cat=SST", label: "SST & NRs" },
  ],
  ferramentas: [
    { href: "/calculadora", label: "Calculadora ESG" },
    { href: "/normas", label: "Guia de Normas" },
    { href: "/normas#calendario", label: "Calendário Regulatório" },
  ],
  empresa: [
    { href: "/sobre", label: "Sobre o Portal" },
    { href: "/sobre#contato", label: "Contato" },
    { href: "/premium", label: "Conteúdo Premium" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">ESG Brasil</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              O portal de referência para profissionais de ESG, sustentabilidade e saúde e segurança do trabalho no Brasil.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors" aria-label="LinkedIn">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors" aria-label="Twitter/X">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="mailto:contato@esgbrasil.com.br" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Conteúdo</h4>
            <ul className="space-y-2">
              {footerLinks.conteudo.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Ferramentas</h4>
            <ul className="space-y-2">
              {footerLinks.ferramentas.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Portal</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ESG Brasil. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-600 text-center">
            O conteúdo deste portal é de caráter informativo e não constitui assessoria jurídica ou consultoria profissional.
          </p>
        </div>
      </div>
    </footer>
  );
}

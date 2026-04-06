import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-8xl font-black text-green-100 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-sora, system-ui)" }}>
          Página não encontrada
        </h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors"
          >
            <Home className="w-4 h-4" /> Ir para a home
          </Link>
          <Link
            href="/noticias"
            className="flex items-center gap-2 border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Ver notícias
          </Link>
        </div>
      </div>
    </div>
  );
}

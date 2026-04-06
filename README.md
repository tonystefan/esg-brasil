# ESG Brasil — Portal de Referência em ESG & SST

O portal de referência para profissionais e empresas em **ESG (Environmental, Social and Governance)** e **SST (Saúde e Segurança do Trabalho)** no Brasil.

## Stack Tecnológica

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4** (CSS-based config)
- **Framer Motion** (animações)
- **Vercel** (deploy)

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/esg-brasil.git
cd esg-brasil

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas chaves

# Rode em modo de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Crie `.env.local` baseado em `.env.local.example`:

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics 4 (ex: G-XXXXXXXXXX) |
| `NEXT_PUBLIC_ADSENSE_ID` | ID do Google AdSense (ex: ca-pub-XXXXXXXXXX) |
| `NEXT_PUBLIC_SITE_URL` | URL base do site (ex: https://esgbrasil.com.br) |

## Como fazer deploy na Vercel

### Deploy via CLI

```bash
npm install -g vercel
vercel --prod
```

### Deploy via GitHub

1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Configure as variáveis de ambiente no painel da Vercel
4. A Vercel fará deploy automático a cada push na branch `main`

### Variáveis na Vercel

No painel do projeto na Vercel: **Settings → Environment Variables**

Adicione as mesmas variáveis do `.env.local.example`.

## Como apontar domínio .com.br

1. No painel Vercel do projeto: **Settings → Domains**
2. Adicione `esgbrasil.com.br` e `www.esgbrasil.com.br`
3. No seu registrador de domínio (Registro.br), configure:
   - **Tipo A**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. Aguarde propagação (até 48h)

## Como adicionar novos artigos

Os artigos são gerenciados no arquivo `src/lib/articles.ts`.

### Estrutura de um artigo

```typescript
{
  slug: "meu-novo-artigo",          // URL amigável (único)
  title: "Título do Artigo",         // Título principal
  metaDescription: "...",            // Para SEO (150-160 chars)
  excerpt: "Resumo em 1-2 frases",   // Para cards e listagens
  author: "Redação ESG Brasil",
  date: "2024-03-20",               // YYYY-MM-DD
  category: "E" | "S" | "G" | "SST",
  tags: ["tag1", "tag2"],
  imageUrl: "https://images.unsplash.com/...",
  readingTime: 5,                    // Em minutos
  featured: true,                    // Aparece na home
  content: `## Título da seção

  Conteúdo do artigo em Markdown...`
}
```

### Passos para adicionar um artigo

1. Abra `src/lib/articles.ts`
2. Adicione um novo objeto ao array `articles`
3. Preencha todos os campos obrigatórios
4. Para imagens, use URLs do Unsplash com `?w=1200&h=675&fit=crop`
5. Salve o arquivo — o artigo aparecerá automaticamente no site

## Como adicionar guias de normas

Edite `src/lib/normas.ts` seguindo a estrutura `NormaGuide`:

```typescript
{
  nr: "NR-XX",
  title: "Título completo da NR",
  summary: "Resumo executivo",
  appliesTo: "Quem é obrigado",
  obligations: ["Obrigação 1", "Obrigação 2"],
  penalties: "Descrição das penalidades",
  lastUpdate: "2024",
  category: "SST" | "ESG",
}
```

## Como ativar o AdSense quando aprovado

1. Obtenha seu código de publicador AdSense (ca-pub-XXXXXXXXXX)
2. Adicione em `.env.local`: `NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX`
3. No componente `src/components/ui/AdSlot.tsx`, substitua o placeholder pelo código real do AdSense
4. Adicione a tag do AdSense no `src/app/layout.tsx` via `next/script`

## Estrutura de pastas

```
src/
├── app/                    # Páginas (Next.js App Router)
│   ├── layout.tsx          # Layout global
│   ├── page.tsx            # Home
│   ├── noticias/           # Listagem de notícias
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx # Artigo individual
│   ├── calculadora/        # Calculadora ESG
│   ├── normas/             # Guia de NRs
│   ├── sobre/              # Sobre o portal
│   ├── premium/            # Conteúdo premium (em breve)
│   ├── sitemap.ts          # Sitemap dinâmico
│   └── robots.ts           # robots.txt
├── components/
│   ├── layout/             # Header, Footer, Breadcrumb
│   ├── ui/                 # Componentes reutilizáveis
│   ├── home/               # Seções da home
│   └── calculadora/        # Calculadora de conformidade
├── lib/
│   ├── articles.ts         # Dados e helpers de artigos
│   ├── normas.ts           # Dados e helpers de NRs
│   └── utils.ts            # Utilitários gerais
└── types/
    └── index.ts            # Tipos TypeScript
```

## Licença

Todos os direitos reservados © ESG Brasil.

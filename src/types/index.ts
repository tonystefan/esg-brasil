export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "E" | "S" | "G" | "SST";
  tags: string[];
  imageUrl: string;
  readingTime: number;
  featured?: boolean;
  metaDescription?: string;
}

export interface NormaGuide {
  nr: string;
  title: string;
  summary: string;
  appliesTo: string;
  obligations: string[];
  penalties: string;
  lastUpdate: string;
  category: "SST" | "ESG";
}

export type Category = "E" | "S" | "G" | "SST";

export interface CategoryInfo {
  id: Category;
  label: string;
  fullName: string;
  color: string;
  bgColor: string;
  description: string;
}

export const CATEGORIES: Record<Category, CategoryInfo> = {
  E: { id: "E", label: "Ambiental", fullName: "Environmental", color: "#15803d", bgColor: "#dcfce7", description: "Clima, carbono e meio ambiente" },
  S: { id: "S", label: "Social", fullName: "Social", color: "#1d4ed8", bgColor: "#dbeafe", description: "Pessoas, diversidade e comunidade" },
  G: { id: "G", label: "Governança", fullName: "Governance", color: "#7c3aed", bgColor: "#ede9fe", description: "Ética, transparência e compliance" },
  SST: { id: "SST", label: "SST", fullName: "Saúde e Segurança", color: "#ea580c", bgColor: "#ffedd5", description: "NRs, riscos e bem-estar" },
};

export interface CalculatorProfile {
  sector: string;
  size: string;
  employees: number;
  hasSST: boolean;
}

export interface ChecklistItem {
  id: string;
  description: string;
  legalBasis: string;
  riskLevel: "critical" | "important" | "recommended";
  category: Category;
  status: "compliant" | "non-compliant" | "na";
  appliesTo?: string[];
}

export interface CalculatorResults {
  overall: number;
  byCategory: Record<Category, number>;
  gaps: ChecklistItem[];
  recommendations: string[];
}

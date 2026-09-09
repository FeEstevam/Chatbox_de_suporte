/**
 * Domain Value Object: CustomCategoryDef
 * Representa uma categoria personalizada de transação
 */
export interface CustomCategoryDef {
  id: string;
  name: string;
  color: string;   // hex color
  icon: string;    // emoji or icon name
  type: "income" | "expense" | "both";
  budgetGroup?: "needs" | "wants" | "savings"; // for 50/30/20 mapping
}

export const DEFAULT_CATEGORIES: CustomCategoryDef[] = [
  { id: "food", name: "Alimentação", color: "#f97316", icon: "🍔", type: "expense", budgetGroup: "needs" },
  { id: "housing", name: "Moradia", color: "#3b82f6", icon: "🏠", type: "expense", budgetGroup: "needs" },
  { id: "transport", name: "Transporte", color: "#8b5cf6", icon: "🚗", type: "expense", budgetGroup: "needs" },
  { id: "health", name: "Saúde", color: "#10b981", icon: "💊", type: "expense", budgetGroup: "needs" },
  { id: "education", name: "Educação", color: "#06b6d4", icon: "📚", type: "expense", budgetGroup: "needs" },
  { id: "leisure", name: "Lazer", color: "#ec4899", icon: "🎉", type: "expense", budgetGroup: "wants" },
  { id: "shopping", name: "Compras", color: "#f59e0b", icon: "🛍️", type: "expense", budgetGroup: "wants" },
  { id: "subscription", name: "Assinaturas", color: "#6366f1", icon: "📺", type: "expense", budgetGroup: "wants" },
  { id: "savings", name: "Poupança", color: "#34d399", icon: "💰", type: "expense", budgetGroup: "savings" },
  { id: "investment", name: "Investimento", color: "#fbbf24", icon: "📈", type: "expense", budgetGroup: "savings" },
  { id: "salary", name: "Salário", color: "#4ade80", icon: "💼", type: "income" },
  { id: "freelance", name: "Freelance", color: "#a78bfa", icon: "💻", type: "income" },
  { id: "other", name: "Outros", color: "#9ca3af", icon: "📌", type: "both" },
];

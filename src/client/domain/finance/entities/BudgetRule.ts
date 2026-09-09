/**
 * Domain Entity: BudgetRule
 * Representa uma regra orçamentária (ex: Regra 50/30/20)
 */
export interface BudgetRule {
  id: string;
  name: string;           // ex: "Regra 50/30/20"
  needs: number;          // % para necessidades (ex: 50)
  wants: number;          // % para desejos (ex: 30)
  savings: number;        // % para poupança/investimento (ex: 20)
  monthlyIncome: number;  // Renda mensal base para cálculo
  active: boolean;
}

export function createBudgetRule(partial: Omit<BudgetRule, "id">): BudgetRule {
  return {
    id: `rule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...partial,
  };
}

/** Retorna os limites em valor absoluto baseado na renda */
export function budgetRuleLimits(rule: BudgetRule) {
  return {
    needsLimit: (rule.needs / 100) * rule.monthlyIncome,
    wantsLimit: (rule.wants / 100) * rule.monthlyIncome,
    savingsTarget: (rule.savings / 100) * rule.monthlyIncome,
  };
}

/**
 * Lib: finance-data
 * Re-exporta todos os tipos de domínio financeiro para compatibilidade
 * com o chat-bot-engine.ts que importa daqui.
 */
export type { Transaction, TransactionType } from "../domain/finance/entities/Transaction";
export { createTransaction } from "../domain/finance/entities/Transaction";

export type { Account, AccountType } from "../domain/finance/entities/Account";
export { createAccount } from "../domain/finance/entities/Account";

export type { Goal, GoalStatus } from "../domain/finance/entities/Goal";
export { createGoal, goalProgressPercent } from "../domain/finance/entities/Goal";

export type { BudgetRule } from "../domain/finance/entities/BudgetRule";
export { createBudgetRule, budgetRuleLimits } from "../domain/finance/entities/BudgetRule";

export type { CustomCategoryDef } from "../domain/finance/value-objects/CustomCategoryDef";
export { DEFAULT_CATEGORIES } from "../domain/finance/value-objects/CustomCategoryDef";

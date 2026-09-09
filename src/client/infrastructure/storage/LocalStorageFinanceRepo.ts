/**
 * Infrastructure: LocalStorageFinanceRepo
 * Repositório de dados financeiros usando localStorage
 */
import { Transaction } from "../../domain/finance/entities/Transaction";
import { Account } from "../../domain/finance/entities/Account";
import { Goal } from "../../domain/finance/entities/Goal";
import { BudgetRule } from "../../domain/finance/entities/BudgetRule";
import { CustomCategoryDef, DEFAULT_CATEGORIES } from "../../domain/finance/value-objects/CustomCategoryDef";

const KEYS = {
  TRANSACTIONS: "cashflow:transactions",
  ACCOUNTS: "cashflow:accounts",
  GOALS: "cashflow:goals",
  BUDGET_RULES: "cashflow:budget_rules",
  CUSTOM_CATEGORIES: "cashflow:custom_categories",
} as const;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Transactions ─────────────────────────────────────────────────────────────

export function getTransactions(): Transaction[] {
  return readJson<Transaction[]>(KEYS.TRANSACTIONS, []);
}

export function saveTransactions(transactions: Transaction[]): void {
  writeJson(KEYS.TRANSACTIONS, transactions);
}

export function addTransaction(tx: Transaction): void {
  const all = getTransactions();
  writeJson(KEYS.TRANSACTIONS, [tx, ...all]);
}

// ── Accounts ─────────────────────────────────────────────────────────────────

export function getAccounts(): Account[] {
  return readJson<Account[]>(KEYS.ACCOUNTS, []);
}

export function saveAccounts(accounts: Account[]): void {
  writeJson(KEYS.ACCOUNTS, accounts);
}

// ── Goals ────────────────────────────────────────────────────────────────────

export function getGoals(): Goal[] {
  return readJson<Goal[]>(KEYS.GOALS, []);
}

export function saveGoals(goals: Goal[]): void {
  writeJson(KEYS.GOALS, goals);
}

// ── Budget Rules ──────────────────────────────────────────────────────────────

export function getBudgetRules(): BudgetRule[] {
  return readJson<BudgetRule[]>(KEYS.BUDGET_RULES, []);
}

export function saveBudgetRules(rules: BudgetRule[]): void {
  writeJson(KEYS.BUDGET_RULES, rules);
}

// ── Custom Categories ─────────────────────────────────────────────────────────

export function getCustomCategories(): CustomCategoryDef[] {
  return readJson<CustomCategoryDef[]>(KEYS.CUSTOM_CATEGORIES, DEFAULT_CATEGORIES);
}

export function saveCustomCategories(cats: CustomCategoryDef[]): void {
  writeJson(KEYS.CUSTOM_CATEGORIES, cats);
}

// ── Backup / Restore ─────────────────────────────────────────────────────────

export function exportBackup() {
  return {
    transactions: getTransactions(),
    accounts: getAccounts(),
    goals: getGoals(),
    budgetRules: getBudgetRules(),
    customCategories: getCustomCategories(),
    exportedAt: new Date().toISOString(),
  };
}

export function importBackup(data: ReturnType<typeof exportBackup>): void {
  if (data.transactions) saveTransactions(data.transactions);
  if (data.accounts) saveAccounts(data.accounts);
  if (data.goals) saveGoals(data.goals);
  if (data.budgetRules) saveBudgetRules(data.budgetRules);
  if (data.customCategories) saveCustomCategories(data.customCategories);
}

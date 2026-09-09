/**
 * Hook: useFinance
 * Expõe dados financeiros do repositório local com reatividade via estado React.
 * Lê do localStorage na montagem e permite salvar atualizações.
 */
import { useState, useCallback, useEffect } from "react";
import { Transaction } from "../domain/finance/entities/Transaction";
import { Account } from "../domain/finance/entities/Account";
import { Goal } from "../domain/finance/entities/Goal";
import { BudgetRule } from "../domain/finance/entities/BudgetRule";
import { CustomCategoryDef } from "../domain/finance/value-objects/CustomCategoryDef";
import {
  getTransactions,
  saveTransactions,
  getAccounts,
  saveAccounts,
  getGoals,
  saveGoals,
  getBudgetRules,
  saveBudgetRules,
  getCustomCategories,
  saveCustomCategories,
} from "../infrastructure/storage/LocalStorageFinanceRepo";

export interface FinanceState {
  transactions: Transaction[];
  accounts: Account[];
  goals: Goal[];
  budgetRules: BudgetRule[];
  customCategories: CustomCategoryDef[];

  // Mutations
  setTransactions: (txs: Transaction[]) => void;
  setAccounts: (accs: Account[]) => void;
  setGoals: (goals: Goal[]) => void;
  setBudgetRules: (rules: BudgetRule[]) => void;
  setCustomCategories: (cats: CustomCategoryDef[]) => void;

  // Helpers
  reload: () => void;
}

export function useFinance(): FinanceState {
  const [transactions, _setTransactions] = useState<Transaction[]>(() => getTransactions());
  const [accounts, _setAccounts] = useState<Account[]>(() => getAccounts());
  const [goals, _setGoals] = useState<Goal[]>(() => getGoals());
  const [budgetRules, _setBudgetRules] = useState<BudgetRule[]>(() => getBudgetRules());
  const [customCategories, _setCustomCategories] = useState<CustomCategoryDef[]>(() => getCustomCategories());

  const setTransactions = useCallback((txs: Transaction[]) => {
    saveTransactions(txs);
    _setTransactions(txs);
  }, []);

  const setAccounts = useCallback((accs: Account[]) => {
    saveAccounts(accs);
    _setAccounts(accs);
  }, []);

  const setGoals = useCallback((g: Goal[]) => {
    saveGoals(g);
    _setGoals(g);
  }, []);

  const setBudgetRules = useCallback((rules: BudgetRule[]) => {
    saveBudgetRules(rules);
    _setBudgetRules(rules);
  }, []);

  const setCustomCategories = useCallback((cats: CustomCategoryDef[]) => {
    saveCustomCategories(cats);
    _setCustomCategories(cats);
  }, []);

  /** Força re-leitura do localStorage (útil após imports/backups) */
  const reload = useCallback(() => {
    _setTransactions(getTransactions());
    _setAccounts(getAccounts());
    _setGoals(getGoals());
    _setBudgetRules(getBudgetRules());
    _setCustomCategories(getCustomCategories());
  }, []);

  return {
    transactions,
    accounts,
    goals,
    budgetRules,
    customCategories,
    setTransactions,
    setAccounts,
    setGoals,
    setBudgetRules,
    setCustomCategories,
    reload,
  };
}

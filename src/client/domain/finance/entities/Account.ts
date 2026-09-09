/**
 * Domain Entity: Account
 * Representa uma conta bancária, carteira ou cartão
 */
export type AccountType = "checking" | "savings" | "credit" | "investment" | "wallet";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency?: string;
  color?: string;
  icon?: string;
  creditLimit?: number; // for credit accounts
  dueDate?: number;     // day of month for credit card bill
  closingDate?: number; // day of month for credit card closing
}

export function createAccount(partial: Omit<Account, "id">): Account {
  return {
    id: `acc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    currency: "BRL",
    ...partial,
  };
}

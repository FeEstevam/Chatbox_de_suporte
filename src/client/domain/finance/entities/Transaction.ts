/**
 * Domain Entity: Transaction
 * Representa uma transação financeira (receita ou despesa)
 */
export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  accountId: string;
  date: string; // ISO date string
  isRecurring?: boolean;
  tags?: string[];
}

export function createTransaction(
  partial: Omit<Transaction, "id">
): Transaction {
  return {
    id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...partial,
  };
}


export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'salary' 
  | 'investment' 
  | 'bonus'
  | 'food' 
  | 'transport' 
  | 'housing' 
  | 'entertainment' 
  | 'utilities' 
  | 'healthcare' 
  | 'shopping' 
  | 'education' 
  | 'travel' 
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: TransactionType;
  category: Category;
  accountId: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  color: string;
  icon?: string;
  lastFour?: string;
}

export interface Budget {
  id: string;
  category: Category;
  amount: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

export interface SavingGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
}

export interface FinancialSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

export interface CategoryBreakdown {
  category: Category;
  amount: number;
  percentage: number;
}


import { Transaction, Account, Budget, SavingGoal, FinancialSummary, CategoryBreakdown } from '@/types/finance';

// Sample accounts
export const accounts: Account[] = [
  {
    id: '1',
    name: 'Main Checking',
    type: 'checking',
    balance: 4250.65,
    color: '#3B82F6',
    lastFour: '4321'
  },
  {
    id: '2',
    name: 'Savings',
    type: 'savings',
    balance: 12750.42,
    color: '#10B981',
    lastFour: '8765'
  },
  {
    id: '3',
    name: 'Premium Credit Card',
    type: 'credit',
    balance: -1245.30,
    color: '#6366F1',
    lastFour: '9876'
  },
  {
    id: '4',
    name: 'Investment Account',
    type: 'investment',
    balance: 34250.00,
    color: '#8B5CF6',
    lastFour: '5432'
  }
];

// Sample transactions
export const transactions: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    description: 'Salary payment',
    date: '2023-08-01',
    type: 'income',
    category: 'salary',
    accountId: '1'
  },
  {
    id: '2',
    amount: 45.99,
    description: 'Grocery shopping',
    date: '2023-08-02',
    type: 'expense',
    category: 'food',
    accountId: '1'
  },
  {
    id: '3',
    amount: 155.50,
    description: 'Electricity bill',
    date: '2023-08-03',
    type: 'expense',
    category: 'utilities',
    accountId: '1'
  },
  {
    id: '4',
    amount: 85.00,
    description: 'Restaurant dinner',
    date: '2023-08-04',
    type: 'expense',
    category: 'food',
    accountId: '3'
  },
  {
    id: '5',
    amount: 500,
    description: 'Side project income',
    date: '2023-08-05',
    type: 'income',
    category: 'bonus',
    accountId: '1'
  },
  {
    id: '6',
    amount: 120.50,
    description: 'Phone bill',
    date: '2023-08-06',
    type: 'expense',
    category: 'utilities',
    accountId: '1'
  },
  {
    id: '7',
    amount: 1200,
    description: 'Rent payment',
    date: '2023-08-07',
    type: 'expense',
    category: 'housing',
    accountId: '1'
  },
  {
    id: '8',
    amount: 65.99,
    description: 'Streaming services',
    date: '2023-08-08',
    type: 'expense',
    category: 'entertainment',
    accountId: '3'
  }
];

// Sample budgets
export const budgets: Budget[] = [
  {
    id: '1',
    category: 'housing',
    amount: 1500,
    spent: 1200,
    period: 'monthly'
  },
  {
    id: '2',
    category: 'food',
    amount: 500,
    spent: 350.99,
    period: 'monthly'
  },
  {
    id: '3',
    category: 'transport',
    amount: 300,
    spent: 275.50,
    period: 'monthly'
  },
  {
    id: '4',
    category: 'entertainment',
    amount: 200,
    spent: 65.99,
    period: 'monthly'
  },
  {
    id: '5',
    category: 'utilities',
    amount: 300,
    spent: 276,
    period: 'monthly'
  }
];

// Sample saving goals
export const savingGoals: SavingGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 5000,
    deadline: '2023-12-31'
  },
  {
    id: '2',
    name: 'Vacation Trip',
    targetAmount: 3000,
    currentAmount: 1500,
    deadline: '2023-09-30'
  },
  {
    id: '3',
    name: 'New Laptop',
    targetAmount: 2000,
    currentAmount: 800,
    deadline: '2023-11-30'
  }
];

// Sample financial summary
export const financialSummary: FinancialSummary = {
  totalBalance: 50006.07,
  monthlyIncome: 3000,
  monthlyExpenses: 1968.98,
  savingsRate: 0.34
};

// Sample category breakdown
export const expenseBreakdown: CategoryBreakdown[] = [
  { category: 'housing', amount: 1200, percentage: 60.94 },
  { category: 'food', amount: 350.99, percentage: 17.82 },
  { category: 'utilities', amount: 276, percentage: 14.02 },
  { category: 'entertainment', amount: 65.99, percentage: 3.35 },
  { category: 'other', amount: 76, percentage: 3.87 }
];

// Helper functions to manage mock data
export const getCategoryColor = (category: string): string => {
  const colors = {
    salary: '#10B981',
    investment: '#8B5CF6',
    bonus: '#3B82F6',
    food: '#F59E0B',
    transport: '#6366F1',
    housing: '#EC4899',
    entertainment: '#F97316',
    utilities: '#0EA5E9',
    healthcare: '#14B8A6',
    shopping: '#EF4444',
    education: '#8B5CF6',
    travel: '#06B6D4',
    other: '#6B7280',
  };
  
  return colors[category as keyof typeof colors] || '#6B7280';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(amount);
};

export const getAccountById = (id: string): Account | undefined => {
  return accounts.find(account => account.id === id);
};

export const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    salary: 'Salário',
    investment: 'Investimento',
    bonus: 'Bônus',
    food: 'Alimentação',
    transport: 'Transporte',
    housing: 'Moradia',
    entertainment: 'Entretenimento',
    utilities: 'Contas',
    healthcare: 'Saúde',
    shopping: 'Compras',
    education: 'Educação',
    travel: 'Viagens',
    other: 'Outros',
  };
  
  return names[category] || category;
};

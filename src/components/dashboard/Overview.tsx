
import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, PiggyBank } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { financialSummary, formatCurrency } from '@/utils/mockData';

const Overview: React.FC = () => {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    savingsRate
  } = financialSummary;

  const savingsAmount = monthlyIncome - monthlyExpenses;
  const savingsPercentage = Math.round(savingsRate * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {/* Balance Card */}
      <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Saldo Total</p>
            <div className="rounded-full bg-blue-100 p-2">
              <DollarSign className="h-4 w-4 text-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{formatCurrency(totalBalance)}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Em todas as contas</p>
          </div>
        </CardContent>
      </Card>

      {/* Income Card */}
      <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Receitas</p>
            <div className="rounded-full bg-green-100 p-2">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{formatCurrency(monthlyIncome)}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Neste mês</p>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Card */}
      <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Despesas</p>
            <div className="rounded-full bg-red-100 p-2">
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{formatCurrency(monthlyExpenses)}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Neste mês</p>
          </div>
        </CardContent>
      </Card>

      {/* Savings Card */}
      <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Economias</p>
            <div className="rounded-full bg-purple-100 p-2">
              <PiggyBank className="h-4 w-4 text-purple-500" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{formatCurrency(savingsAmount)}</h3>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Taxa de economia</span>
                <span className="font-medium">{savingsPercentage}%</span>
              </div>
              <Progress value={savingsPercentage} className="h-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;

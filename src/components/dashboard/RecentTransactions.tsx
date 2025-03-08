
import React from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { transactions, formatCurrency, getCategoryColor, getCategoryName } from '@/utils/mockData';

const RecentTransactions: React.FC = () => {
  // Sort transactions by date, newest first
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5); // Show only 5 most recent

  return (
    <Card className="shadow-sm animate-fade-in delay-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Transações Recentes</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedTransactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${getCategoryColor(transaction.category)}20` }}
                >
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-4 w-4" style={{ color: getCategoryColor(transaction.category) }} />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" style={{ color: getCategoryColor(transaction.category) }} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{getCategoryName(transaction.category)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p 
                  className={`text-sm font-medium ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;

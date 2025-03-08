
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { budgets, formatCurrency, getCategoryColor, getCategoryName } from '@/utils/mockData';

const BudgetProgress: React.FC = () => {
  return (
    <Card className="shadow-sm animate-fade-in delay-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Orçamentos</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          Ver todos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {budgets.map(budget => {
            const percentage = Math.min(100, Math.round((budget.spent / budget.amount) * 100));
            
            // Determine color based on percentage
            let progressColor = "bg-green-500";
            if (percentage > 75) progressColor = "bg-red-500";
            else if (percentage > 50) progressColor = "bg-yellow-500";
            
            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getCategoryColor(budget.category) }}
                    />
                    <span className="text-sm font-medium">{getCategoryName(budget.category)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{formatCurrency(budget.spent)}</span>
                    <span className="text-muted-foreground"> / {formatCurrency(budget.amount)}</span>
                  </div>
                </div>
                <Progress value={percentage} className={`h-2 ${progressColor}`} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;

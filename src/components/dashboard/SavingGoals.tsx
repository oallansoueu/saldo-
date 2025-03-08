
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/mockData';

// Sample saving goals data (in a real app, this would come from your data source)
const savingGoals = [
  {
    id: 'goal1',
    name: 'Férias',
    targetAmount: 5000,
    currentAmount: 1500,
    deadline: '2024-12-31'
  },
  {
    id: 'goal2',
    name: 'Carro novo',
    targetAmount: 35000,
    currentAmount: 12000,
    deadline: '2025-06-30'
  },
  {
    id: 'goal3',
    name: 'Reserva de emergência',
    targetAmount: 20000,
    currentAmount: 8000,
    deadline: null
  }
];

const SavingGoals: React.FC = () => {
  return (
    <Card className="shadow-sm animate-fade-in delay-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Metas de Economia</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {savingGoals.map(goal => {
            const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{goal.name}</span>
                  <div className="text-sm">
                    <span className="font-medium">{formatCurrency(goal.currentAmount)}</span>
                    <span className="text-muted-foreground"> / {formatCurrency(goal.targetAmount)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={percentage} className="h-2 bg-muted" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage}% concluído</span>
                    {goal.deadline && (
                      <span>
                        Meta: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          <Button variant="outline" className="w-full mt-3 border-dashed">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Meta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingGoals;

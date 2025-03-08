
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, CreditCard } from 'lucide-react';
import { accounts, formatCurrency } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const AccountsSummary: React.FC = () => {
  return (
    <Card className="shadow-sm animate-fade-in delay-400">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Suas Contas</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {accounts.map(account => (
            <div 
              key={account.id} 
              className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${account.color}20` }}
                >
                  <CreditCard 
                    className="h-5 w-5" 
                    style={{ color: account.color }} 
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{account.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {account.type === 'credit' ? 'Crédito' : 'Conta'} 
                    {account.lastFour && ` •••• ${account.lastFour}`}
                  </p>
                </div>
              </div>
              <p className={cn(
                "text-sm font-medium",
                account.type === 'credit' && account.balance < 0 ? "text-red-600" : "text-foreground"
              )}>
                {formatCurrency(Math.abs(account.balance))}
              </p>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-3 border-dashed">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Conta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountsSummary;


import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, PieChart } from 'lucide-react';
import { budgets, formatCurrency, getCategoryName, getCategoryColor } from '@/utils/mockData';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Budget, Category } from '@/types/finance';
import { v4 as uuidv4 } from 'uuid';

const Budgets: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [budgetsList, setBudgetsList] = useState([...budgets]);
  const [newBudget, setNewBudget] = useState<Partial<Budget>>({
    category: 'food',
    amount: 0,
    spent: 0,
    period: 'monthly'
  });
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.amount) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    const budget: Budget = {
      id: uuidv4(),
      category: newBudget.category as Category,
      amount: Number(newBudget.amount),
      spent: Number(newBudget.spent || 0),
      period: newBudget.period as 'monthly' | 'yearly'
    };

    setBudgetsList([...budgetsList, budget]);
    setNewBudget({
      category: 'food',
      amount: 0,
      spent: 0,
      period: 'monthly'
    });

    toast({
      title: "Orçamento adicionado",
      description: "Seu novo orçamento foi adicionado com sucesso."
    });
  };

  const handleDeleteBudget = (id: string) => {
    setBudgetsList(budgetsList.filter(budget => budget.id !== id));
    toast({
      title: "Orçamento removido",
      description: "O orçamento foi removido com sucesso."
    });
  };

  const totalBudget = budgetsList.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgetsList.reduce((sum, budget) => sum + budget.spent, 0);
  const totalPercentage = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0;

  return (
    <div className="relative min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <main className="container mx-auto px-4 pb-12 pt-6 md:pl-64">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold leading-7 text-foreground mb-1">Orçamentos</h2>
            <p className="text-sm text-muted-foreground">
              Controle seus gastos com orçamentos personalizados
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Orçamento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Orçamento</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={newBudget.category as string} 
                    onValueChange={(value) => setNewBudget({...newBudget, category: value as Category})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Alimentação</SelectItem>
                      <SelectItem value="transport">Transporte</SelectItem>
                      <SelectItem value="housing">Moradia</SelectItem>
                      <SelectItem value="entertainment">Entretenimento</SelectItem>
                      <SelectItem value="utilities">Contas</SelectItem>
                      <SelectItem value="healthcare">Saúde</SelectItem>
                      <SelectItem value="shopping">Compras</SelectItem>
                      <SelectItem value="education">Educação</SelectItem>
                      <SelectItem value="travel">Viagens</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Limite</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    value={newBudget.amount || ''} 
                    onChange={(e) => setNewBudget({...newBudget, amount: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="period">Período</Label>
                  <Select 
                    value={newBudget.period as string} 
                    onValueChange={(value) => setNewBudget({...newBudget, period: value as 'monthly' | 'yearly'})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensal</SelectItem>
                      <SelectItem value="yearly">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddBudget}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Total Budget Summary */}
        <Card className="mb-6 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Orçamento Total</h3>
                <p className="text-sm text-muted-foreground">Visão geral dos seus gastos</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-xl font-bold">{formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}</p>
              </div>
            </div>
            <Progress 
              value={totalPercentage} 
              className="h-2 w-full"
              style={{
                backgroundColor: '#f1f5f9',
                '--tw-progress-fill': totalPercentage > 90 ? '#ef4444' : totalPercentage > 75 ? '#f97316' : '#10b981'
              } as React.CSSProperties}
            />
            <div className="mt-2 flex justify-between text-sm">
              <span>{totalPercentage}% utilizado</span>
              <span>Restante: {formatCurrency(totalBudget - totalSpent)}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Budgets List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetsList.map(budget => {
            const percentage = Math.min(100, Math.round((budget.spent / budget.amount) * 100));
            const color = getCategoryColor(budget.category);
            
            return (
              <Card key={budget.id} className="overflow-hidden shadow-sm animate-fade-in hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <CardTitle className="text-base font-medium">{getCategoryName(budget.category)}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteBudget(budget.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {budget.period === 'monthly' ? 'Mensal' : 'Anual'}
                      </span>
                      <span className="text-sm font-medium">{formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}</span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2 mt-2"
                      style={{
                        backgroundColor: `${color}10`,
                        '--tw-progress-fill': percentage > 90 ? '#ef4444' : percentage > 75 ? '#f97316' : color
                      } as React.CSSProperties}
                    />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{percentage}% utilizado</span>
                      <span>Restante: {formatCurrency(budget.amount - budget.spent)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Budgets;

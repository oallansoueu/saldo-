
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, Target, Calendar } from 'lucide-react';
import { savingGoals, formatCurrency } from '@/utils/mockData';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SavingGoal } from '@/types/finance';
import { v4 as uuidv4 } from 'uuid';

const Goals: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [goalsList, setGoalsList] = useState([...savingGoals]);
  const [newGoal, setNewGoal] = useState<Partial<SavingGoal>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0
  });
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    const goal: SavingGoal = {
      id: uuidv4(),
      name: newGoal.name,
      targetAmount: Number(newGoal.targetAmount),
      currentAmount: Number(newGoal.currentAmount || 0),
      deadline: newGoal.deadline
    };

    setGoalsList([...goalsList, goal]);
    setNewGoal({
      name: '',
      targetAmount: 0,
      currentAmount: 0
    });

    toast({
      title: "Meta adicionada",
      description: "Sua nova meta foi adicionada com sucesso."
    });
  };

  const handleDeleteGoal = (id: string) => {
    setGoalsList(goalsList.filter(goal => goal.id !== id));
    toast({
      title: "Meta removida",
      description: "A meta foi removida com sucesso."
    });
  };

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
            <h2 className="text-xl font-bold leading-7 text-foreground mb-1">Metas de Economia</h2>
            <p className="text-sm text-muted-foreground">
              Defina objetivos e acompanhe seu progresso
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Meta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Meta</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome da Meta</Label>
                  <Input 
                    id="name" 
                    value={newGoal.name || ''} 
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="targetAmount">Valor Total</Label>
                  <Input 
                    id="targetAmount" 
                    type="number" 
                    value={newGoal.targetAmount || ''} 
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currentAmount">Valor Atual</Label>
                  <Input 
                    id="currentAmount" 
                    type="number" 
                    value={newGoal.currentAmount || ''} 
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Data Limite (opcional)</Label>
                  <Input 
                    id="deadline" 
                    type="date" 
                    value={newGoal.deadline || ''} 
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddGoal}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Goals List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalsList.map(goal => {
            const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <Card key={goal.id} className="overflow-hidden shadow-sm animate-fade-in hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-purple-100 p-1">
                      <Target className="h-4 w-4 text-purple-500" />
                    </div>
                    <CardTitle className="text-base font-medium">{goal.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{formatCurrency(goal.currentAmount)}</span>
                      <span className="text-sm text-muted-foreground">de {formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2 mt-2"
                      style={{
                        backgroundColor: '#f1f5f9',
                        '--tw-progress-fill': '#8b5cf6'
                      } as React.CSSProperties}
                    />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{percentage}% concluído</span>
                      <span>Falta: {formatCurrency(remaining)}</span>
                    </div>
                  </div>
                  {goal.deadline && (
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Meta: {new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Goals;

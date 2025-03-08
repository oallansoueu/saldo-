
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, CheckCircle, CircleX, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/utils/mockData';

// Mock planning data
const recurringPayments = [
  { id: '1', name: 'Aluguel', amount: 1200, dueDay: 10, category: 'housing', status: 'pending' },
  { id: '2', name: 'Internet', amount: 99.90, dueDay: 15, category: 'utilities', status: 'paid' },
  { id: '3', name: 'Streaming', amount: 55.90, dueDay: 5, category: 'entertainment', status: 'paid' },
  { id: '4', name: 'Celular', amount: 79.90, dueDay: 20, category: 'utilities', status: 'pending' },
  { id: '5', name: 'Academia', amount: 89.90, dueDay: 10, category: 'healthcare', status: 'pending' }
];

const projects = [
  { id: '1', name: 'Reforma da casa', targetAmount: 15000, currentAmount: 5000, deadline: '2024-12-31', category: 'housing' },
  { id: '2', name: 'Viagem de férias', targetAmount: 8000, currentAmount: 2500, deadline: '2024-07-15', category: 'travel' },
  { id: '3', name: 'Curso de especialização', targetAmount: 5000, currentAmount: 1000, deadline: '2024-09-01', category: 'education' }
];

const currentDate = new Date();
const currentMonth = currentDate.toLocaleString('pt-BR', { month: 'long' });
const currentYear = currentDate.getFullYear();

const Planning: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Total pending payments for this month
  const pendingPayments = recurringPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

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
            <h2 className="text-xl font-bold leading-7 text-foreground mb-1">Planejamento Financeiro</h2>
            <p className="text-sm text-muted-foreground">
              Organize suas finanças e planeje para o futuro
            </p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Planejamento
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar and Monthly Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendário</CardTitle>
                <CardDescription>
                  {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)} {currentYear}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pagamentos pendentes:</span>
                    <span className="font-medium text-red-600">{formatCurrency(pendingPayments)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Próximo vencimento:</span>
                    <span className="text-sm">Aluguel - Dia 10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Metas ativas:</span>
                    <span className="text-sm">3 metas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="recurring">
              <TabsList className="mb-4">
                <TabsTrigger value="recurring">Pagamentos Recorrentes</TabsTrigger>
                <TabsTrigger value="projects">Projetos Futuros</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recurring">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Pagamentos Recorrentes</CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recurringPayments.map(payment => (
                        <div key={payment.id} className="flex justify-between items-center p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-3">
                            {payment.status === 'paid' ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-amber-500" />
                            )}
                            <div>
                              <p className="font-medium">{payment.name}</p>
                              <p className="text-xs text-muted-foreground">Vencimento dia {payment.dueDay}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(payment.amount)}</p>
                            <p className={`text-xs ${payment.status === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                              {payment.status === 'paid' ? 'Pago' : 'Pendente'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Projetos Futuros</CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {projects.map(project => {
                        const percentage = Math.min(100, Math.round((project.currentAmount / project.targetAmount) * 100));
                        const deadlineDate = new Date(project.deadline);
                        const timeLeft = Math.ceil((deadlineDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
                        
                        return (
                          <div key={project.id} className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{project.name}</h3>
                                <p className="text-xs text-muted-foreground">
                                  Meta: {deadlineDate.toLocaleDateString('pt-BR')} ({timeLeft} dias restantes)
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatCurrency(project.currentAmount)}</p>
                                <p className="text-xs text-muted-foreground">de {formatCurrency(project.targetAmount)}</p>
                              </div>
                            </div>
                            <Progress 
                              value={percentage} 
                              className="h-2"
                              style={{
                                backgroundColor: '#f1f5f9',
                                '--tw-progress-fill': '#3b82f6'
                              } as React.CSSProperties}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{percentage}% concluído</span>
                              <span>Falta: {formatCurrency(project.targetAmount - project.currentAmount)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Planning;

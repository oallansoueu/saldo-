
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Plus, Briefcase, LineChart, BarChart3, PieChart } from 'lucide-react';
import { formatCurrency } from '@/utils/mockData';
import { Progress } from '@/components/ui/progress';

// Mock investment data
const investments = [
  {
    id: '1',
    name: 'Ações',
    amount: 15000,
    allocation: 45,
    return: 12.5,
    returnAmount: 1875,
    items: [
      { id: '101', name: 'PETR4', amount: 5000, return: 8.2 },
      { id: '102', name: 'VALE3', amount: 4000, return: 15.7 },
      { id: '103', name: 'ITUB4', amount: 3500, return: 6.8 },
      { id: '104', name: 'BBDC4', amount: 2500, return: 21.4 }
    ]
  },
  {
    id: '2',
    name: 'Renda Fixa',
    amount: 12000,
    allocation: 36,
    return: 8.2,
    returnAmount: 984,
    items: [
      { id: '201', name: 'CDB Banco X', amount: 5000, return: 8.5 },
      { id: '202', name: 'Tesouro IPCA+', amount: 4000, return: 9.7 },
      { id: '203', name: 'LCI', amount: 3000, return: 5.8 }
    ]
  },
  {
    id: '3',
    name: 'Fundos',
    amount: 6500,
    allocation: 19,
    return: 10.8,
    returnAmount: 702,
    items: [
      { id: '301', name: 'Fundo Multimercado', amount: 3500, return: 11.2 },
      { id: '302', name: 'Fundo Imobiliário', amount: 3000, return: 10.3 }
    ]
  }
];

const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
const totalReturn = investments.reduce((sum, inv) => sum + inv.returnAmount, 0);
const averageReturn = (totalReturn / totalInvestment) * 100;

const Investments: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
            <h2 className="text-xl font-bold leading-7 text-foreground mb-1">Investimentos</h2>
            <p className="text-sm text-muted-foreground">
              Acompanhe o desempenho dos seus investimentos
            </p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Investimento
          </Button>
        </div>

        {/* Investment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Total Investido</h3>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalInvestment)}</p>
              <p className="text-xs text-blue-600 mt-1">Todos os investimentos</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-green-700 mb-2">Rentabilidade Total</h3>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(totalReturn)}</p>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                <span>{averageReturn.toFixed(2)}% ao ano</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-100">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-purple-700 mb-2">Alocação</h3>
              <div className="flex gap-1 mt-3">
                <div className="h-2 rounded-l-full bg-blue-500" style={{ width: '45%' }}></div>
                <div className="h-2 bg-green-500" style={{ width: '36%' }}></div>
                <div className="h-2 rounded-r-full bg-purple-500" style={{ width: '19%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span className="text-blue-600">Ações: 45%</span>
                <span className="text-green-600">Renda Fixa: 36%</span>
                <span className="text-purple-600">Fundos: 19%</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Investment List */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Distribuição de Investimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="allocation">
              <TabsList className="mb-4">
                <TabsTrigger value="allocation">
                  <PieChart className="h-4 w-4 mr-2" />
                  Alocação
                </TabsTrigger>
                <TabsTrigger value="performance">
                  <LineChart className="h-4 w-4 mr-2" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="composition">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Composição
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="allocation" className="space-y-4">
                <div className="flex justify-center py-6">
                  {/* Placeholder for a Pie Chart - in a real app you'd use recharts */}
                  <div className="relative w-48 h-48 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-500 origin-right transform rotate-0"></div>
                      <div className="absolute top-0 left-0 w-1/2 h-full bg-green-500 origin-right transform rotate-162deg"></div>
                      <div className="absolute top-0 left-0 w-1/2 h-full bg-purple-500 origin-right transform rotate-306deg"></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white rounded-full transform scale-75">
                      <p className="text-lg font-bold">{formatCurrency(totalInvestment)}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {investments.map(inv => (
                    <div key={inv.id} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: inv.id === '1' ? '#3b82f6' : 
                                          inv.id === '2' ? '#10b981' : '#8b5cf6' 
                        }}
                      ></div>
                      <div>
                        <p className="font-medium">{inv.name}</p>
                        <p className="text-sm text-muted-foreground">{inv.allocation}% ({formatCurrency(inv.amount)})</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <LineChart className="h-8 w-8 mr-2" />
                  <span>Gráfico de performance seria renderizado aqui</span>
                </div>
              </TabsContent>
              
              <TabsContent value="composition" className="space-y-4">
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="h-8 w-8 mr-2" />
                  <span>Gráfico de composição seria renderizado aqui</span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Investment Details */}
        <div className="space-y-6">
          {investments.map(inv => (
            <Card key={inv.id} className="overflow-hidden animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: inv.id === '1' ? '#3b82f650' : 
                                        inv.id === '2' ? '#10b98150' : '#8b5cf650' 
                      }}
                    >
                      <Briefcase 
                        className="h-4 w-4"
                        style={{ 
                          color: inv.id === '1' ? '#3b82f6' : 
                                 inv.id === '2' ? '#10b981' : '#8b5cf6' 
                        }}
                      />
                    </div>
                    <CardTitle className="text-lg font-medium">{inv.name}</CardTitle>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatCurrency(inv.amount)}</p>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>{inv.return}% ({formatCurrency(inv.returnAmount)})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  {inv.items.map(item => (
                    <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm">{item.name}</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(item.amount)}</p>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <ArrowUpRight className="h-3 w-3" />
                          <span>{item.return}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Investments;


import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import TransactionForm from '@/components/forms/TransactionForm';
import { Transaction, TransactionType } from '@/types/finance';
import { transactions as mockTransactions, formatCurrency, getCategoryName, getCategoryColor } from '@/utils/mockData';

const Transactions: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState<'all' | TransactionType>('all');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Filter by tab
    if (currentTab !== 'all' && transaction.type !== currentTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(query) ||
        getCategoryName(transaction.category).toLowerCase().includes(query)
      );
    }
    
    return true;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
        <div className="mb-8">
          <h2 className="text-xl font-bold leading-7 text-foreground mb-1">Transações</h2>
          <p className="text-sm text-muted-foreground">
            Visualize e gerencie todas as suas transações
          </p>
        </div>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar transações..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <TransactionForm 
                  onTransactionAdded={handleAddTransaction}
                  buttonText="Nova" 
                  buttonClassName="whitespace-nowrap"
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mt-6" onValueChange={(value) => setCurrentTab(value as any)}>
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="income">Receitas</TabsTrigger>
                <TabsTrigger value="expense">Despesas</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center">
                        Nenhuma transação encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center">
                            <div 
                              className="mr-2 h-8 w-8 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${getCategoryColor(transaction.category)}20` }}
                            >
                              {transaction.type === 'income' ? (
                                <ArrowUpRight className="h-4 w-4" style={{ color: getCategoryColor(transaction.category) }} />
                              ) : (
                                <ArrowDownRight className="h-4 w-4" style={{ color: getCategoryColor(transaction.category) }} />
                              )}
                            </div>
                            <span>{transaction.description}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryName(transaction.category)}</TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell className={`text-right font-medium ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Transactions;

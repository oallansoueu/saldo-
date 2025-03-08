
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, CreditCard, Wallet, PiggyBank, TrendingUp } from 'lucide-react';
import { accounts, formatCurrency } from '@/utils/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Account } from '@/types/finance';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';

const Accounts: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountsList, setAccountsList] = useState([...accounts]);
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    name: '',
    type: 'checking',
    balance: 0,
    color: '#3B82F6'
  });
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.type) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    const account: Account = {
      id: uuidv4(),
      name: newAccount.name,
      type: newAccount.type as 'checking' | 'savings' | 'credit' | 'investment',
      balance: Number(newAccount.balance || 0),
      color: newAccount.color || '#3B82F6',
      lastFour: newAccount.lastFour
    };

    setAccountsList([...accountsList, account]);
    setNewAccount({
      name: '',
      type: 'checking',
      balance: 0,
      color: '#3B82F6'
    });

    toast({
      title: "Conta adicionada",
      description: "Sua nova conta foi adicionada com sucesso."
    });
  };

  const handleDeleteAccount = (id: string) => {
    setAccountsList(accountsList.filter(account => account.id !== id));
    toast({
      title: "Conta removida",
      description: "A conta foi removida com sucesso."
    });
  };

  const totalBalance = accountsList.reduce((sum, account) => {
    // Don't count credit card debt as positive balance
    return account.type === 'credit' && account.balance < 0 
      ? sum 
      : sum + account.balance;
  }, 0);

  const totalCredit = accountsList
    .filter(account => account.type === 'credit' && account.balance < 0)
    .reduce((sum, account) => sum + Math.abs(account.balance), 0);

  const getAccountIcon = (type: string, color: string) => {
    switch (type) {
      case 'checking':
        return <Wallet className="h-5 w-5" style={{ color }} />;
      case 'savings':
        return <PiggyBank className="h-5 w-5" style={{ color }} />;
      case 'investment':
        return <TrendingUp className="h-5 w-5" style={{ color }} />;
      case 'credit':
      default:
        return <CreditCard className="h-5 w-5" style={{ color }} />;
    }
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
            <h2 className="text-xl font-bold leading-7 text-foreground mb-1">Contas</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie suas contas bancárias e cartões
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Conta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Conta</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome da Conta</Label>
                  <Input 
                    id="name" 
                    value={newAccount.name || ''} 
                    onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select 
                    value={newAccount.type as string} 
                    onValueChange={(value) => setNewAccount({...newAccount, type: value as 'checking' | 'savings' | 'credit' | 'investment'})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Conta Corrente</SelectItem>
                      <SelectItem value="savings">Poupança</SelectItem>
                      <SelectItem value="credit">Cartão de Crédito</SelectItem>
                      <SelectItem value="investment">Investimento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="balance">Saldo Inicial</Label>
                  <Input 
                    id="balance" 
                    type="number" 
                    value={newAccount.balance || ''} 
                    onChange={(e) => setNewAccount({...newAccount, balance: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastFour">Últimos 4 dígitos (opcional)</Label>
                  <Input 
                    id="lastFour" 
                    maxLength={4}
                    value={newAccount.lastFour || ''} 
                    onChange={(e) => setNewAccount({...newAccount, lastFour: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Cor</Label>
                  <div className="flex gap-2">
                    {['#3B82F6', '#10B981', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#EF4444'].map(color => (
                      <div 
                        key={color}
                        className={cn(
                          "w-8 h-8 rounded-full cursor-pointer border-2",
                          newAccount.color === color ? "border-gray-900" : "border-transparent"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewAccount({...newAccount, color})}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddAccount}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Accounts Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Saldo Total</h3>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalBalance)}</p>
              <p className="text-xs text-blue-600 mt-1">Todas as contas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-red-700 mb-2">Dívida Total</h3>
              <p className="text-2xl font-bold text-red-900">{formatCurrency(totalCredit)}</p>
              <p className="text-xs text-red-600 mt-1">Cartões de crédito</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Accounts List */}
        <div className="grid grid-cols-1 gap-4">
          {accountsList.map(account => (
            <Card key={account.id} className="overflow-hidden shadow-sm animate-fade-in hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${account.color}20` }}
                    >
                      {getAccountIcon(account.type, account.color)}
                    </div>
                    <div>
                      <h3 className="font-medium">{account.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {account.type === 'checking' ? 'Conta Corrente' : 
                         account.type === 'savings' ? 'Poupança' :
                         account.type === 'investment' ? 'Investimento' : 'Cartão de Crédito'}
                        {account.lastFour && ` •••• ${account.lastFour}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={cn(
                      "text-lg font-medium",
                      account.type === 'credit' && account.balance < 0 ? "text-red-600" : "text-foreground"
                    )}>
                      {formatCurrency(Math.abs(account.balance))}
                    </p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteAccount(account.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Accounts;

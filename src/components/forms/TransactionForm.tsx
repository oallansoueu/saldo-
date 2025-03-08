
import React, { useState } from 'react';
import { PlusCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, TransactionType, Category } from '@/types/finance';
import { getCategoryName, accounts } from '@/utils/mockData';

interface TransactionFormProps {
  onTransactionAdded?: (transaction: Transaction) => void;
  buttonClassName?: string;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonText?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onTransactionAdded,
  buttonClassName = "w-full",
  buttonVariant = "default",
  buttonText = "Nova Transação"
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Transaction, 'id' | 'date'>>({
    amount: 0,
    description: '',
    type: 'expense',
    category: 'other',
    accountId: accounts[0]?.id || '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      toast({
        title: "Erro ao adicionar transação",
        description: "Por favor, adicione uma descrição.",
        variant: "destructive",
      });
      return;
    }

    if (formData.amount <= 0) {
      toast({
        title: "Erro ao adicionar transação",
        description: "O valor deve ser maior que zero.",
        variant: "destructive",
      });
      return;
    }
    
    const newTransaction: Transaction = {
      id: uuidv4(),
      ...formData,
      date: new Date().toISOString(),
    };
    
    if (onTransactionAdded) {
      onTransactionAdded(newTransaction);
    }
    
    toast({
      title: "Transação adicionada",
      description: `${formData.type === 'income' ? 'Receita' : 'Despesa'} de R$ ${formData.amount.toFixed(2)} adicionada com sucesso.`,
    });
    
    setFormData({
      amount: 0,
      description: '',
      type: 'expense',
      category: 'other',
      accountId: accounts[0]?.id || '',
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={buttonClassName}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Receita</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Ex: Salário, Mercado, Aluguel..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              value={formData.amount || ''}
              onChange={handleInputChange}
              placeholder="0,00"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value as Category)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {formData.type === 'income' ? (
                  <>
                    <SelectItem value="salary">Salário</SelectItem>
                    <SelectItem value="investment">Investimentos</SelectItem>
                    <SelectItem value="bonus">Bônus</SelectItem>
                    <SelectItem value="other">Outros</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="food">Alimentação</SelectItem>
                    <SelectItem value="transport">Transporte</SelectItem>
                    <SelectItem value="housing">Moradia</SelectItem>
                    <SelectItem value="entertainment">Entretenimento</SelectItem>
                    <SelectItem value="utilities">Serviços</SelectItem>
                    <SelectItem value="healthcare">Saúde</SelectItem>
                    <SelectItem value="shopping">Compras</SelectItem>
                    <SelectItem value="education">Educação</SelectItem>
                    <SelectItem value="travel">Viagem</SelectItem>
                    <SelectItem value="other">Outros</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountId">Conta</Label>
            <Select
              value={formData.accountId}
              onValueChange={(value) => handleSelectChange('accountId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a conta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full">Adicionar Transação</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;

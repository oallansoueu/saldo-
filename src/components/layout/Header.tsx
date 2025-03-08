
import React, { useState } from 'react';
import { Bell, Settings, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full h-16 px-4 md:px-6 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border transition-all">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold md:text-2xl tracking-tight">Finance Harmony</h1>
      </div>

      <div className="flex items-center gap-2">
        {showSearch ? (
          <div className="animate-fade-in-up flex items-center gap-2">
            <Input
              type="search"
              placeholder="Pesquisar transações..."
              className="w-full max-w-xs"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSearch(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSearch(true)}
            className="hidden md:flex"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="py-2 px-4 cursor-pointer">
                <div>
                  <p className="font-medium">Limite de orçamento atingido</p>
                  <p className="text-sm text-muted-foreground">Você atingiu 90% do orçamento para Alimentação</p>
                  <p className="text-xs text-muted-foreground mt-1">5 minutos atrás</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 px-4 cursor-pointer">
                <div>
                  <p className="font-medium">Fatura do cartão de crédito</p>
                  <p className="text-sm text-muted-foreground">A fatura do seu cartão vence em 3 dias</p>
                  <p className="text-xs text-muted-foreground mt-1">2 horas atrás</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 px-4 cursor-pointer">
                <div>
                  <p className="font-medium">Nova transação</p>
                  <p className="text-sm text-muted-foreground">Compra de R$ 89,90 detectada</p>
                  <p className="text-xs text-muted-foreground mt-1">Ontem</p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        
        <Button className="hidden md:flex">Adicionar Transação</Button>
      </div>
    </header>
  );
};

export default Header;

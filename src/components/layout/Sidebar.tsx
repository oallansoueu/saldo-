
import React from 'react';
import { 
  HomeIcon, 
  BarChart3, 
  PiggyBank, 
  CreditCard, 
  Calendar, 
  Settings,
  Plus,
  ListChecks,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import TransactionForm from '@/components/forms/TransactionForm';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-20 flex h-full w-full flex-col border-r bg-background pt-16 transition-transform duration-300 md:w-64 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex justify-center mb-6 mt-6">
        <TransactionForm buttonClassName="w-[80%]" />
      </div>
      
      <div className="flex-1 overflow-auto px-3">
        <nav className="flex flex-col gap-1">
          <NavItem 
            icon={<HomeIcon className="h-4 w-4" />} 
            label="Dashboard" 
            to="/"
            active={location.pathname === '/'}
          />
          <NavItem 
            icon={<ListChecks className="h-4 w-4" />} 
            label="Transações" 
            to="/transactions"
            active={location.pathname === '/transactions'}
          />
          <NavItem icon={<BarChart3 className="h-4 w-4" />} label="Orçamentos" to="/budgets" />
          <NavItem icon={<PiggyBank className="h-4 w-4" />} label="Metas" to="/goals" />
          <NavItem icon={<CreditCard className="h-4 w-4" />} label="Contas" to="/accounts" />
          <NavItem icon={<TrendingUp className="h-4 w-4" />} label="Investimentos" to="/investments" />
          <NavItem icon={<Calendar className="h-4 w-4" />} label="Planejamento" to="/planning" />
        </nav>
      </div>
      
      <div className="border-t border-border p-4">
        <NavItem icon={<Settings className="h-4 w-4" />} label="Configurações" to="/settings" />
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;

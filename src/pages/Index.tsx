
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Overview from '@/components/dashboard/Overview';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import BudgetProgress from '@/components/dashboard/BudgetProgress';
import ExpenseChart from '@/components/dashboard/ExpenseChart';
import AccountsSummary from '@/components/dashboard/AccountsSummary';
import SavingGoals from '@/components/dashboard/SavingGoals';
import TransactionForm from '@/components/forms/TransactionForm';

const Index = () => {
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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold leading-7 text-foreground mb-1">Bem-vindo de volta</h2>
            <p className="text-sm text-muted-foreground">
              Veja um resumo das suas finanças e atividades recentes
            </p>
          </div>
          
          <TransactionForm buttonClassName="w-full sm:w-auto" />
        </div>
        
        <div className="space-y-6">
          <Overview />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RecentTransactions />
              <ExpenseChart />
            </div>
            <div className="space-y-6">
              <BudgetProgress />
              <AccountsSummary />
              <SavingGoals />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

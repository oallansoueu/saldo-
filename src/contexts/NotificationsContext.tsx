
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  date: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAllNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Sample initial notifications
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Alerta de orçamento',
    message: 'Você atingiu 80% do seu orçamento para Alimentação este mês.',
    type: 'warning',
    read: false,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: '2',
    title: 'Fatura próxima',
    message: 'A fatura do seu cartão vence em 3 dias.',
    type: 'info',
    read: false,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  }
];

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (data: Omit<Notification, 'id' | 'read' | 'date'>) => {
    const newNotification: Notification = {
      ...data,
      id: Date.now().toString(),
      read: false,
      date: new Date().toISOString()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notifications
    toast({
      title: data.title,
      description: data.message,
      variant: data.type === 'error' ? 'destructive' : 'default',
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Example of scheduled notifications (like bill reminders)
  useEffect(() => {
    const checkForScheduledNotifications = () => {
      // This is a placeholder for actual scheduled notification logic
      // In a real app, you'd check your database or API for due dates
      const shouldTriggerReminder = Math.random() > 0.9; // Random example
      
      if (shouldTriggerReminder) {
        addNotification({
          title: 'Lembrete agendado',
          message: 'Você tem um pagamento programado para amanhã.',
          type: 'info'
        });
      }
    };
    
    // Check for reminders every hour in this example
    const interval = setInterval(checkForScheduledNotifications, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationsContext.Provider 
      value={{ 
        notifications, 
        unreadCount, 
        addNotification, 
        markAsRead, 
        markAllAsRead, 
        clearAllNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

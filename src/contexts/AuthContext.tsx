import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'tourist' | 'guide' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'tourist' | 'guide') => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Имитация запроса к API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Заглушка для демонстрации - в реальном приложении здесь был бы запрос к бэкенду
    if (email === 'demo@guideuz.com' && password === 'password') {
      setUser({
        id: 1,
        name: 'Демо Пользователь',
        email: 'demo@guideuz.com',
        role: 'tourist'
      });
    } else if (email === 'guide@guideuz.com' && password === 'password') {
      setUser({
        id: 2,
        name: 'Демо Гид',
        email: 'guide@guideuz.com',
        role: 'guide'
      });
    } else {
      throw new Error('Неверный email или пароль');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string, role: 'tourist' | 'guide') => {
    // Имитация запроса к API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Заглушка для демонстрации - в реальном приложении здесь был бы запрос к бэкенду
    setUser({
      id: 3,
      name,
      email,
      role
    });
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: user !== null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
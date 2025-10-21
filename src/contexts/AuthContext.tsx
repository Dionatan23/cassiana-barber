import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'barbeiro';
  barbeiroId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string, tipo: 'admin' | 'barbeiro') => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários mockados
const usuarios = {
  admin: {
    email: 'admin@barbearia.com',
    senha: '123456',
    dados: {
      id: 'admin-1',
      nome: 'Administrador',
      email: 'admin@barbearia.com',
      tipo: 'admin' as const
    }
  },
  barbeiros: [
    {
      email: 'joao@barbearia.com',
      senha: '123456',
      dados: {
        id: 'barb-1',
        nome: 'João Silva',
        email: 'joao@barbearia.com',
        tipo: 'barbeiro' as const,
        barbeiroId: '1'
      }
    },
    {
      email: 'pedro@barbearia.com',
      senha: '123456',
      dados: {
        id: 'barb-2',
        nome: 'Pedro Santos',
        email: 'pedro@barbearia.com',
        tipo: 'barbeiro' as const,
        barbeiroId: '2'
      }
    }
  ]
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, senha: string, tipo: 'admin' | 'barbeiro'): boolean => {
    if (tipo === 'admin') {
      if (email === usuarios.admin.email && senha === usuarios.admin.senha) {
        setUser(usuarios.admin.dados);
        return true;
      }
    } else {
      const barbeiro = usuarios.barbeiros.find(b => b.email === email && b.senha === senha);
      if (barbeiro) {
        setUser(barbeiro.dados);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

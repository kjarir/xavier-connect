
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@xavier.edu',
    role: 'admin' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
  },
  {
    id: '2',
    name: 'Teacher One',
    email: 'teacher@xavier.edu',
    role: 'teacher' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Teacher+One&background=2563EB&color=fff'
  },
  {
    id: '3',
    name: 'Student One',
    email: 'student@xavier.edu',
    role: 'student' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Student+One&background=6366F1&color=fff'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('xavier_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }
      
      // Find user in our mock data
      const foundUser = MOCK_USERS.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.role === role
      );
      
      if (!foundUser) {
        throw new Error('Invalid credentials or user not found');
      }
      
      // Set user in state and localStorage
      setUser(foundUser);
      localStorage.setItem('xavier_user', JSON.stringify(foundUser));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('xavier_user');
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type UserRole = 'student' | 'teacher' | 'admin' | null;

interface AuthContextType {
  userRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  userName: string | null;
  userAvatar: string | null;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  userName: null,
  userAvatar: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const storedRole = localStorage.getItem('userRole');
    return (storedRole as UserRole) || null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem('userName');
  });
  
  const [userAvatar, setUserAvatar] = useState<string | null>(() => {
    return localStorage.getItem('userAvatar');
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userRole', userRole || '');
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('userName', userName || '');
    localStorage.setItem('userAvatar', userAvatar || '');
  }, [userRole, isAuthenticated, userName, userAvatar]);

  const login = (email: string, password: string, role: UserRole) => {
    // In a real app, this would validate credentials with a backend
    if (email && password) {
      setUserRole(role);
      setIsAuthenticated(true);
      
      // Set mock user name based on role
      if (role === 'admin') {
        setUserName('Dr. Rajesh Mishra');
        setUserAvatar('https://i.pravatar.cc/150?u=admin');
      } else if (role === 'teacher') {
        setUserName('Prof. Anjali Patel');
        setUserAvatar('https://i.pravatar.cc/150?u=teacher');
      } else {
        setUserName('Amit Kumar');
        setUserAvatar('https://i.pravatar.cc/150?u=student');
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${role === 'admin' ? 'Administrator' : role === 'teacher' ? 'Professor' : 'Student'}!`,
      });
      
      navigate('/');
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    setUserName(null);
    setUserAvatar(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatar');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      userRole, 
      isAuthenticated, 
      login, 
      logout,
      userName,
      userAvatar
    }}>
      {children}
    </AuthContext.Provider>
  );
};

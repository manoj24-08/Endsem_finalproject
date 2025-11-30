import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'admin', 'professional', 'user', 'support'

  useEffect(() => {
    // Check localStorage for persisted login
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
  }, []);

  const login = (email, password, selectedRole) => {
    // Accept any email and password, use selected role
    if (email && password) {
      const roleNames = {
        admin: 'Admin User',
        professional: 'Pro User',
        user: 'Regular User',
        support: 'Support User',
      };
      const userData = { email, role: selectedRole, name: roleNames[selectedRole] || 'User' };
      setUser(userData);
      setRole(userData.role);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('role', userData.role);
      return userData;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const register = (email, password, role) => {
    // Mock register
    // In real app, send to server
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Auth Context
const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
} | null>(null);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('dieuclat_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would be an API call
      const mockUsers = JSON.parse(localStorage.getItem('dieuclat_users') || '[]');
      const user = mockUsers.find((u: any) => u.email === credentials.email && u.password === credentials.password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Remove password from user object
      const { password, ...userWithoutPassword } = user;
      const authenticatedUser: User = {
        ...userWithoutPassword,
        createdAt: new Date(user.createdAt),
      };

      // Store in localStorage
      localStorage.setItem('dieuclat_user', JSON.stringify(authenticatedUser));

      setAuthState({
        user: authenticatedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Validate passwords match
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const mockUsers = JSON.parse(localStorage.getItem('dieuclat_users') || '[]');
      const existingUser = mockUsers.find((u: any) => u.email === credentials.email);

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: credentials.name,
        email: credentials.email,
        password: credentials.password, // In real app, this would be hashed
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
        createdAt: new Date().toISOString(),
      };

      // Store user in mock database
      mockUsers.push(newUser);
      localStorage.setItem('dieuclat_users', JSON.stringify(mockUsers));

      // Remove password from user object
      const { password, ...userWithoutPassword } = newUser;
      const authenticatedUser: User = {
        ...userWithoutPassword,
        createdAt: new Date(userWithoutPassword.createdAt),
      };

      // Store authenticated user
      localStorage.setItem('dieuclat_user', JSON.stringify(authenticatedUser));

      setAuthState({
        user: authenticatedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed',
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('dieuclat_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
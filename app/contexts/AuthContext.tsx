'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  expiresAt: number | null;
  subject: string | null;
}

interface AuthContextType extends AuthState {
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: false,
    loading: true,
    expiresAt: null,
    subject: null,
  });

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      setAuthState({
        authenticated: data.authenticated || false,
        loading: false,
        expiresAt: data.expiresAt || null,
        subject: data.subject || null,
      });
    } catch {
      setAuthState({
        authenticated: false,
        loading: false,
        expiresAt: null,
        subject: null,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, checkAuth }}>
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

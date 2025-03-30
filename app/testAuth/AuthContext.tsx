import React, { createContext, useContext, useState, useEffect } from 'react';
import {ID} from 'react-native-appwrite'
import { account, User } from './appwrite';
import { useRouter } from 'expo-router';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string, name?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    console.log('checking user...');
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    console.log('registering user...');
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  };

  const login = async (email: string, password: string) => {
    console.log('logging in user...')
    await account.createEmailPasswordSession(email, password);
    const currentUser = await account.get();
    setUser(currentUser);
    router.replace('/testAuth/home');
  };

  const logout = async () => {
    console.log('logging out user...');
    await account.deleteSession('current');
    setUser(null);
    router.replace('/testAuth/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
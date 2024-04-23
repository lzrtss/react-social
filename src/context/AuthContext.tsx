import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '@/types';

export interface IContext {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthenticatedUser: () => Promise<boolean>;
}

export const initialUserState = {
  id: '',
  imageUrl: '',
  bio: '',
  email: '',
  name: '',
  username: '',
  posts: [],
};

const initialAuthState = {
  user: initialUserState,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthenticatedUser: async () => false as boolean,
};

const AuthContext = createContext<IContext>(initialAuthState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>(initialUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthenticatedUser = async () => {
    try {
      const currentUser = await getCurrentUser();

      if (currentUser) {
        setUser({
          id: currentUser.$id,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio,
          email: currentUser.email,
          name: currentUser.name,
          username: currentUser.username,
          posts: currentUser.posts,
        });

        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback');
    if (
      cookieFallback === '[]' ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate('/sign-in');
    }

    checkAuthenticatedUser();
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    user,
    checkAuthenticatedUser,
    setUser,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);

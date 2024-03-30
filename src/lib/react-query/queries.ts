import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useQuery,
} from '@tanstack/react-query';

import { createUser, signIn, signOut } from '../appwrite/api';
import { INewUser } from '@/types';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUser(user),
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      signIn(credentials),
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

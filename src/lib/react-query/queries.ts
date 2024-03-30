import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createPost,
  createUser,
  getRecentPosts,
  signIn,
  signOut,
} from '../appwrite/api';
import { INewPost, INewUser } from '@/types';
import { QUERY_KEYS } from './queryKeys';

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

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

import { ID, Query } from 'appwrite';

import { account, appwriteConfig, avatars, databases } from './config';
import { INewUser } from '@/types';

export const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  imageUrl: URL;
  name: string;
  username?: string;
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user,
    );

    return newUser;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const createUser = async (user: INewUser) => {
  try {
    // create new user account and save it to the Auth db
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );

    if (!newAccount) {
      throw new Error('Failed to create new account');
    }

    // create user's default avatar based on his name
    const avatarUrl = avatars.getInitials(user.name);

    // create new user and save it to the Users db
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      imageUrl: avatarUrl,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
    });

    return newUser;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailSession(
      credentials.email,
      credentials.password,
    );

    return session;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error('Failed to get current user.');
    }

    console.log('[API] ACCOUNT ID:', currentAccount.$id);

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    );

    if (!currentUser) {
      throw new Error('Failed to get current user.');
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);

    return null;
  }
};

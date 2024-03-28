import { ID } from 'appwrite';

import { INewUser } from '@/types';
import { account } from './config';

export const createUser = async (user: INewUser) => {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );

    return newUser;
  } catch (error: any) {
    console.log(error);

    return error;
  }
};

import { ID, Query } from 'appwrite';

import { account, appwriteConfig, avatars, databases, storage } from './config';
import { INewPost, INewUser } from '@/types';

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

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error('Failed to get current user.');
    }

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

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

export const getFilePreview = (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      'top',
      100,
    );

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    const result = await storage.deleteFile(appwriteConfig.storageId, fileId);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const saveFileToDB = async ({
  author,
  caption,
  location,
  imageId,
  imageUrl,
  tags,
}: {
  author: string;
  caption: string;
  location?: string;
  imageId: string;
  imageUrl?: URL;
  tags?: string[];
}) => {
  try {
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        author,
        caption,
        location,
        imageId,
        imageUrl,
        tags,
      },
    );

    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post: INewPost) => {
  try {
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) {
      throw new Error('Failed to upload file.');
    }

    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      deleteFile(uploadedFile.$id);

      throw new Error('Failed to get file preview.');
    }

    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    const newPost = await saveFileToDB({
      author: post.userId,
      caption: post.caption,
      location: post.location,
      imageId: uploadedFile.$id,
      imageUrl: fileUrl,
      tags,
    });

    if (!newPost) {
      deleteFile(uploadedFile.$id);

      throw new Error('Failed to save file');
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentPosts = async () => {
  try {
    const recentPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)],
    );

    if (!recentPosts) {
      throw new Error('Failed to fetch posts');
    }

    return recentPosts;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId: string, likesArray: string[]) => {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray,
      },
    );

    if (!updatedPost) {
      throw new Error('Failed to like the post');
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const unLikePost = async (postId: string, likesArray: string[]) => {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray,
      },
    );

    if (!updatedPost) {
      throw new Error('Failed to like the post');
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async (postId: string, userId: string) => {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      },
    );

    if (!updatedPost) {
      throw new Error('Failed to save the post');
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const unSavePost = async (postId: string) => {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      postId,
    );

    if (!statusCode) {
      throw new Error('Failed to unsave the post');
    }

    return statusCode;
  } catch (error) {
    console.log(error);
  }
};

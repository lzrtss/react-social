import { ID, Models, Query } from 'appwrite';

import { account, appwriteConfig, avatars, databases, storage } from './config';
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types';

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

    if (!newUser) {
      throw new Error('Failed to create new user');
    }

    return newUser;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const createUser = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );

    if (!newAccount) {
      throw new Error('Failed to create new account');
    }


    const avatarUrl = avatars.getInitials(user.name);


    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      imageUrl: avatarUrl,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
    });

    return newUser;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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

    const user = currentUser.documents[0];

    return user;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
    );

    if (!user) {
      throw new Error('Failed to get user.');
    }

    return user;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const getUsers = async (limit?: number) => {
  const currentUser = await getCurrentUser();

  const queries = [
    Query.orderDesc('$createdAt'),
    Query.notEqual('$id', currentUser.$id),
  ];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries,
    );

    if (!users) {
      throw new Error('Failed to get users.');
    }

    return users.documents;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const updateUser = async (user: IUpdateUser) => {
  const hasFileToUpdate = user.file.length > 0;

  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      },
    );

    if (!updatedUser) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      throw Error('Failed to upload file.');
    }

    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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

    if (!session) {
      throw new Error('Failed to sign.');
    }

    return session;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
    );

    if (!uploadedFile) {
      throw new Error('Failed to upload file.');
    }

    return uploadedFile;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    const result = await storage.deleteFile(appwriteConfig.storageId, fileId);

    if (!result) {
      throw new Error('Failed to delete file.');
    }

    return result;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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

    if (!newPost) {
      throw new Error('Failed to create new post.');
    }

    return newPost;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const getPostById = async (postId: string) => {
  try {
    const foundPost = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
    );

    if (!foundPost) {
      throw new Error('Failed to find the requested post');
    }

    return foundPost;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const getUserPosts = async (userId?: string) => {
  if (!userId) {
    return;
  }

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal('author', userId), Query.orderDesc('$createdAt')],
    );

    if (!post) throw Error;

    return post;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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
      await deleteFile(uploadedFile.$id);

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
      await deleteFile(uploadedFile.$id);

      throw new Error('Failed to create file');
    }

    return newPost;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const updatePost = async (post: IUpdatePost) => {
  const isFileUpdating = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (isFileUpdating) {
      const uploadedFile = await uploadFile(post.file[0]);

      if (!uploadedFile) {
        throw new Error('Failed to upload file.');
      }

      const fileUrl = getFilePreview(uploadedFile.$id);

      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);

        throw new Error('Failed to get file preview.');
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        location: post.location,
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        tags,
      },
    );

    if (!updatedPost) {
      await deleteFile(post.imageId);

      throw new Error('Failed to update file');
    }

    return updatedPost;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const deletePost = async (postId: string, imageId: string) => {
  if (!postId || !imageId) {
    throw new Error('No post id or image id provided.');
  }

  try {
    const result = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
    );

    return result;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const getInfinitePosts = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries,
    );

    if (!posts) {
      throw new Error('Failed to fetch the posts');
    }

    return posts;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const getSearchedPosts = async (searchQuery: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search('caption', searchQuery)],
    );

    if (!posts) {
      throw new Error('Failed to search posts');
    }

    return posts;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

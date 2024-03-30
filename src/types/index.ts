export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
}

export interface IUpdateUser {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
}

export interface INavLink {
  imgURL: string;
  route: string;
  label: string;
}

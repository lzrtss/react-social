import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertFileToUrl = (file: File) => {
  return URL.createObjectURL(file);
};

export const formatDate = (dateString: string): string => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifferenceInSeconds =
    (currentDate.getTime() - inputDate.getTime()) / 1000;

  if (timeDifferenceInSeconds < 60) {
    return `${Math.floor(timeDifferenceInSeconds)} second${
      timeDifferenceInSeconds < 2 ? '' : 's'
    } ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    return `${Math.floor(timeDifferenceInSeconds / 60)} minute${
      timeDifferenceInSeconds < 120 ? '' : 's'
    } ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    return `${Math.floor(timeDifferenceInSeconds / 3600)} hour${
      timeDifferenceInSeconds < 7200 ? '' : 's'
    } ago`;
  } else {
    return `${Math.floor(timeDifferenceInSeconds / 86400)} day${
      timeDifferenceInSeconds < 172800 ? '' : 's'
    } ago`;
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

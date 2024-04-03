import React, { useEffect, useState } from 'react';
import { Models } from 'appwrite';

import {
  useGetCurrentUser,
  useLikePost,
  useSavePost,
  useUnSavePost,
} from '@/lib/react-query/queries';
import { checkIsLiked } from '@/lib/utils';
import { Loader } from '@/components/shared';

interface PostActionsProps {
  post?: Models.Document;
  userId: string;
}

const PostActions = ({ post, userId }: PostActionsProps) => {
  const [likes, setLikes] = useState(() =>
    post?.likes.map((user: Models.Document) => user.$id),
  );
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: unSavePost, isPending: isUnSaving } = useUnSavePost();
  const { data: currentUser, isLoading: isFetching } = useGetCurrentUser();

  const savedPost = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id,
  );

  useEffect(() => {
    setIsSaved(savedPost ? true : false);
  }, [currentUser]);

  const handleLike: React.MouseEventHandler<HTMLImageElement> = (e) => {
    e.stopPropagation();

    let updatedLikes = [...likes];
    const isLiked = updatedLikes.includes(userId);

    if (isLiked) {
      updatedLikes = updatedLikes.filter((id) => id !== userId);
    } else {
      updatedLikes.push(userId);
    }

    setLikes(updatedLikes);
    likePost({ postId: post?.$id || '', likesArray: updatedLikes });
  };

  const handleSave: React.MouseEventHandler<HTMLImageElement> = (e) => {
    e.stopPropagation();

    if (savedPost) {
      setIsSaved(false);
      unSavePost(savedPost.$id);
    } else {
      savePost({
        postId: post?.$id || '',
        userId,
      });

      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 ml-2">
        <img
          src={
            checkIsLiked(likes, userId)
              ? '/assets/icons/liked.svg'
              : '/assets/icons/like.svg'
          }
          width={24}
          height={24}
          alt="like"
          className="cursor-pointer"
          onClick={handleLike}
        />
        <span className=" max-md:text-sm">
          {likes.length ? likes.length : null}
        </span>
      </div>

      <div className="flex gap-2 mr-2">
        {isFetching || isSaving || isUnSaving ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
            width={24}
            height={24}
            alt="save"
            className="cursor-pointer"
            onClick={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default PostActions;

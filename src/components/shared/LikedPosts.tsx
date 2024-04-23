import { PostList, Loader } from '@/components/shared';
import { LIKED_POSTS } from '@/constants';
import { useGetCurrentUser } from '@/lib/react-query/queries';

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <Loader
        size={48}
        className="w-full h-full flex justify-center items-center"
      />
    );

  return (
    <>
      {currentUser.liked.length === 0 ? (
        <p className="text-light-4">{LIKED_POSTS.NO_POSTS}</p>
      ) : null}

      <PostList posts={currentUser.liked} showActions={false} />
    </>
  );
};

export default LikedPosts;

import { GridPostList, Loader } from '@/components/shared';
import { useGetCurrentUser } from '@/lib/react-query/queries';

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader
          size={48}
          className="w-full h-full flex justify-center items-center"
        />
      </div>
    );

  return (
    <section>
      {currentUser.liked.length === 0 ? (
        <p className="text-light-4">No liked posts yet</p>
      ) : null}

      <GridPostList posts={currentUser.liked} showActions={false} />
    </section>
  );
};

export default LikedPosts;

import { Models } from 'appwrite';

import { Loader, PostCard } from '@/components/shared';
import { useGetRecentPosts } from '@/lib/react-query/queries';

const Home = () => {
  const {
    data: posts,
    isPending: isFetchingPosts,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  if (isFetchingPosts) {
    return (
      <Loader
        size={48}
        className="w-full h-full flex justify-center items-center"
      />
    );
  }

  return (
    <div className="flex flex-1">
      <div className="container">
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="w-full text-left text-2xl font-bold md:text-3xl">
            Recent Posts
          </h2>

          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts?.documents.map((post: Models.Document) => (
              <li key={post.$id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

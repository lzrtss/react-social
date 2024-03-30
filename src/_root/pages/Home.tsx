import { Models } from 'appwrite';

import { Loader } from '@/components/shared';
import { useGetRecentPosts } from '@/lib/react-query/queries';

const Home = () => {
  const {
    data: posts,
    isPending: isFetchingPosts,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="w-full text-left text-2xl font-bold md:text-3xl">
            Recent Posts
          </h2>

          {isFetchingPosts && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id}>{post.caption}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

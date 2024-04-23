import { Models } from 'appwrite';

import { useGetCurrentUser } from '@/lib/react-query/queries';
import { PostList, Loader } from '@/components/shared';
import { SAVED } from '@/constants';

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savedPosts = currentUser?.save
    .map((savedPost: Models.Document) => ({
      ...savedPost.post,
      author: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  if (!currentUser) {
    return (
      <Loader
        size={48}
        className="w-full h-full flex justify-center items-center"
      />
    );
  }

  return (
    <div className="container">
      <div className="w-full max-w-5xl flex gap-2">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="save"
          className="invert brightness-0 transition"
        />
        <h2 className="w-full text-2xl font-bold md:text-3xl text-left">
          {SAVED.PAGE_TITLE}
        </h2>
      </div>

      <ul className="w-full flex justify-center max-w-5xl gap-9">
        {savedPosts.length === 0 ? (
          <p className="text-light-4">{SAVED.NO_POSTS}</p>
        ) : (
          <PostList posts={savedPosts} showActions={false} showUser={false} />
        )}
      </ul>
    </div>
  );
};

export default Saved;

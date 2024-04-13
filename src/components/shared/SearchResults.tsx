import { Models } from 'appwrite';

import { PostList, Loader } from '@/components/shared';

interface SearchResultsProps {
  isLoading: boolean;
  isSuccess: boolean;
  posts: Models.Document[];
}

const SearchResults = ({ isLoading, isSuccess, posts }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <Loader
        size={48}
        className="w-full h-full flex justify-center items-center"
      />
    );
  } else if (posts?.length > 0) {
    return <PostList posts={posts} />;
  }

  return (
    <>
      {isSuccess && (
        <p className="w-full mt-10 text-center text-light-4">
          No results found
        </p>
      )}
    </>
  );
};

export default SearchResults;

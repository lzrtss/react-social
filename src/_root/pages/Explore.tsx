import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Input } from '@/components/ui';
import { PostList, Loader, SearchResults } from '@/components/shared';
import {
  useGetInfinitePosts,
  useGetSearchedPosts,
} from '@/lib/react-query/queries';
import { useDebounce } from '@/hooks';
import { Models } from 'appwrite';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage } = useGetInfinitePosts();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: searchedPosts,
    isFetching: isSearchFetching,
    isSuccess,
  } = useGetSearchedPosts(debouncedSearchQuery);

  useEffect(() => {
    if (inView && !searchQuery) {
      fetchNextPage();
    }
  }, [inView, searchQuery]);

  if (!posts) {
    return (
      <Loader
        size={48}
        className="w-full h-full flex justify-center items-center"
      />
    );
  }

  const isSearchQuery = searchQuery.trim() !== '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <div className="w-full max-w-5xl flex flex-col items-center gap-6 md:gap-8">
        <h2 className="w-full text-2xl md:text-3xl font-bold">Search Posts</h2>

        <div className="w-full flex gap-1 px-4 rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />

          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="w-full max-w-5xl my-8">
        <h3 className="w-full text-xl md:text-2xl font-bold">Trending Posts</h3>
      </div>

      <div className="w-full max-w-5xl flex flex-wrap gap-8">
        {isSearchQuery ? (
          <SearchResults
            isLoading={isSearchFetching}
            isSuccess={isSuccess}
            posts={searchedPosts?.documents as Models.Document[]}
          />
        ) : (
          posts.pages.map((item, index) => (
            <PostList key={`post-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchQuery ? (
        <div ref={ref} className="mt-10">
          <Loader size={48} />
        </div>
      ) : null}
    </div>
  );
};

export default Explore;

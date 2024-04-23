import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Models } from 'appwrite';

import {
  PostList,
  Loader,
  SearchResults,
  SearchBar,
} from '@/components/shared';
import {
  useGetInfinitePosts,
  useGetSearchedPosts,
} from '@/lib/react-query/queries';
import { useDebounce } from '@/hooks';
import { EXPLORE } from '@/constants';

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

  const isSearchQuery = searchQuery.trim() !== '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (!posts) {
    return (
      <Loader
        size={48}
        className="w-full h-full flex justify-center items-center"
      />
    );
  }

  return (
    <div className="container">
      <div className="w-full max-w-5xl flex flex-col items-center gap-6 md:gap-8">
        <h2 className="w-full text-2xl md:text-3xl font-bold">
          {EXPLORE.SEARCH_TITLE}
        </h2>

        <SearchBar value={searchQuery} handleChange={handleSearchChange} />
      </div>

      <div className="w-full max-w-5xl flex flex-wrap gap-8">
        {isSearchQuery ? (
          <>
            <h3 className="my-8 text-xl md:text-2xl font-bold">
              {EXPLORE.RESULTS_TITLE}
            </h3>
            <SearchResults
              isLoading={isSearchFetching}
              isSuccess={isSuccess}
              posts={searchedPosts?.documents as Models.Document[]}
            />
          </>
        ) : (
          <>
            <h3 className="my-8 text-xl md:text-2xl font-bold">
              {EXPLORE.PAGE_TITLE}
            </h3>
            {posts.pages.map((item, index) => (
              <PostList key={`post-${index}`} posts={item.documents} />
            ))}
          </>
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

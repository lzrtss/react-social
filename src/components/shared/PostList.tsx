import { Link } from 'react-router-dom';
import { Models } from 'appwrite';

import { useUserContext } from '@/context/AuthContext';
import { PostActions } from '@/components/shared';

interface PostListProps {
  posts: Models.Document[];
  showActions?: boolean;
  showUser?: boolean;
}

const PostList = ({
  posts,
  showActions = true,
  showUser = true,
}: PostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
      {posts.map((post) => (
        <li key={post.$id}>
          <article className="relative min-w-80 h-80">
            <Link to={`/posts/${post.$id}`}>
              <div className="w-full h-full flex overflow-hidden rounded-3xl border border-dark-4 hover:border-neutral-700 cursor-pointer">
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <div className="absolute bottom-0 p-5 w-full flex justify-between gap-2 bg-gradient-to-t from-dark-1 to-transparent rounded-b-3xl">
              {showUser ? (
                <Link to={`/profile/${post.author.$id}`}>
                  <div className="flex justify-start items-center gap-2">
                    <img
                      src={post.author.imageUrl}
                      width={48}
                      height={48}
                      alt="author"
                      className="bg-dark-4 rounded-full"
                    />
                    <p className="line-clamp-1">
                      {post.author.name || post.author.username}
                    </p>
                  </div>
                </Link>
              ) : null}

              {showActions ? (
                <PostActions post={post} userId={user.id} />
              ) : null}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default PostList;

import { Link } from 'react-router-dom';
import { Models } from 'appwrite';

import { formatDate } from '@/lib/utils';
import { useUserContext } from '@/context/AuthContext';
import { PostActions } from '@/components/shared';

interface PostCardProps {
  post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.author) {
    return;
  }

  return (
    <article className="w-full max-w-screen-sm p-5 lg:p-7 bg-dark-2 rounded-3xl border border-dark-4 hover:border-neutral-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.author.$id}`}>
            <img
              src={post.author?.imageUrl || '/assets/icons/user.svg'}
              alt="author"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="font-medium lg:font-semibold text-light-1">
              <Link to={`/profile/${post.author.$id}`}>{post.author.name}</Link>
            </p>

            <div className="flex justify-center items-center gap-2 text-light-3">
              <p className="text-xs lg:text-sm">
                {formatDate(post.$createdAt)}
              </p>
              -<p className="text-xs lg:text-sm">{post.location}</p>
            </div>
          </div>
        </div>

        <Link to={`/edit-post/${post.$id}`} className="self-start">
          <img
            src="/assets/icons/edit.svg"
            width={24}
            height={24}
            alt="edit post"
            className={user.id !== post.author.$id ? 'hidden' : ''}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="py-5 text-sm font-medium lg:text-[16px]">
          <p className="mb-4">{post.caption}</p>
          <ul className="flex gap-1">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        {post?.imageUrl ? (
          <img
            src={post.imageUrl}
            alt="post image"
            className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-xl object-cover mb-5"
          />
        ) : null}
      </Link>

      <PostActions post={post} userId={user.id} />
    </article>
  );
};

export default PostCard;

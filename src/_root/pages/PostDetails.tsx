import { Models } from 'appwrite';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { PostList, Loader, PostActions } from '@/components/shared';
import { Button } from '@/components/ui';
import {
  useDeletePost,
  useGetPostById,
  useGetUserPosts,
} from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';
import { formatDate } from '@/lib/utils';
import { POST_DETAILS } from '@/constants';

const PostDetails = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { mutateAsync: deletePost } = useDeletePost();
  const { data: post, isPending: isFetchingPost } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.author.$id,
  );
  const { user } = useUserContext();

  const relatedPosts = userPosts?.documents.filter(
    (userPost: Models.Document) => userPost.$id !== id,
  );

  const handleDeletePost = async () => {
    await deletePost({ postId: id, imageId: post?.imageId });

    navigate(-1);
  };

  if (isFetchingPost) {
    return (
      <Loader
        size={48}
        className="w-full h-full flex justify-center items-center"
      />
    );
  }

  return (
    <div className="container">
      <div className="w-full max-w-5xl flex flex-col xl:flex-row bg-dark-4 border border-dark-4 rounded-3xl">
        <img
          src={post?.imageUrl}
          alt="post"
          className="h-80 lg:h-[480px] xl:w-[48%] p-5 rounded-3xl object-cover bg-dark-4"
        />

        <div className="p-8 flex flex-1 flex-col items-start gap-5 lg:gap-7 bg-dark-4 rounded-3xl">
          <div className="w-full flex justify-between items-center">
            <Link
              to={`/profile/${post?.author.$id}`}
              className="flex items-center gap-3"
            >
              <img
                src={post?.author?.imageUrl || '/assets/icons/user.svg'}
                alt="author"
                width={48}
                height={48}
                className="rounded-full"
              />

              <div className="flex flex-col">
                <p className="font-medium lg:font-semibold text-light-1">
                  {post?.author.name}
                </p>

                <div className="flex justify-center items-center gap-2 text-light-3">
                  <p className="text-xs lg:text-sm">
                    {formatDate(post?.$createdAt || '')}
                  </p>
                  -<p className="text-xs lg:text-sm">{post?.location}</p>
                </div>
              </div>
            </Link>

            <div className="flex justify-center items-center gap-4">
              <Link
                to={`/edit-post/${post?.$id}`}
                className={user.id !== post?.author.$id ? 'hidden' : ''}
              >
                <img
                  src="/assets/icons/edit.svg"
                  width={24}
                  height={24}
                  alt="edit"
                />
              </Link>

              <Button
                variant="ghost"
                className={`p-0 flex gap-3 hover:bg-transparent hover:text-light-1 text-light-1 text-sm font-medium lg:text-[16px] ${
                  user.id !== post?.author.$id ? 'hidden' : ''
                }`}
                onClick={handleDeletePost}
              >
                <img
                  src="/assets/icons/delete.svg"
                  width={24}
                  height={24}
                  alt="delete"
                />
              </Button>
            </div>
          </div>

          <hr className="w-full border border-dark-4/80" />

          <div className="w-full py-4 flex flex-1 flex-col text-sm font-medium lg:text-[16px]">
            <p className="mb-4">{post?.caption}</p>
            <ul className="flex flex-wrap gap-2">
              {post?.tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <PostActions post={post} userId={user.id} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <hr className="w-full border border-dark-4/80" />

        <h2 className="w-full my-12 text-lg font-bold">{POST_DETAILS.RELATED_TITLE}</h2>
        {isUserPostLoading || !relatedPosts ? (
          <Loader size={48} className="w-full flex justify-center" />
        ) : (
          <PostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;

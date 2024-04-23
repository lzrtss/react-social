import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { PostForm } from '@/components/forms';
import { Loader } from '@/components/shared';
import { Button, useToast } from '@/components/ui';
import {
  useDeletePost,
  useGetPostById,
  useUpdatePost,
} from '@/lib/react-query/queries';
import { postValidationSchema } from '@/lib/validation';
import { useUserContext } from '@/context/AuthContext';
import { EDIT_POST } from '@/constants';

const EditPost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id = '' } = useParams();
  const { user } = useUserContext();
  const { data: post, isPending: isFetchingPost } = useGetPostById(id);

  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeletePost();
  const { mutateAsync: updatePost, isPending: isUpdatingPost } =
    useUpdatePost();

  const handleDeletePost = async () => {
    await deletePost({ postId: id, imageId: post?.imageId });

    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (values: z.infer<typeof postValidationSchema>) => {
    if (!post) {
      return;
    }

    const updatedPost = await updatePost({
      ...values,
      postId: post.$id,
      imageId: post?.imageId,
      imageUrl: post?.imageUrl,
    });

    if (!updatedPost) {
      return toast({
        title: EDIT_POST.ERROR_MESSAGE,
      });
    }

    navigate(`/posts/${post.$id}`);
  };

  if (user.id !== post?.author.$id) {
    return <Navigate to="/" />;
  }

  if (isFetchingPost) {
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
        <div className="w-full max-w-5xl flex justify-start items-center gap-3">
          <img
            src="/assets/icons/post.svg"
            width={36}
            height={36}
            alt="add post"
          />
          <h2 className="w-full text-2xl font-bold md:text-3xl text-left">
            {EDIT_POST.PAGE_TITLE}
          </h2>

          <Button
            variant="ghost"
            className="w-[160px] flex gap-2 bg-red hover:bg-rose-500 text-light-1 whitespace-nowrap"
            disabled={isDeletingPost}
            onClick={handleDeletePost}
          >
            {EDIT_POST.DELETE_BUTTON_TEXT}
          </Button>
        </div>

        <PostForm
          isLoading={isUpdatingPost}
          post={post}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditPost;

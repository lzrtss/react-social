import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { PostForm } from '@/components/forms';
import { Loader } from '@/components/shared';
import { useToast } from '@/components/ui';
import { useGetPostById, useUpdatePost } from '@/lib/react-query/queries';
import { postValidationSchema } from '@/lib/validation';

const EditPost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id = '' } = useParams();

  const { data: post, isPending: isFetchingPost } = useGetPostById(id);

  const { mutateAsync: updatePost, isPending: isUpdatingPost } =
    useUpdatePost();

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
        title: 'Failed to update post. Please try again.',
      });
    }

    navigate(`/posts/${post.$id}`);
  };

  return (
    <div className="flex flex-1">
      <div className="container">
        <div className="w-full max-w-5xl flex justify-start items-center gap-3">
          <img
            src="/assets/icons/create-post.svg"
            width={36}
            height={36}
            alt="add post"
          />
          <h2 className="w-full text-2xl font-bold md:text-3xl text-left">
            Edit Post
          </h2>
        </div>

        {isFetchingPost ? (
          <div className="h-[70vh] flex justify-center items-center">
            <Loader size={48} />
          </div>
        ) : (
          <PostForm
            isLoading={isUpdatingPost}
            post={post}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default EditPost;

import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { PostForm } from '@/components/forms';
import { useToast } from '@/components/ui';
import { useUserContext } from '@/context/AuthContext';
import { useCreatePost } from '@/lib/react-query/queries';
import { postValidationSchema } from '@/lib/validation';

const CreatePost = () => {
  const navigate = useNavigate();
  const { mutateAsync: createPost, isPending: isLoading } = useCreatePost();
  const { user } = useUserContext();
  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof postValidationSchema>) => {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      return toast({
        title: 'Something went wrong... Please try again.',
      });
    }

    navigate('/');
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
            Create Post
          </h2>
        </div>

        <PostForm isLoading={isLoading} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreatePost;

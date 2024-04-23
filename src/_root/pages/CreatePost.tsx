import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { PostForm } from '@/components/forms';
import { useToast } from '@/components/ui';
import { useUserContext } from '@/context/AuthContext';
import { useCreatePost } from '@/lib/react-query/queries';
import { postValidationSchema } from '@/lib/validation';
import { CREATE_POST } from '@/constants';

const CreatePost = () => {
  const navigate = useNavigate();
  const { mutateAsync: createPost, isPending: isLoading } = useCreatePost();
  const { user } = useUserContext();
  const { toast } = useToast();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (values: z.infer<typeof postValidationSchema>) => {
    try {
      const newPost = await createPost({
        ...values,
        userId: user.id,
      });

      if (!newPost) {
        return toast({
          title: CREATE_POST.ERROR_MESSAGE,
        });
      }

      navigate('/');
    } catch (error: any) {
      return toast({
        title: error.message,
      });
    }
  };

  return (
    <div className="flex flex-1">
      <div className="container">
        <div className="w-full max-w-5xl flex justify-start items-center gap-3">
          <img
            src="/assets/icons/post.svg"
            width={36}
            height={36}
            alt="add post"
            className="invert brightness-0 transition"
          />
          <h2 className="w-full text-2xl font-bold md:text-3xl text-left">
            {CREATE_POST.PAGE_TITLE}
          </h2>
        </div>

        <PostForm
          isLoading={isLoading}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreatePost;

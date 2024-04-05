import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { useToast } from '@/components/ui';
import { useUserContext } from '@/context/AuthContext';
import { Loader } from '@/components/shared';
import { ProfileForm } from '@/components/forms';
import { profileValidationSchema } from '@/lib/validation';
import { useGetUserById, useUpdateUser } from '@/lib/react-query/queries';

const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const { toast } = useToast();

  const { data: currentUser, isPending: isFetchingUser } = useGetUserById(
    id || '',
  );
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  if (!currentUser || isFetchingUser)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader size={48} />
      </div>
    );

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (
    values: z.infer<typeof profileValidationSchema>,
  ) => {
    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });

    if (!updatedUser) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }

    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    });

    return navigate(`/profile/${id}`);
  };

  return (
    <div className="flex flex-1">
      <div className="container">
        <div className="w-full max-w-5xl flex justify-start items-center gap-3">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert brightness-0 transition"
          />
          <h2 className="w-full text-2xl font-bold md:text-3xl text-left">
            Edit Profile
          </h2>
        </div>

        <ProfileForm
          isLoading={isLoadingUpdate}
          user={user}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditProfile;

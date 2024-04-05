import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { SignInForm } from '@/components/forms';
import { useToast } from '@/components/ui';
import { signInValidationSchema } from '@/lib/validation';
import { useSignIn } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthenticatedUser, isLoading: isLoadingUser } = useUserContext();

  const { mutateAsync: signIn } = useSignIn();

  const handleSubmit = async (
    values: z.infer<typeof signInValidationSchema>,
  ) => {
    const session = await signIn({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: 'Failed to sign in. Please try again.',
      });
    }

    const isLoggedIn = await checkAuthenticatedUser();

    if (isLoggedIn) {
      navigate('/');
    } else {
      return toast({
        title: 'Failed to sign in. Please try again.',
      });
    }
  };

  return <SignInForm isLoading={isLoadingUser} onSubmit={handleSubmit} />;
};

export default SignIn;

import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { SignInForm } from '@/components/forms';
import { useToast } from '@/components/ui';
import { signInValidationSchema } from '@/lib/validation';
import { useSignIn } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';
import { SIGN_IN } from '@/constants';

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthenticatedUser, isLoading: isLoadingUser } = useUserContext();

  const { mutateAsync: signIn } = useSignIn();

  const handleSubmit = async (
    values: z.infer<typeof signInValidationSchema>,
  ) => {
    try {
      const session = await signIn({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        return toast({
          title: SIGN_IN.ERROR_MESSAGE,
        });
      }

      const isLoggedIn = await checkAuthenticatedUser();

      if (isLoggedIn) {
        navigate('/');
      } else {
        return toast({
          title: SIGN_IN.ERROR_MESSAGE,
        });
      }
    } catch (error: any) {
      return toast({
        title: error.message,
      });
    }
  };

  return <SignInForm isLoading={isLoadingUser} onSubmit={handleSubmit} />;
};

export default SignIn;

import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { SignUpForm } from '@/components/forms';
import { useToast } from '@/components/ui/use-toast';
import { signUpValidationSchema } from '@/lib/validation';
import { useCreateUser, useSignIn } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';
import { SIGN_IN, SIGN_UP } from '@/constants';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthenticatedUser } = useUserContext();

  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();

  const { mutateAsync: signIn } = useSignIn();

  const handleSubmit = async (
    values: z.infer<typeof signUpValidationSchema>,
  ) => {
    try {
      const newUser = await createUser(values);

      if (!newUser) {
        return toast({
          title: SIGN_UP.ERROR_MESSAGE,
        });
      }

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

  return <SignUpForm isLoading={isCreatingUser} onSubmit={handleSubmit} />;
};

export default SignUp;

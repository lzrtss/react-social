import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Loader } from '@/components/shared';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
} from '@/components/ui';
import { signInValidationSchema } from '@/lib/validation';
import { useSignIn } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthenticatedUser, isLoading: iLoadingUser } = useUserContext();

  const { mutateAsync: signIn } = useSignIn();

  const form = useForm<z.infer<typeof signInValidationSchema>>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signInValidationSchema>) => {
    const session = await signIn({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: '[ SESSION ] Failed to sign in. Please try again.',
      });
    }

    const isLoggedIn = await checkAuthenticatedUser();

    if (isLoggedIn) {
      form.reset();

      navigate('/');
    } else {
      return toast({
        title: '[IS_LOGGED_IN] Failed to sign in. Please try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:420 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <img
              src="/assets/icons/logo.svg"
              alt="logo"
              width={28}
              height={28}
            />
            <h2 className="text-2xl font-bold text-violet-100">React Posts</h2>
          </div>

          <h2 className="mt-5 text-2xl font-bold">Sign in to your account</h2>

          <p className="mt-2 text-light-3">
            Welcome back! Please enter your details
          </p>
        </div>

        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mt-4 flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your email"
                    className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your password"
                    className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 flex gap-2 bg-primary-500 hover:bg-primary-600 text-light-1 font-medium"
          >
            {iLoadingUser ? (
              <div className="flex justify-center items-center gap-2">
                <Loader />
                <span className="font-medium">Loading...</span>
              </div>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        <p className="mt-4 text-sm text-light-2 text-center">
          Do not have an account yet?
          <Link
            to="/sign-up"
            className="ml-1 text-primary-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;

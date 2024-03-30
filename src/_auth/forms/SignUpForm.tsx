import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/shared';
import { signUpValidationSchema } from '@/lib/validation';
import { useCreateUser, useSignIn } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthenticatedUser } = useUserContext();

  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();

  const { mutateAsync: signIn } = useSignIn();

  const form = useForm<z.infer<typeof signUpValidationSchema>>({
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpValidationSchema>) => {
    const newUser = await createUser(values);

    if (!newUser) {
      return toast({
        title: 'Failed to create an account. Please try again.',
      });
    }

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
      form.reset();

      navigate('/');
    } else {
      return toast({
        title: 'Failed to sign in. Please try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:420 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center gap-2">
            <img
              src="/assets/icons/logo.svg"
              alt="logo"
              width={28}
              height={28}
            />
            <h2 className="text-2xl font-bold text-violet-100">React Posts</h2>
          </div>

          <h2 className="mt-5 text-2xl font-bold">Create a new account</h2>

          <p className="mt-2 text-light-3">
            Enter your info to continue using React Posts
          </p>
        </div>

        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mt-4 flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="jdoe"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john123@mail.com"
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
                    placeholder="******"
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
            {isCreatingUser ? (
              <div className="flex justify-center items-center gap-2">
                <Loader />
                <span className="font-medium">Loading...</span>
              </div>
            ) : (
              'Sign up'
            )}
          </Button>
        </form>

        <p className="mt-4 text-sm text-light-2 text-center">
          Already have an account?
          <Link
            to="/sign-in"
            className="ml-1 text-primary-500 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignUpForm;

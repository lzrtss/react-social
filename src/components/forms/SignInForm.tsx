import { Link } from 'react-router-dom';
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
} from '@/components/ui';
import { signInValidationSchema } from '@/lib/validation';
import { APP, SIGN_IN_FORM } from '@/constants';

interface SignInFormProps {
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof signInValidationSchema>) => void;
}

const SignInForm = ({ isLoading, onSubmit }: SignInFormProps) => {
  const form = useForm<z.infer<typeof signInValidationSchema>>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <div className="sm:w-420 flex flex-col justify-center items-center p-5 lg:p-7 bg-dark-3 rounded-3xl border border-dark-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <img
              src="/assets/icons/logo.svg"
              alt="logo"
              width={28}
              height={28}
            />
            <h2 className="text-2xl font-bold text-violet-100">{APP.TITLE}</h2>
          </div>

          <h2 className="mt-5 text-2xl font-bold">{SIGN_IN_FORM.TITLE}</h2>

          <p className="mt-2 text-light-3">{SIGN_IN_FORM.GREETINGS}</p>
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
                <FormLabel>{SIGN_IN_FORM.EMAIL_LABEL}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={SIGN_IN_FORM.EMAIL_PLACEHOLDER}
                    className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{SIGN_IN_FORM.PASSWORD_LABEL}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={SIGN_IN_FORM.PASSWORD_PLACEHOLDER}
                    className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 flex gap-2 bg-primary-500 hover:bg-primary-600 text-light-1 font-medium"
          >
            {isLoading ? <Loader /> : null} {SIGN_IN_FORM.SUBMIT_BUTTON_TEXT}
          </Button>
        </form>

        <p className="mt-4 text-sm text-light-2 text-center">
          {SIGN_IN_FORM.QUESTION_TEXT}
          <Link
            to="/sign-up"
            className="ml-1 text-primary-500 font-semibold hover:underline"
          >
            {SIGN_IN_FORM.LINK_TEXT}
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;

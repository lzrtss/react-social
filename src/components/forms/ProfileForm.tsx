import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Loader, ProfileUploader } from '@/components/shared';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/ui';
import { profileValidationSchema } from '@/lib/validation';
import { PROFILE_FORM } from '@/constants';

interface ProfileFormProps {
  isLoading: boolean;
  user: {
    imageUrl: string;
    name: string;
    username: string;
    email: string;
    bio: string;
  };
  onCancel: () => void;
  onSubmit: (values: z.infer<typeof profileValidationSchema>) => void;
}

const ProfileForm = ({
  isLoading,
  user,
  onCancel,
  onSubmit,
}: ProfileFormProps) => {
  const form = useForm<z.infer<typeof profileValidationSchema>>({
    resolver: zodResolver(profileValidationSchema),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-5xl mt-4 flex flex-col gap-7"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex">
              <FormControl>
                <ProfileUploader
                  fieldChange={field.onChange}
                  mediaUrl={user.imageUrl}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                {PROFILE_FORM.NAME_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                {PROFILE_FORM.USERNAME_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                {PROFILE_FORM.EMAIL_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                {PROFILE_FORM.BIO_LABEL}
              </FormLabel>
              <FormControl>
                <Textarea
                  className="h-36 bg-dark-4 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end max-sm:justify-between gap-4">
          <Button
            type="button"
            className="w-[160px] flex gap-2 bg-dark-4 text-light-1 transition hover:bg-light-1 hover:text-dark-1"
            disabled={isLoading}
            onClick={onCancel}
          >
            {PROFILE_FORM.CANCEL_BUTTON_TEXT}
          </Button>
          <Button
            type="submit"
            className="w-[160px] flex gap-2 bg-primary-500 hover:bg-primary-600 text-light-1 whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : null} {PROFILE_FORM.SUBMIT_BUTTON_TEXT}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;

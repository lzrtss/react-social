import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Models } from 'appwrite';

import { FileUploader, Loader } from '@/components/shared';
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
import { postValidationSchema } from '@/lib/validation';

interface PostFormProps {
  isLoading: boolean;
  post?: Models.Document;
  onCancel: () => void;
  onSubmit: (values: z.infer<typeof postValidationSchema>) => void;
}

const PostForm = ({ isLoading, post, onCancel, onSubmit }: PostFormProps) => {
  const form = useForm<z.infer<typeof postValidationSchema>>({
    resolver: zodResolver(postValidationSchema),
    defaultValues: {
      caption: post ? post.caption : '',
      file: [],
      location: post ? post.location : '',
      tags: post ? post.tags.join(', ') : '',
    },
  });

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-5xl flex flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption *</FormLabel>
              <FormControl>
                <Textarea
                  className="h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photo (.jpg, .png, .svg, 10Mb max) *</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Tags (separated by comma)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="TS, ReactJS, TailwindCSS"
                  className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end max-sm:justify-between">
          <Button
            type="button"
            className="w-[160px] flex gap-2 bg-dark-4 px-5 text-light-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-[160px] flex gap-2 bg-primary-500 hover:bg-primary-500 text-light-1 whitespace-nowrap"
          >
            {isLoading ? <Loader /> : null} Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;

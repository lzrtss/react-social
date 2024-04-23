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
import { POST_FORM } from '@/constants';

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
              <FormLabel>{POST_FORM.CAPTION_LABEL}</FormLabel>
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

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{POST_FORM.FILE_UPLOADER_LABEL}</FormLabel>
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
              <FormLabel>{POST_FORM.LOCATION_LABEL}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={POST_FORM.LOCATION_PLACEHOLDER}
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
              <FormLabel>{POST_FORM.TAGS_LABEL}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={POST_FORM.LOCATION_PLACEHOLDER}
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
            className="w-[160px] flex gap-2 bg-dark-4 text-light-1 transition hover:bg-light-1 hover:text-dark-1"
            disabled={isLoading}
            onClick={onCancel}
          >
            {POST_FORM.CANCEL_BUTTON_TEXT}
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-[160px] flex gap-2 bg-primary-500 hover:bg-primary-600 text-light-1 whitespace-nowrap"
          >
            {isLoading ? <Loader /> : null} {POST_FORM.SUBMIT_BUTTON_TEXT}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;

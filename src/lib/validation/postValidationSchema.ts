import { z } from 'zod';

export const postValidationSchema = z.object({
  caption: z
    .string()
    .min(2, {
      message: 'Caption must contain at least 2 characters.',
    })
    .max(2200, {
      message: 'Caption must contain less than 2200 characters.',
    }),

  file: z.custom<File[]>(),

  location: z.string(),

  tags: z.string(),
});

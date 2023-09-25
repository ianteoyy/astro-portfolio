import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      thumbnail: image(),
      thumbnailAlt: z.string(),
      publishDate: z.string().transform((str) => new Date(str)),
    }),
});

export const collections = { blog: blogCollection };

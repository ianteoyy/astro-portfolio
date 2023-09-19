import { defineCollection, z } from "astro:content";

const libraryCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      language: z.string(),
      thumbnail: image(),
      publishDate: z.string().transform((str) => new Date(str)),
    }),
});

export const collections = { library: libraryCollection };

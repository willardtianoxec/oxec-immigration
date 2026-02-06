// This file contains the posts router to be added to routers.ts
// Add this to the appRouter object in routers.ts

import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPostBySlug,
  getPosts,
  searchPosts,
} from "./db";

export const postsRouter = router({
  create: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      subtitle: z.string().optional(),
      slug: z.string().min(1),
      content: z.string().min(1),
      excerpt: z.string().optional(),
      type: z.enum(["blog", "success-case"]),
      category: z.string().optional(),
      tags: z.string().optional(),
      coverImage: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await createPost({
        ...input,
        published: false,
        authorId: ctx.user.id,
      });
    }),

  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      subtitle: z.string().optional(),
      slug: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
      excerpt: z.string().optional(),
      category: z.string().optional(),
      tags: z.string().optional(),
      coverImage: z.string().optional(),
      published: z.boolean().optional(),
      publishedAt: z.date().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await updatePost(id, data);
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await deletePost(input.id);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getPostById(input.id);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await getPostBySlug(input.slug);
    }),

  list: publicProcedure
    .input(z.object({
      type: z.enum(["blog", "success-case"]).optional(),
      category: z.string().optional(),
      publishedOnly: z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      return await getPosts({
        type: input?.type,
        category: input?.category,
        publishedOnly: input?.publishedOnly ?? true,
      });
    }),

  search: publicProcedure
    .input(z.object({
      query: z.string(),
      type: z.enum(["blog", "success-case"]).optional(),
      category: z.string().optional(),
    }))
    .query(async ({ input }) => {
      return await searchPosts(input.query, {
        type: input.type,
        category: input.category,
      });
    }),
});

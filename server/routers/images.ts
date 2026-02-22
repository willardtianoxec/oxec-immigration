import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  getAllImages,
  getImageById,
  createImageRecord,
  deleteImageById,
  updateImageMetadata,
  getImageFilePath,
  getImageRelativePath,
  optimizeAndSaveImage,
} from "../imageManagement.ts";
import fs from "fs/promises";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const imagesRouter = router({
  list: publicProcedure.query(async () => {
    try {
      const images = await getAllImages();
      return images.map((img) => ({
        ...img,
        publicUrl: getImageRelativePath(img.filename),
      }));
    } catch (error) {
      console.error('[Images Router] Error listing images:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to list images',
      });
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        const image = await getImageById(input.id);
        if (!image) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Image not found',
          });
        }
        return {
          ...image,
          publicUrl: getImageRelativePath(image.filename),
        };
      } catch (error) {
        console.error('[Images Router] Error fetching image:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch image',
        });
      }
    }),

  upload: adminProcedure
    .input(
      z.object({
        filename: z.string(),
        base64Data: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        if (!input.filename.match(/^[a-zA-Z0-9._-]+$/)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid filename',
          });
        }

        const buffer = Buffer.from(input.base64Data, 'base64');
        
        // Optimize and save image (creates both optimized original and WebP)
        const { filename, fileSize } = await optimizeAndSaveImage(buffer, input.filename);

        const mimeType = filename.endsWith('.png')
          ? 'image/png'
          : filename.endsWith('.jpg') || filename.endsWith('.jpeg')
          ? 'image/jpeg'
          : filename.endsWith('.gif')
          ? 'image/gif'
          : filename.endsWith('.webp')
          ? 'image/webp'
          : 'image/unknown';

        const relativePath = getImageRelativePath(filename);
        await createImageRecord(
          filename,
          relativePath,
          fileSize,
          mimeType,
          ctx.user.id,
          input.description,
          input.category
        );

        return {
          success: true,
          filename: filename,
          publicUrl: relativePath,
        };
      } catch (error) {
        console.error('[Images Router] Error uploading image:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to upload image',
        });
      }
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await deleteImageById(input.id);
        return { success: true };
      } catch (error) {
        console.error('[Images Router] Error deleting image:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete image',
        });
      }
    }),

  updateMetadata: adminProcedure
    .input(
      z.object({
        id: z.number(),
        description: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const updated = await updateImageMetadata(
          input.id,
          input.description,
          input.category
        );
        if (!updated) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Image not found',
          });
        }
        return {
          ...updated,
          publicUrl: getImageRelativePath(updated.filename),
        };
      } catch (error) {
        console.error('[Images Router] Error updating image metadata:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update image metadata',
        });
      }
    }),
});

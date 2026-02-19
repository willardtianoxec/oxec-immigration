import { getDb } from "./db";
import { imageLibrary, InsertImageLibrary } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "client", "public", "images");

/**
 * Get all images from the library
 */
export async function getAllImages() {
  try {
    const files = await fs.readdir(IMAGES_DIR);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );

    const images = [];
    for (const filename of imageFiles) {
      const filePath = getImageFilePath(filename);
      const stats = await fs.stat(filePath);
      const relativePath = getImageRelativePath(filename);
      const mimeType = filename.endsWith('.png')
        ? 'image/png'
        : filename.endsWith('.jpg') || filename.endsWith('.jpeg')
        ? 'image/jpeg'
        : filename.endsWith('.gif')
        ? 'image/gif'
        : filename.endsWith('.webp')
        ? 'image/webp'
        : filename.endsWith('.svg')
        ? 'image/svg+xml'
        : 'image/unknown';

      images.push({
        id: Math.random(),
        filename,
        relativePath,
        fileSize: stats.size,
        mimeType,
        description: null,
        category: null,
        uploadedBy: 0,
        createdAt: stats.mtime,
        updatedAt: stats.mtime,
      });
    }

    return images.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("[Image Management] Error fetching images:", error);
    throw error;
  }
}

/**
 * Get image by ID
 */
export async function getImageById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const image = await db
      .select()
      .from(imageLibrary)
      .where(eq(imageLibrary.id, id))
      .limit(1);
    return image[0] || null;
  } catch (error) {
    console.error("[Image Management] Error fetching image:", error);
    throw error;
  }
}

/**
 * Create image record in database
 */
export async function createImageRecord(
  filename: string,
  relativePath: string,
  fileSize: number,
  mimeType: string,
  uploadedBy: number,
  description?: string,
  category?: string
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const newImage: InsertImageLibrary = {
      filename,
      relativePath,
      fileSize,
      mimeType,
      description,
      category,
      uploadedBy,
    };

    const result = await db.insert(imageLibrary).values(newImage);
    return result;
  } catch (error) {
    console.error("[Image Management] Error creating image record:", error);
    throw error;
  }
}

/**
 * Delete image record and file
 */
export async function deleteImage(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const image = await getImageById(id);
    if (!image) {
      throw new Error("Image not found");
    }

    // Delete file from filesystem
    const filePath = path.join(IMAGES_DIR, image.filename);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn("[Image Management] File not found or already deleted:", filePath);
    }

    // Delete record from database
    await db.delete(imageLibrary).where(eq(imageLibrary.id, id));
    return true;
  } catch (error) {
    console.error("[Image Management] Error deleting image:", error);
    throw error;
  }
}

/**
 * Update image description or category
 */
export async function updateImageMetadata(
  id: number,
  description?: string,
  category?: string
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const updateData: Record<string, any> = {};
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;

    if (Object.keys(updateData).length === 0) {
      return null;
    }

    await db.update(imageLibrary).set(updateData).where(eq(imageLibrary.id, id));
    return await getImageById(id);
  } catch (error) {
    console.error("[Image Management] Error updating image metadata:", error);
    throw error;
  }
}

/**
 * Ensure images directory exists
 */
export async function ensureImagesDirExists() {
  try {
    await fs.mkdir(IMAGES_DIR, { recursive: true });
  } catch (error) {
    console.error("[Image Management] Error creating images directory:", error);
    throw error;
  }
}

/**
 * Get image file path
 */
export function getImageFilePath(filename: string): string {
  return path.join(IMAGES_DIR, filename);
}

/**
 * Get relative path for image (for use in HTML/CSS)
 */
export function getImageRelativePath(filename: string): string {
  return `/images/${filename}`;
}

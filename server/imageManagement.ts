import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import { getDb } from './db';
import { imageLibrary } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const IMAGES_DIR = path.join(process.cwd(), 'client', 'public', 'images');
const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB target

/**
 * Get all images from database
 */
export async function getAllImages() {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    const images = await db.select().from(imageLibrary);
    return images;
  } catch (error) {
    console.error("[Image Management] Error fetching images:", error);
    throw error;
  }
}

/**
 * Get image by ID
 */
export async function getImageById(id: number) {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    const image = await db.select().from(imageLibrary).where(eq(imageLibrary.id, id));
    return image[0];
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
  category?: string,
  uploadMethod: 'manual' | 'migrated' = 'manual'
) {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    const result = await db.insert(imageLibrary).values({
      filename,
      relativePath,
      fileSize,
      mimeType,
      description: description || '',
      category,
      uploadMethod,
      uploadedBy,
    });
    return result;
  } catch (error) {
    console.error("[Image Management] Error creating image record:", error);
    throw error;
  }
}

/**
 * Delete image by ID
 */
export async function deleteImageById(id: number) {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    await db.delete(imageLibrary).where(eq(imageLibrary.id, id));
  } catch (error) {
    console.error("[Image Management] Error deleting image:", error);
    throw error;
  }
}

/**
 * Update image metadata
 */
export async function updateImageMetadata(
  id: number,
  description?: string,
  category?: string
) {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    const updates: { description?: string; category?: string } = {};
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    
    await db.update(imageLibrary).set(updates).where(eq(imageLibrary.id, id));
    
    // Return updated record
    const updated = await db.select().from(imageLibrary).where(eq(imageLibrary.id, id));
    return updated[0];
  } catch (error) {
    console.error("[Image Management] Error updating image metadata:", error);
    throw error;
  }
}

/**
 * Ensure images directory exists
 */
async function ensureImagesDirExists() {
  try {
    await fs.mkdir(IMAGES_DIR, { recursive: true });
  } catch (error) {
    console.error("[Image Management] Error creating images directory:", error);
    throw error;
  }
}

/**
 * Get file path for image
 */
export function getImageFilePath(filename: string): string {
  return path.join(IMAGES_DIR, filename);
}

/**
 * Optimize image and save as WebP with adaptive quality
 */
export async function optimizeAndSaveImage(
  imageBuffer: Buffer,
  originalFilename: string
): Promise<{ filename: string; webpFilename: string; fileSize: number; webpSize: number }> {
  try {
    // Ensure directory exists
    await ensureImagesDirExists();

    // Get file extension
    const ext = path.extname(originalFilename).toLowerCase();
    const nameWithoutExt = path.basename(originalFilename, ext);

    // Add timestamp to ensure uniqueness
    const timestamp = Date.now();
    const uniqueName = `${nameWithoutExt}-${timestamp}`;

    // Resize image first
    const resizedImage = sharp(imageBuffer)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true,
      });

    // Save optimized original (as WebP with adaptive quality)
    let webpBuffer = await resizedImage
      .webp({ quality: 75 })
      .toBuffer();

    // If file is still too large, reduce quality further
    let quality = 75;
    while (webpBuffer.length > MAX_IMAGE_SIZE && quality > 40) {
      quality -= 5;
      webpBuffer = await sharp(imageBuffer)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality })
        .toBuffer();
    }

    // Save WebP version
    const webpFilename = `${uniqueName}-opt.webp`;
    const webpPath = getImageFilePath(webpFilename);
    await fs.writeFile(webpPath, webpBuffer);

    return {
      filename: webpFilename,
      webpFilename,
      fileSize: webpBuffer.length,
      webpSize: webpBuffer.length,
    };
  } catch (error) {
    console.error('[Image Management] Error optimizing image:', error);
    throw error;
  }
}

/**
 * Get relative path for image
 */
export function getImageRelativePath(filename: string): string {
  return `/images/${filename}`;
}

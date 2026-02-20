import { describe, it, expect } from 'vitest';
import sharp from 'sharp';
import { getImageRelativePath } from './imageManagement';

describe('Image Management', () => {
  describe('getImageRelativePath', () => {
    it('should return correct relative path for image', () => {
      const relativePath = getImageRelativePath('test-image.jpg');
      expect(relativePath).toBe('/images/test-image.jpg');
    });

    it('should handle filenames with multiple dots', () => {
      const relativePath = getImageRelativePath('my.test.image.jpg');
      expect(relativePath).toBe('/images/my.test.image.jpg');
    });

    it('should handle PNG files', () => {
      const relativePath = getImageRelativePath('test-image.png');
      expect(relativePath).toBe('/images/test-image.png');
    });

    it('should handle WebP files', () => {
      const relativePath = getImageRelativePath('test-image.webp');
      expect(relativePath).toBe('/images/test-image.webp');
    });

    it('should handle optimized filenames', () => {
      const relativePath = getImageRelativePath('test-image-opt.jpg');
      expect(relativePath).toBe('/images/test-image-opt.jpg');
    });
  });

  describe('Image optimization capability', () => {
    it('should be able to create optimized images with sharp', async () => {
      // Create a simple test image
      const testImageBuffer = await sharp({
        create: {
          width: 1920,
          height: 1080,
          channels: 3,
          background: { r: 255, g: 0, b: 0 }
        }
      })
        .jpeg({ quality: 95 })
        .toBuffer();

      expect(testImageBuffer.length).toBeGreaterThan(0);

      // Test that we can convert to WebP
      const webpBuffer = await sharp(testImageBuffer)
        .webp({ quality: 80 })
        .toBuffer();

      expect(webpBuffer.length).toBeGreaterThan(0);
      // WebP should typically be smaller than JPEG
      expect(webpBuffer.length).toBeLessThanOrEqual(testImageBuffer.length);
    });

    it('should be able to resize images', async () => {
      // Create a larger test image
      const largeImageBuffer = await sharp({
        create: {
          width: 3840,
          height: 2160,
          channels: 3,
          background: { r: 100, g: 150, b: 200 }
        }
      })
        .jpeg()
        .toBuffer();

      // Resize to max 1920x1080
      const resizedBuffer = await sharp(largeImageBuffer)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toBuffer();

      expect(resizedBuffer.length).toBeGreaterThan(0);
      // Resized should be smaller
      expect(resizedBuffer.length).toBeLessThan(largeImageBuffer.length);
    });

    it('should handle PNG to WebP conversion', async () => {
      // Create a test PNG image
      const pngBuffer = await sharp({
        create: {
          width: 1920,
          height: 1080,
          channels: 3,
          background: { r: 0, g: 255, b: 0 }
        }
      })
        .png()
        .toBuffer();

      // Convert to WebP
      const webpBuffer = await sharp(pngBuffer)
        .webp({ quality: 80 })
        .toBuffer();

      expect(webpBuffer.length).toBeGreaterThan(0);
    });
  });

  describe('Image optimization workflow', () => {
    it('should support full optimization workflow', async () => {
      // Create a test image
      const originalBuffer = await sharp({
        create: {
          width: 3840,
          height: 2160,
          channels: 3,
          background: { r: 200, g: 100, b: 50 }
        }
      })
        .jpeg({ quality: 95 })
        .toBuffer();

      // Step 1: Resize
      const resizedBuffer = await sharp(originalBuffer)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toBuffer();

      expect(resizedBuffer.length).toBeLessThan(originalBuffer.length);

      // Step 2: Convert to WebP
      const webpBuffer = await sharp(resizedBuffer)
        .webp({ quality: 80 })
        .toBuffer();

      expect(webpBuffer.length).toBeGreaterThan(0);
      expect(webpBuffer.length).toBeLessThanOrEqual(resizedBuffer.length);

      // Verify we have both formats
      expect(resizedBuffer.length).toBeGreaterThan(0);
      expect(webpBuffer.length).toBeGreaterThan(0);
    });
  });
});

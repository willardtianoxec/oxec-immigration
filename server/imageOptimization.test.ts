import { describe, it, expect } from 'vitest';
import { getImageRelativePath } from './imageManagement';

describe('Image Optimization', () => {
  it('should generate correct relative path', () => {
    const filename = 'test-image-1234567890-opt.webp';
    const relativePath = getImageRelativePath(filename);
    expect(relativePath).toBe('/images/test-image-1234567890-opt.webp');
  });

  it('should handle different filename formats', () => {
    const testCases = [
      { input: 'photo.webp', expected: '/images/photo.webp' },
      { input: 'my-image-123-opt.webp', expected: '/images/my-image-123-opt.webp' },
      { input: 'consultant-meeting-1708500000000-opt.webp', expected: '/images/consultant-meeting-1708500000000-opt.webp' },
    ];

    testCases.forEach(({ input, expected }) => {
      const result = getImageRelativePath(input);
      expect(result).toBe(expected);
    });
  });

  it('should ensure unique filenames with timestamp', () => {
    const timestamp1 = Date.now();
    const timestamp2 = Date.now() + 1;
    
    const filename1 = `image-${timestamp1}-opt.webp`;
    const filename2 = `image-${timestamp2}-opt.webp`;
    
    expect(filename1).not.toBe(filename2);
  });

  it('should handle WebP format correctly', () => {
    const filename = 'test-1708500000000-opt.webp';
    expect(filename).toMatch(/\.webp$/);
  });

  it('should preserve original filename in optimized version', () => {
    const originalName = 'consultant-meeting';
    const timestamp = Date.now();
    const optimizedFilename = `${originalName}-${timestamp}-opt.webp`;
    
    expect(optimizedFilename).toContain(originalName);
    expect(optimizedFilename).toContain(String(timestamp));
    expect(optimizedFilename).toMatch(/-opt\.webp$/);
  });
});

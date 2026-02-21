import { describe, it, expect } from 'vitest';
import { getPosts } from './db';

describe('Article Sorting by Published Date', () => {
  it('should return posts sorted by publishedAt in descending order', async () => {
    // Get published posts
    const posts = await getPosts({ publishedOnly: true, limit: 10 });
    
    // Verify sorting
    for (let i = 0; i < posts.length - 1; i++) {
      const current = posts[i];
      const next = posts[i + 1];
      
      const currentTime = current.publishedAt || current.createdAt;
      const nextTime = next.publishedAt || next.createdAt;
      
      // Current should be >= next (descending order)
      expect(currentTime.getTime()).toBeGreaterThanOrEqual(nextTime.getTime());
    }
  });

  it('should fallback to createdAt when publishedAt is null', async () => {
    // Get all posts (including unpublished)
    const posts = await getPosts({ type: 'blog', limit: 10 });
    
    // Verify sorting with fallback
    for (let i = 0; i < posts.length - 1; i++) {
      const current = posts[i];
      const next = posts[i + 1];
      
      const currentTime = current.publishedAt || current.createdAt;
      const nextTime = next.publishedAt || next.createdAt;
      
      // Current should be >= next (descending order)
      expect(currentTime.getTime()).toBeGreaterThanOrEqual(nextTime.getTime());
    }
  });

  it('should sort success cases by publishedAt in descending order', async () => {
    // Get published success cases
    const posts = await getPosts({ 
      publishedOnly: true, 
      type: 'success-case',
      limit: 10 
    });
    
    // Verify sorting
    for (let i = 0; i < posts.length - 1; i++) {
      const current = posts[i];
      const next = posts[i + 1];
      
      const currentTime = current.publishedAt || current.createdAt;
      const nextTime = next.publishedAt || next.createdAt;
      
      // Current should be >= next (descending order)
      expect(currentTime.getTime()).toBeGreaterThanOrEqual(nextTime.getTime());
    }
  });
});

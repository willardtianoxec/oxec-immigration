import { describe, it, expect } from 'vitest';
import { generateSlug, generateRandomSlug, isValidSlug } from './slugGenerator';

describe('slugGenerator', () => {
  describe('generateSlug', () => {
    it('应该从中文标题生成拼音slug', () => {
      const slug = generateSlug('拒签重审成功案例');
      expect(slug).toBeTruthy();
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });

    it('应该处理英文标题', () => {
      const slug = generateSlug('How to Apply for PR Card');
      expect(slug).toBeTruthy();
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });

    it('应该处理混合标题', () => {
      const slug = generateSlug('技术移民 Technical Immigration');
      expect(slug).toBeTruthy();
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });

    it('应该处理空标题', () => {
      const slug = generateSlug('');
      expect(slug).toBeTruthy();
      expect(slug).toMatch(/^post-[a-z0-9]{8}$/);
    });

    it('应该生成随机slug当useTranslation为false', () => {
      const slug = generateSlug('任何标题', false);
      expect(slug).toMatch(/^post-[a-z0-9]{8}$/);
    });

    it('应该移除特殊字符', () => {
      const slug = generateSlug('标题@#$%^&*()');
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });

    it('应该合并多个连字符', () => {
      const slug = generateSlug('标题---多个---连字符');
      expect(slug).not.toContain('--');
    });

    it('应该移除首尾连字符', () => {
      const slug = generateSlug('-标题-');
      expect(slug).not.toMatch(/^-|-$/);
    });
  });

  describe('generateRandomSlug', () => {
    it('应该生成随机slug', () => {
      const slug = generateRandomSlug();
      expect(slug).toMatch(/^post-[a-z0-9]{8}$/);
    });

    it('应该生成不同的slug', () => {
      const slug1 = generateRandomSlug();
      const slug2 = generateRandomSlug();
      expect(slug1).not.toBe(slug2);
    });
  });

  describe('isValidSlug', () => {
    it('应该验证有效的slug', () => {
      expect(isValidSlug('valid-slug')).toBe(true);
      expect(isValidSlug('post-123')).toBe(true);
      expect(isValidSlug('a-b-c')).toBe(true);
    });

    it('应该拒绝太短的slug', () => {
      expect(isValidSlug('ab')).toBe(false);
      expect(isValidSlug('a')).toBe(false);
    });

    it('应该拒绝包含特殊字符的slug', () => {
      expect(isValidSlug('invalid_slug')).toBe(false);
      expect(isValidSlug('invalid.slug')).toBe(false);
      expect(isValidSlug('invalid@slug')).toBe(false);
    });

    it('应该拒绝包含大写字母的slug', () => {
      expect(isValidSlug('Invalid-Slug')).toBe(false);
      expect(isValidSlug('INVALID-SLUG')).toBe(false);
    });

    it('应该拒绝包含空格的slug', () => {
      expect(isValidSlug('invalid slug')).toBe(false);
    });
  });
});

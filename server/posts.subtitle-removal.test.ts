import { describe, it, expect, beforeAll } from "vitest";
import { createPost, updatePost, getPostById } from "./db";

describe("Posts Subtitle Removal", () => {
  let testPostId: number;

  beforeAll(async () => {
    // Create a test post
    const result = await createPost({
      title: "Test Post Subtitle Removal",
      slug: `test-post-${Date.now()}`,
      content: "Test content for subtitle removal",
      type: "blog",
      blogCategory: "news",
      authorId: 1,
      published: false,
    });
    testPostId = result.id;
  });

  it("should create post without subtitle field in API", async () => {
    const post = await getPostById(testPostId);
    expect(post).toBeDefined();
    expect(post?.title).toBe("Test Post Subtitle Removal");
  });

  it("should update post without subtitle field", async () => {
    const updatedPost = await updatePost(testPostId, {
      title: "Updated Title",
      content: "Updated content",
    });
    expect(updatedPost.title).toBe("Updated Title");
    expect(updatedPost.content).toBe("Updated content");
  });

  it("should retrieve post successfully", async () => {
    const post = await getPostById(testPostId);
    expect(post).toBeDefined();
    expect(post?.id).toBe(testPostId);
  });

  it("should handle post operations without subtitle errors", async () => {
    const post = await getPostById(testPostId);
    expect(post).toBeDefined();
    expect(post?.slug).toContain("test-post-");
  });
});

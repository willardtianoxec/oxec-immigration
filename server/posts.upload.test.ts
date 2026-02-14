import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("Posts Upload and Save", () => {
  it("should upload image and return S3 URL", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create a simple test image (1x1 pixel PNG)
    const pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const dataUrl = `data:image/png;base64,${pngBase64}`;

    const result = await caller.posts.upload({
      file: dataUrl,
      filename: "test-image.png",
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.url).toBeDefined();
    expect(typeof result.url).toBe("string");
    // URL should be short (typically 100-300 chars), not 3.4MB
    expect(result.url.length).toBeLessThan(500);
    expect(result.key).toBeDefined();
  });

  it("should create blog post with S3 image URL", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create a test image
    const pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const dataUrl = `data:image/png;base64,${pngBase64}`;

    // First upload the image
    const uploadResult = await caller.posts.upload({
      file: dataUrl,
      filename: "test-cover.png",
    });

    // Then create a post with the S3 URL
    const timestamp = Date.now();
    const createResult = await caller.posts.create({
      title: "Test Blog Post Upload",
      slug: `test-blog-post-upload-${timestamp}`,
      content: "This is test content for upload verification",
      type: "blog",
      blogCategory: "news",
      coverImage: uploadResult.url, // Use S3 URL, not Data URL
    });

    expect(createResult).toBeDefined();
    expect(createResult.id).toBeDefined();
    expect(createResult.title).toBe("Test Blog Post Upload");
    expect(createResult.coverImage).toBe(uploadResult.url);
  });

  it("should reject coverImage field with large Data URL", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // This test verifies that we're not sending large Data URLs to the backend
    // The coverImage field should only contain URLs (< 2048 chars)
    const largeDataUrl = "data:image/png;base64," + "A".repeat(3000000); // 3MB of data
    
    try {
      await caller.posts.create({
        title: "Test Post",
        slug: "test-post-large-image",
        content: "Content",
        type: "blog",
        blogCategory: "news",
        coverImage: largeDataUrl,
      });
      // If we get here, the test should fail because we shouldn't accept large Data URLs
      expect(true).toBe(false); // Force failure
    } catch (error: any) {
      // Expected to fail with validation error
      expect(error.message).toContain("Data Too Long");
    }
  });

  it("should update blog post with new S3 image URL", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create initial post with unique slug
    const timestamp = Date.now();
    const pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const dataUrl = `data:image/png;base64,${pngBase64}`;

    const uploadResult = await caller.posts.upload({
      file: dataUrl,
      filename: "test-cover.png",
    });

    const createResult = await caller.posts.create({
      title: "Test Blog Post for Update",
      slug: `test-blog-post-update-${timestamp}`,
      content: "Original content",
      type: "blog",
      blogCategory: "news",
      coverImage: uploadResult.url,
    });

    // Upload new image
    const newUploadResult = await caller.posts.upload({
      file: dataUrl,
      filename: "new-cover.png",
    });

    // Update post with new image URL
    const updateResult = await caller.posts.update({
      id: createResult.id,
      title: "Updated Blog Post",
      coverImage: newUploadResult.url, // New S3 URL
    });

    expect(updateResult).toBeDefined();
    expect(updateResult.coverImage).toBe(newUploadResult.url);
  });
});

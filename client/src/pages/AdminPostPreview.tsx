import { useParams, useLocation } from "wouter";
import { useEffect, useState } from "react";
import PostPreview from "@/components/PostPreview";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AdminPostPreview() {
  const params = useParams<{ id?: string }>();
  const [, setLocation] = useLocation();
  const postId = params?.id ? parseInt(params.id) : null;
  const { data: authData } = trpc.auth.me.useQuery();
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    type: "blog" as "blog" | "success-case",
    category: "",
    contentCategory: "" as string,
    tags: "",
    coverImage: "",
    published: false,
  });

  // 获取文章数据
  const { data: post, isLoading: postLoading } = trpc.posts.getById.useQuery(
    { id: postId || 0 },
    { enabled: !!postId }
  );

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || "",
        type: post.type as "blog" | "success-case",
        category: post.category || "",
        contentCategory: post.contentCategory || "",
        tags: post.tags || "",
        coverImage: post.coverImage || "",
        published: post.published,
      });
    }
  }, [post]);

  const user = authData;

  // 权限检查
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">访问被拒绝</h1>
          <p className="text-muted-foreground mb-6">
            您没有权限访问此页面。只有管理员可以预览文章。
          </p>
          <button
            onClick={() => setLocation("/")}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            返回首页
          </button>
        </Card>
      </div>
    );
  }

  if (!postId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
          <p className="text-muted-foreground mb-6">
            无法找到指定的文章。
          </p>
          <button
            onClick={() => setLocation("/admin/posts")}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            返回文章管理
          </button>
        </Card>
      </div>
    );
  }

  if (postLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">加载文章中...</p>
        </div>
      </div>
    );
  }

  return (
    <PostPreview
      post={formData}
      onEdit={() => setLocation(`/admin/posts/${postId}`)}
      onBack={() => setLocation(`/admin/posts/${postId}`)}
    />
  );
}

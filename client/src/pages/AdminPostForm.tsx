import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Loader2, ArrowLeft } from "lucide-react";
import { useParams } from "wouter";

export default function AdminPostForm() {
  const [location, setLocation] = useLocation();
  const params = useParams<{ id?: string }>();
  const postId = params?.id ? parseInt(params.id) : null;
  const isEditing = !!postId;

  const { data: authData } = trpc.auth.me.useQuery();
  const user = authData;

  // 表单状态
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    content: "",
    excerpt: "",
    type: "blog" as "blog" | "success-case",
    category: "",
    tags: "",
    coverImage: "",
    published: false,
  });

  // 获取现有文章（编辑模式）
  const { data: post, isLoading: isLoadingPost } = trpc.posts.getById.useQuery(
    { id: postId! },
    { enabled: isEditing }
  );

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        subtitle: post.subtitle || "",
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || "",
        type: post.type as "blog" | "success-case",
        category: post.category || "",
        tags: post.tags || "",
        coverImage: post.coverImage || "",
        published: post.published,
      });
    }
  }, [post]);

  // 权限检查
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">访问被拒绝</h1>
          <p className="text-muted-foreground mb-6">只有管理员可以访问此页面</p>
          <Button onClick={() => setLocation("/")}>返回主页</Button>
        </div>
      </div>
    );
  }

  // 创建或更新变异
  const createMutation = trpc.posts.create.useMutation({
    onSuccess: () => {
      setLocation("/admin/posts");
    },
  });

  const updateMutation = trpc.posts.update.useMutation({
    onSuccess: () => {
      setLocation("/admin/posts");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && postId) {
      updateMutation.mutate({
        id: postId,
        ...formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoadingPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setLocation("/admin/posts")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditing ? "编辑文章" : "新建文章"}
          </h1>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 标题 */}
            <div>
              <label className="block text-sm font-medium mb-2">标题 *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="输入文章标题"
              />
            </div>

            {/* 副标题 */}
            <div>
              <label className="block text-sm font-medium mb-2">副标题</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="输入副标题（可选）"
              />
            </div>

            {/* 文章类型和分类 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">类型 *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "blog" | "success-case",
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="blog">博客文章</option>
                  <option value="success-case">成功案例</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">分类</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="如：技术移民、家庭团聚"
                />
              </div>
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-sm font-medium mb-2">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="url-friendly-slug"
              />
            </div>

            {/* 标签 */}
            <div>
              <label className="block text-sm font-medium mb-2">标签</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="多个标签用逗号分隔"
              />
            </div>

            {/* 封面图URL */}
            <div>
              <label className="block text-sm font-medium mb-2">封面图URL</label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* 摘要 */}
            <div>
              <label className="block text-sm font-medium mb-2">摘要</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="文章摘要（可选）"
              />
            </div>

            {/* 正文内容 */}
            <div>
              <label className="block text-sm font-medium mb-2">正文 *</label>
              <textarea
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={12}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder="输入文章正文（支持HTML或Markdown）"
              />
            </div>

            {/* 发布状态 */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-4 h-4"
              />
              <label htmlFor="published" className="text-sm font-medium">
                立即发布
              </label>
            </div>

            {/* 提交按钮 */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isEditing ? "保存更改" : "创建文章"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation("/admin/posts")}
                disabled={isSubmitting}
              >
                取消
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

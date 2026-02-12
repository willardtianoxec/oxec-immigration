'use client';

import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, X, RotateCcw } from "lucide-react";
import { generateSlug, isValidSlug } from "@/lib/slugGenerator";

const CONTENT_CATEGORY_OPTIONS = [
  { value: "investment-immigration", label: "投资移民" },
  { value: "family-reunion", label: "家庭团聚" },
  { value: "maple-leaf-renewal", label: "枫叶卡续签" },
  { value: "reconsideration", label: "拒签重审" },
  { value: "temporary-resident", label: "临时居民申请" },
  { value: "skilled-worker", label: "技术移民" },
  { value: "citizenship", label: "公民入籍" },
  { value: "other", label: "其他" },
];

const SUGGESTED_TAGS = [
  "技术移民",
  "快速通道",
  "加拿大移民",
  "工作签证",
  "永久居民",
  "移民政策",
  "申请指南",
  "成功经验",
];

export function AdminPostForm() {
  const params = useParams<{ id?: string }>();
  const postId = params?.id ? parseInt(params.id) : undefined;
  const isEditing = !!postId;
  const [, setLocation] = useLocation();

  const { data: authData } = trpc.auth.me.useQuery();
  const { data: post } = trpc.posts.getById.useQuery(
    { id: postId! },
    { enabled: isEditing && !!postId }
  );

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

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    content: "",
    excerpt: "",
    type: "blog" as "blog" | "success-case",
    contentCategory: "" as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | "",
    tags: "",
    coverImage: "",
    published: false,
  });

  const [slugError, setSlugError] = useState("");

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        subtitle: post.subtitle || "",
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || "",
        type: post.type as "blog" | "success-case",
        contentCategory: (post.contentCategory || "") as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | "",
        tags: post.tags || "",
        coverImage: post.coverImage || "",
        published: post.published,
      });
    }
  }, [post]);

  const user = authData;

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

  const handleTitleChange = (newTitle: string) => {
    setFormData({ ...formData, title: newTitle });
    if (!isEditing) {
      const newSlug = generateSlug(newTitle);
      setFormData((prev) => ({ ...prev, slug: newSlug }));
      setSlugError("");
    }
  };

  const handleRegenerateSlug = () => {
    const newSlug = generateSlug(formData.title);
    setFormData({ ...formData, slug: newSlug });
    setSlugError("");
  };

  const handleSlugChange = (newSlug: string) => {
    setFormData({ ...formData, slug: newSlug });
    if (!isValidSlug(newSlug)) {
      setSlugError("URL Slug只能包含小写字母、数字和连字符");
    } else {
      setSlugError("");
    }
  };

  const handleSaveDraft = () => {
    if (!formData.contentCategory) {
      alert("请选择内容分类");
      return;
    }

    if (isEditing && postId) {
      updateMutation.mutate({
        id: postId,
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt || undefined,
        contentCategory: formData.contentCategory as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | undefined,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
        publishedAt: undefined,
      });
    } else {
      createMutation.mutate({
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt || undefined,
        type: formData.type,
        contentCategory: formData.contentCategory as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | undefined,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
      });
    }
  };

  const handlePublish = () => {
    if (!formData.contentCategory) {
      alert("请选择内容分类");
      return;
    }

    if (isEditing && postId) {
      updateMutation.mutate({
        id: postId,
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt || undefined,
        contentCategory: formData.contentCategory as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | undefined,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
        published: true,
        publishedAt: new Date(),
      });
    } else {
      createMutation.mutate({
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt || undefined,
        type: formData.type,
        contentCategory: formData.contentCategory as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | undefined,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
        published: true,
        publishedAt: new Date(),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.published) {
      handlePublish();
    } else {
      handleSaveDraft();
    }
  };

  const handleAddTag = (tag: string) => {
    const currentTags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    if (!currentTags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...currentTags, tag].join(", "),
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== tagToRemove);
    setFormData({
      ...formData,
      tags: currentTags.join(", "),
    });
  };

  const currentTags = formData.tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{isEditing ? "编辑文章" : "新建文章"}</h1>
          <Button variant="outline" onClick={() => setLocation("/admin/posts")}>
            返回
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              标题 <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="输入文章标题"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
          </div>

          {/* 副标题 */}
          <div>
            <label className="block text-sm font-medium mb-2">副标题</label>
            <Input
              type="text"
              placeholder="输入副标题（可选）"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          {/* 文章类型和内容分类 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                文章类型 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as "blog" | "success-case",
                  })
                }
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="blog">博客文章</option>
                <option value="success-case">成功案例</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                内容分类 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.contentCategory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contentCategory: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">选择内容分类</option>
                {CONTENT_CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* URL Slug */}
          <div>
            <label className="block text-sm font-medium mb-2">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="url-friendly-slug"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRegenerateSlug}
                title="根据标题重新生成URL Slug"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            {slugError && <p className="text-red-500 text-sm mt-1">{slugError}</p>}
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-sm font-medium mb-2">标签</label>
            <Input
              type="text"
              placeholder="多个标签用逗号分隔"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTED_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleAddTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {currentTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {currentTags.map((tag) => (
                  <Badge key={tag} variant="default" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* 封面图 */}
          <div>
            <label className="block text-sm font-medium mb-2">封面图</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                拖拽图片到此处或点击选择 支持 JPG、PNG 等格式，将自动裁剪为 16:9 比例
              </p>
            </div>
          </div>

          {/* 摘要 */}
          <div>
            <label className="block text-sm font-medium mb-2">摘要</label>
            <Textarea
              placeholder="文章摘要（可选）"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
            />
          </div>

          {/* 内容编辑器 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              内容 <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="输入文章内容（支持Markdown）"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              required
              className="font-mono text-sm"
            />
          </div>

          {/* 发布选项 */}
          <div className="flex items-center gap-2">
            <input
              id="published"
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="published" className="text-sm font-medium cursor-pointer">
              立即发布
            </label>
          </div>

          {/* 按钮 */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/admin/posts")}
            >
              取消
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              保存草稿
            </Button>
            <Button
              type="button"
              onClick={handlePublish}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              发布文章
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

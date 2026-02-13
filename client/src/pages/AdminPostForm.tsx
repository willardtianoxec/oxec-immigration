"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, X, RotateCcw, Upload, Bold, Italic, List, Link as LinkIcon, Image as ImageIcon, AlignLeft } from "lucide-react";
import { generateSlug, isValidSlug } from "@/lib/slugGenerator";

const BLOG_CATEGORY_OPTIONS = [
  { value: "policy-interpretation", label: "政策解读" },
  { value: "news", label: "新闻" },
  { value: "immigration-life", label: "移居生活" },
  { value: "immigration-story", label: "移民故事" },
  { value: "immigration-project", label: "项目介绍" },
];

const SUCCESS_CASE_CATEGORY_OPTIONS = [
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    blogCategory: "" as string,
    contentCategory: "" as string,
    tags: "",
    coverImage: "",
    published: false,
    publishedAt: new Date().toISOString().split('T')[0],
  });

  const [slugError, setSlugError] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        subtitle: post.subtitle || "",
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || "",
    
        type: post.type as "blog" | "success-case",
        blogCategory: post.blogCategory || "",
        contentCategory: post.contentCategory || "",
        tags: post.tags || "",
        coverImage: post.coverImage || "",
        published: post.published,
        publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      });
      if (post.coverImage) {
        setCoverImagePreview(post.coverImage);
      }
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

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("请选择图片文件");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCoverImagePreview(result);
      setFormData({ ...formData, coverImage: result });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  // Get content categories based on type
  const getContentCategories = () => {
    if (formData.type === "blog") {
      return BLOG_CATEGORY_OPTIONS;
    } else {
      return SUCCESS_CASE_CATEGORY_OPTIONS;
    }
  };

  // Editor toolbar functions
  const insertMarkdown = (before: string, after: string = "") => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const newContent = 
      formData.content.substring(0, start) +
      before +
      selectedText +
      after +
      formData.content.substring(end);
    
    setFormData({ ...formData, content: newContent });
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
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

  const handleSaveDraft = () => {
    if (!formData.contentCategory) {
      alert("请选择内容分类");
      return;
    }

    const publishedAt = formData.published ? new Date(formData.publishedAt) : undefined;

    if (isEditing && postId) {
      updateMutation.mutate({
        id: postId,
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt || undefined,

        contentCategory: formData.contentCategory as any,
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
        contentCategory: formData.contentCategory as any,
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

    const publishedAt = new Date(formData.publishedAt);

    if (isEditing && postId) {
      updateMutation.mutate({
        id: postId,
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt || undefined,

        contentCategory: formData.contentCategory as any,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
        published: true,
        publishedAt,
      });
    } else {
      createMutation.mutate({
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt || undefined,

        type: formData.type,
        contentCategory: formData.contentCategory as any,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
        published: true,
        publishedAt,
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-8">
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

          {/* 文章类型 */}
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
                  contentCategory: "", // Reset content category when type changes
                })
              }
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="blog">博客文章</option>
              <option value="success-case">成功案例</option>
            </select>
          </div>

          {/* 内容分类 - 根据文章类型动态显示 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {formData.type === "blog" ? "博客分类" : "成功案例分类"} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.contentCategory}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contentCategory: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">选择分类</option>
              {getContentCategories().map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
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
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">
                拖拽图片到此处或点击选择 支持 JPG、PNG 等格式，将自动裁剪为 16:9 比例
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            {coverImagePreview && (
              <div className="mt-4 relative">
                <img
                  src={coverImagePreview}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setCoverImagePreview("");
                    setFormData({ ...formData, coverImage: "" });
                  }}
                >
                  删除
                </Button>
              </div>
            )}
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

          {/* 发布日期 */}
          <div>
            <label className="block text-sm font-medium mb-2">发布日期</label>
            <Input
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              选择文章显示的发布日期（不同于实际发布时间）
            </p>
          </div>

          {/* 内容编辑器 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              内容 <span className="text-red-500">*</span>
            </label>
            
            {/* 编辑工具栏 */}
            <div className="flex flex-wrap gap-1 mb-2 p-2 bg-muted rounded-t-lg border border-b-0 border-input">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                title="加粗"
                onClick={() => insertMarkdown("**", "**")}
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                title="斜体"
                onClick={() => insertMarkdown("*", "*")}
              >
                <Italic className="w-4 h-4" />
              </Button>
              <div className="w-px bg-border mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                title="无序列表"
                onClick={() => insertMarkdown("- ")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                title="链接"
                onClick={() => insertMarkdown("[链接文本](", ")")}
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                title="图片"
                onClick={() => insertMarkdown("![图片描述](", ")")}
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                title="标题"
                onClick={() => insertMarkdown("## ")}
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* 编辑框 */}
            <Textarea
              ref={textareaRef}
              placeholder="输入文章内容（支持Markdown）"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={25}
              required
              className="font-mono text-sm border-t-0 rounded-t-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              支持 Markdown 格式。使用工具栏快速插入格式化内容。
            </p>
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

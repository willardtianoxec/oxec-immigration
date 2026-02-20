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
import { ImageSelectorModal } from "@/components/ImageSelectorModal";

// 博客分类选项
const BLOG_CATEGORY_OPTIONS = [
  { value: "policy-interpretation", label: "政策解读" },
  { value: "news", label: "新闻" },
  { value: "immigration-life", label: "移居生活" },
  { value: "immigration-story", label: "移民故事" },
  { value: "immigration-project", label: "项目介绍" },
];

// 成功案例分类选项
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
    onError: (error) => {
      console.error("Create post error:", error);
      alert(`创建文章失败: ${error.message}`);
    },
  });

  const updateMutation = trpc.posts.update.useMutation({
    onSuccess: () => {
      setLocation("/admin/posts");
    },
    onError: (error) => {
      console.error("Update post error:", error);
      alert(`更新文章失败: ${error.message}`);
    },
  });

  const uploadMutation = trpc.posts.upload.useMutation({
    onError: (error) => {
      console.error("Upload error:", error);
      alert(`图片上传失败: ${error.message}`);
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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  // 仅在初始加载时设置表单数据
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (post && !isInitialized) {
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
      setIsInitialized(true);
    }
  }, [post, isInitialized]);

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
    setFormData((prev) => ({ ...prev, title: newTitle }));
    if (!isEditing) {
      const newSlug = generateSlug(newTitle);
      setFormData((prev) => ({ ...prev, slug: newSlug }));
      setSlugError("");
    }
  };

  const handleRegenerateSlug = () => {
    const newSlug = generateSlug(formData.title);
    setFormData((prev) => ({ ...prev, slug: newSlug }));
    setSlugError("");
  };

  const handleSlugChange = (newSlug: string) => {
    setFormData((prev) => ({ ...prev, slug: newSlug }));
    if (!isValidSlug(newSlug)) {
      setSlugError("URL Slug只能包含小写字母、数字和连字符");
    } else {
      setSlugError("");
    }
  };

  // Handle image upload - upload to S3 and save URL
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("请选择图片文件");
      return;
    }

    setIsUploadingImage(true);

    try {
      // Create preview using Data URL (for display only)
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setCoverImagePreview(dataUrl);
      };
      reader.readAsDataURL(file);

      // Upload to S3
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const base64String = e.target?.result as string;
        try {
          const result = await uploadMutation.mutateAsync({
            file: base64String,
            filename: file.name,
          });
          // Save S3 URL to formData
          setFormData((prev) => ({ ...prev, coverImage: result.url }));
        } catch (error) {
          alert("图片上传失败，请重试");
          setCoverImagePreview("");
        } finally {
          setIsUploadingImage(false);
        }
      };
      fileReader.readAsDataURL(file);
    } catch (error) {
      alert("图片处理失败，请重试");
      setCoverImagePreview("");
      setIsUploadingImage(false);
    }
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

  // Determine which category field to use based on type
  const getCategoryFieldValue = () => {
    return formData.type === "blog" ? formData.blogCategory : formData.contentCategory;
  };

  const setCategoryFieldValue = (value: string) => {
    if (formData.type === "blog") {
      return setFormData((prev) => ({ ...prev, blogCategory: value }));
    } else {
      return setFormData((prev) => ({ ...prev, contentCategory: value }));
    }
  };

  // Get category label based on type and value
  const getCategoryLabel = (value: string) => {
    const categories = getContentCategories();
    return categories.find(cat => cat.value === value)?.label || value;
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
    
    setFormData((prev) => ({ ...prev, content: newContent }));
    
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
      setFormData((prev) => ({
        ...prev,
        tags: [...currentTags, tag].join(", "),
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== tagToRemove);
    setFormData((prev) => ({
      ...prev,
      tags: currentTags.join(", "),
    }));
  };

  const currentTags = formData.tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleSaveDraft = () => {
    // 基本验证
    if (!formData.title.trim()) {
      alert("请输入文章标题");
      return;
    }
    if (!formData.slug.trim()) {
      alert("请输入URL Slug");
      return;
    }
    if (!formData.content.trim()) {
      alert("请输入文章内容");
      return;
    }
    
    // 对于成功案例，contentCategory必须选择
    if (formData.type === "success-case" && !formData.contentCategory) {
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
        type: formData.type,
        blogCategory: formData.type === "blog" ? (formData.blogCategory as any || undefined) : undefined,
        contentCategory: formData.type === "success-case" ? (formData.contentCategory as any || undefined) : undefined,
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
        blogCategory: formData.type === "blog" ? (formData.blogCategory as any || undefined) : undefined,
        contentCategory: formData.type === "success-case" ? (formData.contentCategory as any || undefined) : undefined,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
      });
    }
  };

  const handlePublish = () => {
    // 基本验证
    if (!formData.title.trim()) {
      alert("请输入文章标题");
      return;
    }
    if (!formData.slug.trim()) {
      alert("请输入URL Slug");
      return;
    }
    if (!formData.content.trim()) {
      alert("请输入文章内容");
      return;
    }
    
    // 验证分类选择
    const categoryValue = formData.type === "blog" ? formData.blogCategory : formData.contentCategory;
    if (!categoryValue) {
      alert("请选择分类");
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

        blogCategory: formData.type === "blog" ? (formData.blogCategory as any || undefined) : undefined,
        contentCategory: formData.type === "success-case" ? (formData.contentCategory as any || undefined) : undefined,
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
        blogCategory: formData.type === "blog" ? (formData.blogCategory as any || undefined) : undefined,
        contentCategory: formData.type === "success-case" ? (formData.contentCategory as any || undefined) : undefined,
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
              onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
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
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value as "blog" | "success-case",
                  blogCategory: "",
                  contentCategory: "", // Reset both categories when type changes
                }))
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
              value={getCategoryFieldValue()}
              onChange={(e) => setCategoryFieldValue(e.target.value)}
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
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
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
              } ${isUploadingImage ? "opacity-50 pointer-events-none" : ""}`}
              onClick={() => !isUploadingImage && fileInputRef.current?.click()}
            >
              {isUploadingImage ? (
                <>
                  <Loader2 className="w-8 h-8 mx-auto mb-2 text-muted-foreground animate-spin" />
                  <p className="text-muted-foreground">上传中...</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    拖拽图片到此处或点击选择 支持 JPG、PNG 等格式，将自动裁剪为 16:9 比例
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isUploadingImage}
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
                    setFormData((prev) => ({ ...prev, coverImage: "" }));
                  }}
                  disabled={isUploadingImage}
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
              placeholder="输入文章摘要（可选）"
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
            />
          </div>

          {/* 发布日期 */}
          <div>
            <label className="block text-sm font-medium mb-2">发布日期</label>
            <Input
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData((prev) => ({ ...prev, publishedAt: e.target.value }))}
            />
          </div>

          {/* 内容编辑器 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              内容 <span className="text-red-500">*</span>
            </label>
            
            {/* 编辑工具栏 */}
            <div className="flex gap-1 mb-2 p-2 border border-input rounded-t-md bg-muted/30 flex-wrap">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown("**", "**")}
                title="加粗"
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown("*", "*")}
                title="斜体"
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown("- ", "")}
                title="无序列表"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown("[", "](url)")}
                title="链接"
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsImageSelectorOpen(true)}
                title="从图库选择图片"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown("# ", "")}
                title="标题"
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
            </div>

            <Textarea
              ref={textareaRef}
              placeholder="输入文章内容（支持Markdown格式）"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              rows={25}
              className="font-mono text-sm"
              required
            />
          </div>

          {/* 发布选项 */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">立即发布</span>
            </label>
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-4 pt-6 border-t">
            <Button
              type="submit"
              disabled={isSubmitting || isUploadingImage}
              className="flex-1"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {formData.published ? "发布文章" : "保存草稿"}
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
      </div>

      {/* Image Selector Modal */}
      <ImageSelectorModal
        open={isImageSelectorOpen}
        onOpenChange={setIsImageSelectorOpen}
        onSelect={(imagePath) => {
          insertMarkdown(`![image](${imagePath})`, "");
          setIsImageSelectorOpen(false);
        }}
      />
    </div>
  );
}

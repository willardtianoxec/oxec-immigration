import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Loader2, ArrowLeft, Eye } from "lucide-react";
import { useParams } from "wouter";
import ImageUploader from "@/components/ImageUploader";
import RichTextEditor from "@/components/RichTextEditor";
import TagRecommender from "@/components/TagRecommender";
import DistributionPanel from "@/components/DistributionPanel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminPostForm() {
  // 所有Hooks必须在组件顶部无条件调用
  const [location, setLocation] = useLocation();
  const params = useParams<{ id?: string }>();
  const postId = params?.id ? parseInt(params.id) : null;
  const isEditing = !!postId;

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    content: "",
    excerpt: "",
    type: "blog" as "blog" | "success-case",
    category: "",
    contentCategory: "" as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | "",
    tags: "",
    coverImage: "",
    published: true,
  });

  const [distributionData, setDistributionData] = useState({
    linkedinEnabled: false,
    wechatEnabled: false,
  });

  const { data: authData } = trpc.auth.me.useQuery();
  const { data: post, isLoading: isLoadingPost } = trpc.posts.getById.useQuery(
    { id: postId! },
    { enabled: isEditing }
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

  // useEffect必须在Hooks之后、权限检查之前调用
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
        contentCategory: (post.contentCategory || "") as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | "",
        tags: post.tags || "",
        coverImage: post.coverImage || "",
        published: post.published,
      });
    }
  }, [post]);

  const user = authData;

  // 权限检查 - 在所有Hooks之后进行
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

  const handleSaveDraft = () => {
    // 验证必填字段
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
        category: formData.category || undefined,
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
        category: formData.category || undefined,
        contentCategory: formData.contentCategory as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | undefined,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
      });
    }
  };

  const handlePublish = () => {
    // 验证必填字段
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
        category: formData.category || undefined,
        contentCategory: formData.contentCategory as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | undefined,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
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
        category: formData.category || undefined,
        contentCategory: formData.contentCategory as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | undefined,
        tags: formData.tags || undefined,
        coverImage: formData.coverImage || undefined,
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
      const newTags = [...currentTags, tag].join(", ");
      setFormData({ ...formData, tags: newTags });
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

            {/* 文章类型和内容分类 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">文章类型 *</label>
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
                <label className="block text-sm font-medium mb-2">内容分类 *</label>
                <Select
                  value={formData.contentCategory || ""}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      contentCategory: value as "investment-immigration" | "family-reunion" | "maple-leaf-renewal" | "reconsideration" | "temporary-resident" | "skilled-worker" | "citizenship" | "other" | "",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择内容分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investment-immigration">投资移民</SelectItem>
                    <SelectItem value="family-reunion">家庭团聚</SelectItem>
                    <SelectItem value="maple-leaf-renewal">枫叶卡续签</SelectItem>
                    <SelectItem value="reconsideration">拒签重审</SelectItem>
                    <SelectItem value="temporary-resident">临时居民申请</SelectItem>
                    <SelectItem value="skilled-worker">技术移民</SelectItem>
                    <SelectItem value="citizenship">公民入籍</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 自定义分类（可选） */}
            <div>
              <label className="block text-sm font-medium mb-2">自定义分类（可选）</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="如：技术移民、家庭团聚（可选）"
              />
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

            {/* 标签和推荐 */}
            <div className="space-y-3">
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
              <TagRecommender
                type={formData.type}
                currentTags={formData.tags}
                onTagSelect={handleAddTag}
              />
            </div>

            {/* 封面图上传 */}
            <div>
              <label className="block text-sm font-medium mb-2">封面图</label>
              <ImageUploader
                currentImage={formData.coverImage}
                onImageUpload={(url) =>
                  setFormData({ ...formData, coverImage: url })
                }
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

            {/* 富文本编辑器 */}
            <div>
              <label className="block text-sm font-medium mb-2">正文 *</label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) =>
                  setFormData({ ...formData, content })
                }
              />
            </div>

            {/* 发布状态 */}
            <div className="space-y-3">
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
              <p className="text-xs text-muted-foreground">
                {formData.published
                  ? "文章将在保存后立即发布到公开页面"
                  : "文章将保存为草稿，可稍后发布"}
              </p>
            </div>

            {/* 分发面板 */}
            <DistributionPanel
              linkedinEnabled={distributionData.linkedinEnabled}
              wechatEnabled={distributionData.wechatEnabled}
              onLinkedinChange={(enabled) =>
                setDistributionData({ ...distributionData, linkedinEnabled: enabled })
              }
              onWechatChange={(enabled) =>
                setDistributionData({ ...distributionData, wechatEnabled: enabled })
              }
            />

            {/* 提交按钮 */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSubmitting || !formData.title || !formData.content}
                className="flex-1"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                保存草稿
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setLocation(`/admin/posts/${postId}/preview`)}
                  disabled={isSubmitting || !formData.title || !formData.content}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  预览
                </Button>
              )}
              <Button
                type="button"
                onClick={handlePublish}
                disabled={isSubmitting || !formData.title || !formData.content}
                className="flex-1"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isEditing ? "发布更改" : "发布文章"}
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

            {/* 取消发布按钮 */}
            {isEditing && formData.published && (
              <div className="flex gap-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="destructive"
                  className="flex-1"
                  disabled={isSubmitting}
                  onClick={() => {
                    if (confirm("确定要取消发布此文章吗？文章将保存为草稿。")) {
                      updateMutation.mutate({
                        id: postId,
                        published: false,
                        publishedAt: undefined,
                      });
                    }
                  }}
                >
                  取消发布
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}

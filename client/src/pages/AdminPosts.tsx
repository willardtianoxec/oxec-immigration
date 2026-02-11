import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Loader2, Trash2, Edit2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 内容分类的中英文映射
const CONTENT_CATEGORIES = {
  "investment-immigration": "投资移民",
  "family-reunion": "家庭团聚",
  "maple-leaf-renewal": "枫叶卡续签",
  "reconsideration": "拒签重审",
  "temporary-resident": "临时居民申请",
  "skilled-worker": "技术移民",
  "citizenship": "公民入籍",
  "other": "其他",
} as const;

export default function AdminPosts() {
  // 所有Hooks必须在组件顶部无条件调用
  const [location, setLocation] = useLocation();
  const [postType, setPostType] = useState<"blog" | "success-case">("blog");
  const [contentCategory, setContentCategory] = useState<string | null>(null);

  const { data: authData } = trpc.auth.me.useQuery();
  const { data: posts, isLoading, refetch } = trpc.posts.list.useQuery({
    type: postType,
    contentCategory: contentCategory || undefined,
    publishedOnly: false,
  });

  const deleteMutation = trpc.posts.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const user = authData;
  const navigate = (path: string) => setLocation(path);

  // 权限检查 - 在Hooks之后进行
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

  const handleDelete = (id: number) => {
    if (confirm("确定要删除这篇文章吗？")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">文章管理</h1>
          <Button onClick={() => navigate("/admin/posts")}>
            <Plus className="w-4 h-4 mr-2" />
            新建文章
          </Button>
        </div>

        {/* 类型切换和内容分类筛选 */}
        <div className="flex gap-4 mb-6 flex-wrap items-center">
          <div className="flex gap-4">
            <Button
              variant={postType === "blog" ? "default" : "outline"}
              onClick={() => setPostType("blog")}
            >
              博客文章
            </Button>
            <Button
              variant={postType === "success-case" ? "default" : "outline"}
              onClick={() => setPostType("success-case")}
            >
              成功案例
            </Button>
          </div>

          {/* 内容分类筛选 */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">按分类筛选:</label>
            <Select
              value={contentCategory || "all"}
              onValueChange={(value) =>
                setContentCategory(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {Object.entries(CONTENT_CATEGORIES).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 文章列表 */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    {post.subtitle && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {post.subtitle}
                      </p>
                    )}
                    <div className="flex gap-2 items-center text-sm text-muted-foreground flex-wrap">
                      {post.contentCategory && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {CONTENT_CATEGORIES[
                            post.contentCategory as keyof typeof CONTENT_CATEGORIES
                          ] || post.contentCategory}
                        </span>
                      )}
                      {post.category && (
                        <span className="bg-secondary px-2 py-1 rounded">
                          {post.category}
                        </span>
                      )}
                      {post.tags && (
                        <span className="text-xs">标签: {post.tags}</span>
                      )}
                      <span
                        className={
                          post.published
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {post.published ? "已发布" : "草稿"}
                      </span>
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "zh-CN"
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/posts/${post.id}`)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">暂无文章</p>
            <Button onClick={() => navigate("/admin/posts")}>
              创建第一篇文章
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

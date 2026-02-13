import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search } from "lucide-react";

interface ArticleSidebarProps {
  currentPostId: number;
  postType: "blog" | "success-case";
  blogCategory?: string | null;
  successCaseCategory?: string | null;
  tags?: string[];
}

const BLOG_CATEGORY_LABELS: Record<string, string> = {
  "policy-interpretation": "政策解读",
  "news": "新闻",
  "immigration-life": "移居生活",
  "immigration-story": "移民故事",
  "immigration-project": "移民项目",
};

const SUCCESS_CASE_CATEGORY_LABELS: Record<string, string> = {
  "investment-immigration": "投资移民",
  "skilled-worker": "技术移民",
  "family-reunion": "家庭团聚移民",
  "reconsideration": "拒签与程序公正信",
  "temporary-visit": "临时访问申请",
};

export function ArticleSidebar({
  currentPostId,
  postType,
  blogCategory,
  successCaseCategory,
  tags = [],
}: ArticleSidebarProps) {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // 获取最近的文章
  const { data: latestPosts, isLoading: latestLoading } = trpc.posts.list.useQuery({
    type: postType,
    publishedOnly: true,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}&type=${postType}`);
    }
  };

  const handleTagClick = (tag: string) => {
    setLocation(`/tagged/${encodeURIComponent(tag)}?type=${postType}`);
  };

  const categoryLabel = postType === "blog"
    ? (blogCategory ? BLOG_CATEGORY_LABELS[blogCategory] : "未分类")
    : (successCaseCategory ? SUCCESS_CASE_CATEGORY_LABELS[successCaseCategory] : "未分类");

  // 获取最近的其他文章（排除当前文章）
  const otherPosts = latestPosts?.filter(p => p.id !== currentPostId).slice(0, 3) || [];

  return (
    <div className="space-y-8">
      {/* 分类 */}
      <div>
        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">文章分类</h3>
        <Badge variant="secondary" className="text-base py-2 px-3">
          {categoryLabel}
        </Badge>
      </div>

      {/* 最近的文章 */}
      <div>
        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">最近的文章</h3>
        {latestLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : otherPosts.length > 0 ? (
          <div className="space-y-4">
            {otherPosts.map((post) => (
              <div key={post.id} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                <h4 className="font-medium text-sm mb-2 line-clamp-2 hover:text-primary cursor-pointer">
                  <button
                    onClick={() => setLocation(`/blog/${post.slug}`)}
                    className="text-left hover:text-primary transition-colors"
                  >
                    {post.title}
                  </button>
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : new Date(post.createdAt).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto text-xs"
                  onClick={() => setLocation(`/blog/${post.slug}`)}
                >
                  点击阅读 →
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">暂无其他文章</p>
        )}
      </div>

      {/* 标签 */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">标签</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 搜索栏 */}
      <div>
        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">搜索文章</h3>
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="搜索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm"
            />
            <Button type="submit" size="sm" variant="default">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

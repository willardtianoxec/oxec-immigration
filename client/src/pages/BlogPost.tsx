import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";
import { Badge } from "@/components/ui/badge";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const BLOG_CATEGORY_LABELS: Record<string, string> = {
  "policy-interpretation": "政策解读",
  "news": "新闻",
  "immigration-life": "移居生活",
  "immigration-story": "移民故事",
  "immigration-project": "移民项目",
};

const CONTENT_CATEGORY_LABELS: Record<string, string> = {
  "investment-immigration": "投资移民",
  "family-reunion": "家庭团聚",
  "maple-leaf-renewal": "枫叶卡续签",
  "reconsideration": "拒签重审",
  "temporary-resident": "临时居民申请",
  "skilled-worker": "技术移民",
  "citizenship": "公民入籍",
  "other": "其他",
};

export function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const [, setLocation] = useLocation();
  const auth = useAuth();

  const { data: post, isLoading, error } = trpc.posts.getBySlug.useQuery(
    { slug: slug! },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
          <p className="text-muted-foreground mb-6">抱歉，我们找不到您要查找的文章。</p>
          <Button onClick={() => setLocation("/blog")}>返回博客列表</Button>
        </div>
      </div>
    );
  }

  const blogCategoryLabel = post.blogCategory ? BLOG_CATEGORY_LABELS[post.blogCategory] : "未分类";
  const contentCategoryLabel = post.contentCategory ? CONTENT_CATEGORY_LABELS[post.contentCategory] || post.contentCategory : "未分类";
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt);
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);
  const tags = post.tags ? post.tags.split(",").map(t => t.trim()).filter(t => t) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation("/blog")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回博客列表
          </Button>
          <div className="flex items-center gap-4">
            {auth?.user ? (
              <span className="text-sm text-muted-foreground">
                欢迎，{auth.user.name}
              </span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = getLoginUrl())}
              >
                登录
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* 面包屑导航 */}
      <div className="border-b border-border bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 py-3 text-sm text-muted-foreground">
          <button onClick={() => setLocation("/")} className="hover:text-foreground">
            首页
          </button>
          <span className="mx-2">/</span>
          <button onClick={() => setLocation("/blog")} className="hover:text-foreground">
            博客
          </button>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左栏：文章内容 */}
          <div className="lg:col-span-2">
            {/* 文章头部 */}
            <div className="mb-8">
              {/* 分类标签 */}
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{blogCategoryLabel}</Badge>
                {post.contentCategory && (
                  <Badge variant="outline">{contentCategoryLabel}</Badge>
                )}
              </div>

              {/* 标题 */}
              <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Alibaba PuHuiTi Black', sans-serif" }}>
                {post.title}
              </h1>

              {/* 副标题 */}
              {post.subtitle && (
                <p className="text-xl text-muted-foreground mb-6">
                  {post.subtitle}
                </p>
              )}

              {/* 元数据 */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-b border-border pb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author || "OXEC Immigration"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{publishedDate.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>阅读时间 {readingTime} 分钟</span>
                </div>
              </div>
            </div>

            {/* 封面图片 */}
            {post.coverImage && (
              <div className="mb-8">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto rounded-lg object-cover max-h-96"
                />
              </div>
            )}

            {/* 文章内容 */}
            <div className="prose prose-sm md:prose-base max-w-none mb-12">
              <Streamdown>{post.content}</Streamdown>
            </div>

            {/* 文章摘要 */}
            {post.excerpt && (
              <div className="bg-muted/50 rounded-lg p-6 mb-8 border border-border">
                <h3 className="text-lg font-semibold mb-4">文章摘要</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
            )}

            {/* 标签列表 */}
            {tags.length > 0 && (
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="text-lg font-semibold mb-4">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary transition-colors"
                      onClick={() => setLocation(`/tagged/${encodeURIComponent(tag)}?type=blog`)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右栏：侧边栏 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ArticleSidebar
                currentPostId={post.id}
                postType={post.type as "blog" | "success-case"}
                blogCategory={post.blogCategory}
                tags={tags}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

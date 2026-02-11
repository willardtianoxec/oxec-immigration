"use client";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Streamdown } from "streamdown";
import { Badge } from "@/components/ui/badge";

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

  const contentCategoryLabel = post.contentCategory ? CONTENT_CATEGORY_LABELS[post.contentCategory] || post.contentCategory : "未分类";
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt);
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200); // 假设平均阅读速度为200词/分钟

  return (
    <div className="min-h-screen bg-background">
      {/* 返回按钮 */}
      <div className="border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => setLocation(post.type === "blog" ? "/blog" : "/success-cases")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回{post.type === "blog" ? "博客" : "成功案例"}列表
          </Button>
        </div>
      </div>

      {/* 文章头部 */}
      <div className="border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          {/* 分类标签 */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{contentCategoryLabel}</Badge>
            {post.tags && post.tags.split(",").map((tag) => (
              <Badge key={tag.trim()} variant="outline">
                {tag.trim()}
              </Badge>
            ))}
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
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
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
      </div>

      {/* 封面图片 */}
      {post.coverImage && (
        <div className="border-b border-border">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto rounded-lg object-cover max-h-96"
            />
          </div>
        </div>
      )}

      {/* 文章内容 */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-sm md:prose-base max-w-none">
          <Streamdown>{post.content}</Streamdown>
        </div>
      </div>

      {/* 文章摘要 */}
      {post.excerpt && (
        <div className="border-t border-b border-border bg-muted/50">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <h3 className="text-lg font-semibold mb-4">文章摘要</h3>
            <p className="text-muted-foreground">{post.excerpt}</p>
          </div>
        </div>
      )}

      {/* 返回按钮 */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Button
          onClick={() => setLocation(post.type === "blog" ? "/blog" : "/success-cases")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回{post.type === "blog" ? "博客" : "成功案例"}列表
        </Button>
      </div>
    </div>
  );
}

import { useParams, useLocation, useSearch } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TaggedArticles() {
  const params = useParams<{ tag: string }>();
  const tag = params?.tag ? decodeURIComponent(params.tag) : "";
  const search = useSearch();
  const [, setLocation] = useLocation();

  // 从URL参数获取type
  const searchParams = new URLSearchParams(search);
  const type = (searchParams.get("type") as "blog" | "success-case") || "blog";

  const { data: posts, isLoading, error } = trpc.posts.search.useQuery(
    { query: tag, type },
    { enabled: !!tag }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">搜索出错</h1>
          <p className="text-muted-foreground mb-6">抱歉，搜索过程中出现了错误。</p>
          <Button onClick={() => setLocation("/blog")}>返回博客列表</Button>
        </div>
      </div>
    );
  }

  const articleCount = posts?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/blog")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回博客列表
          </Button>
        </div>
      </nav>

      {/* 页面标题 */}
      <div className="border-b border-border bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">
            标签：<span className="text-primary">{tag}</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            找到 <span className="font-semibold text-foreground">{articleCount}</span> 篇文章
          </p>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {articleCount === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">
              没有找到与此标签相关的文章。
            </p>
            <Button onClick={() => setLocation("/blog")}>返回博客列表</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts?.map((post: any) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setLocation(`/blog/${post.slug}`)}
              >
                {post.coverImage && (
                  <div className="relative w-full h-48 overflow-hidden bg-muted">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {post.blogCategory && (
                      <Badge variant="secondary" className="text-xs">
                        {post.blogCategory}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
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
                    </span>
                    <span>阅读</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

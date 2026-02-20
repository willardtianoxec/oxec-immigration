import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostDetailLayout } from "@/components/PostDetailLayout";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const BLOG_BACKGROUND_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/myboWRThWGxsUPIG.jpg";

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

  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt);
  const tags = post.tags ? post.tags.split(",").map(t => t.trim()).filter(t => t) : [];

  // Format publish date
  const formattedDate = publishedDate.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Prepare article content with cover image if available
  let fullContent = post.content;
  if (post.coverImage) {
    // Ensure image URL is absolute
    const imageUrl = post.coverImage.startsWith('http') 
      ? post.coverImage 
      : post.coverImage.startsWith('/') 
      ? post.coverImage 
      : `/${post.coverImage}`;
    fullContent = `![${post.title}](${imageUrl})\n\n${post.content}`;
  }

  return (
    <>
      {/* Navigation Bar */}
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

      {/* Post Detail Layout with Fixed Background */}
      <PostDetailLayout
        backgroundImage={BLOG_BACKGROUND_IMAGE}
        title={post.title}
        author={post.author || "OXEC Immigration"}
        publishDate={formattedDate}
        content={fullContent}
        type="blog"
        sidebar={
          <ArticleSidebar
            currentPostId={post.id}
            postType={post.type as "blog" | "success-case"}
            blogCategory={post.blogCategory}
            tags={tags}
          />
        }
      />
    </>
  );
}

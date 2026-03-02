import { useParams, useLocation } from "wouter";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostDetailLayout } from "@/components/PostDetailLayout";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Footer } from "@/components/Footer";
import { SchemaScript } from "@/components/SchemaScript";
import { generateArticleSchema } from "@/lib/schema";

const SUCCESS_CASE_BACKGROUND_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/JXSuOpamrPnvublb.jpg";

const SUCCESS_CASE_CATEGORY_LABELS: Record<string, string> = {
  "investment-immigration": "投资移民",
  "skilled-worker": "技术移民",
  "family-reunion": "家庭团聚移民",
  "reconsideration": "拒签与程序公正信",
  "temporary-visit": "临时访问申请",
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

export function SuccessCaseDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const [, setLocation] = useLocation();
  const auth = useAuth();

  const { data: post, isLoading, error } = trpc.posts.getBySlug.useQuery(
    { slug: slug! },
    { enabled: !!slug }
  );

  // Update OG tags for social media sharing - must be at top level
  useEffect(() => {
    if (!post) return;

    // Update document title
    document.title = `${post.title} - OXEC Immigration`;

    // Remove existing OG tags
    const existingOGTags = document.querySelectorAll('meta[property^="og:"]');
    existingOGTags.forEach(tag => tag.remove());

    // Create and add new OG tags
    const ogTags = [
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.excerpt || post.content.substring(0, 150) },
      { property: 'og:url', content: `${window.location.origin}/success-cases/${post.slug}` },
      { property: 'og:type', content: 'article' },
    ];

    // Add cover image if available
    if (post.coverImage) {
      let imageUrl = post.coverImage;
      if (!imageUrl.startsWith('http')) {
        if (!imageUrl.startsWith('/')) {
          imageUrl = `/${imageUrl}`;
        }
        imageUrl = `${window.location.origin}${imageUrl}`;
      }
      ogTags.push({ property: 'og:image', content: imageUrl });
    }

    ogTags.forEach(({ property, content }) => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    });

    // Return cleanup function
    return () => {
      const tagsToRemove = document.querySelectorAll('meta[property^="og:"]');
      tagsToRemove.forEach(tag => tag.remove());
    };
  }, [post?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post || post.type !== "success-case") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">成功案例未找到</h1>
          <p className="text-muted-foreground mb-6">抱歉，我们找不到您要查找的成功案例。</p>
          <Button onClick={() => setLocation("/success-cases")}>返回成功案例列表</Button>
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
  let coverImageUrl = post.coverImage;
  if (post.coverImage) {
    // Ensure image URL is absolute with full domain
    let imageUrl = post.coverImage;
    if (!imageUrl.startsWith('http')) {
      // Convert relative path to absolute URL with domain
      if (!imageUrl.startsWith('/')) {
        imageUrl = `/${imageUrl}`;
      }
      imageUrl = `${window.location.origin}${imageUrl}`;
    }
    coverImageUrl = imageUrl;
    fullContent = `![${post.title}](${imageUrl})\n\n${post.content}`;
  }

  // Generate current article URL
  const caseUrl = `${window.location.origin}/success-cases/${post.slug}`;

  // Generate Article Schema for SEO
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt || post.content.substring(0, 150),
    image: coverImageUrl || 'https://oxec-immigration.manus.space/logo.png',
    datePublished: new Date(post.createdAt).toISOString(),
    dateModified: new Date(post.updatedAt || post.createdAt).toISOString(),
    url: caseUrl
  });

  return (
    <>
      <SchemaScript schema={articleSchema} />
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation("/success-cases")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回成功案例列表
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
        backgroundImage={SUCCESS_CASE_BACKGROUND_IMAGE}
        title={post.title}
        author={post.author || "OXEC Immigration"}
        publishDate={formattedDate}
        description={post.excerpt || post.content.substring(0, 150)}
        coverImage={coverImageUrl || undefined}
        content={fullContent}
        type="success-case"
        url={caseUrl}
        sidebar={
          <ArticleSidebar
            currentPostId={post.id}
            postType={post.type as "blog" | "success-case"}
            successCaseCategory={post.successCaseCategory}
            tags={tags}
          />
        }
      />
      <Footer />
    </>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2, Download } from "lucide-react";
import { Streamdown } from "streamdown";
import { format } from "date-fns";

interface PostPreviewProps {
  post: {
    id?: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    type: "blog" | "success-case";
    category?: string;
    contentCategory?: string;
    tags?: string;
    coverImage?: string;
    published?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
  onEdit?: () => void;
  onBack?: () => void;
}

export default function PostPreview({ post, onEdit, onBack }: PostPreviewProps) {
  const contentCategoryMap: Record<string, string> = {
    "investment-immigration": "投资移民",
    "family-reunion": "家庭团聚",
    "maple-leaf-renewal": "枫叶卡续签",
    "reconsideration": "拒签重审",
    "temporary-resident": "临时居民申请",
    "skilled-worker": "技术移民",
    "citizenship": "公民入籍",
    "other": "其他",
  };

  const typeMap: Record<string, string> = {
    blog: "博客文章",
    "success-case": "成功案例",
  };

  const tags = post.tags ? post.tags.split(",").map((tag) => tag.trim()) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 sticky top-0 z-10 shadow-md">
        <div className="container">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={onBack}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回编辑
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button
                  variant="secondary"
                  onClick={onEdit}
                  className="gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  编辑
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Article Metadata */}
          <div className="mb-8 pb-8 border-b border-border">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded">
                {typeMap[post.type] || post.type}
              </span>
              {post.contentCategory && (
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded">
                  {contentCategoryMap[post.contentCategory] || post.contentCategory}
                </span>
              )}
              {post.category && (
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm rounded">
                  {post.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              {post.createdAt && (
                <span>发布于 {format(new Date(post.createdAt), "yyyy年MM月dd日")}</span>
              )}
              {post.published && (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  已发布
                </span>
              )}
              {!post.published && (
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                  草稿
                </span>
              )}
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="mb-8 p-4 bg-accent/5 border-l-4 border-accent rounded">
              <p className="text-lg text-foreground italic">{post.excerpt}</p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-sm max-w-none mb-12">
            <Streamdown>{post.content}</Streamdown>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-8 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">标签</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-8 border-t border-border">
            {onBack && (
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回编辑
              </Button>
            )}
            {onEdit && (
              <Button
                onClick={onEdit}
                className="flex-1"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                编辑文章
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, Search, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const BLOG_CATEGORIES = [
  { key: "policy-interpretation", label: "政策解读" },
  { key: "news", label: "新闻" },
  { key: "immigration-life", label: "移居生活" },
  { key: "immigration-story", label: "移民故事" },
  { key: "immigration-project", label: "移民项目" },
];

export default function Blog() {
  const searchParams = new URLSearchParams(useSearch());
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search");
  
  const [searchQuery, setSearchQuery] = useState(urlSearch || "");
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "");
  
  const { data: posts, isLoading } = trpc.posts.list.useQuery({ type: "blog", publishedOnly: true });

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    return posts.filter(post => {
      // 按分类过滤
      if (selectedCategory && post.blogCategory !== selectedCategory) {
        return false;
      }
      
      // 按搜索关键词过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.content?.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey === selectedCategory ? "" : categoryKey);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首页
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">移民博客</h1>
          <p className="text-lg opacity-90">
            加拿大移民最新政策、成功案例和专业见解
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* 分类过滤 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">按分类筛选</h3>
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === cat.key
                    ? "bg-gray-400 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory("")}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                清除筛选
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="搜索文章..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">加载中...</p>
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                {post.coverImage && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(post.publishedAt || post.createdAt), "MMM d, yyyy")}
                  </div>
                  <CardTitle className="line-clamp-2 mb-4 flex-1">{post.title}</CardTitle>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                      点击阅读
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery || selectedCategory ? "未找到匹配的文章。" : "暂无已发布的文章。"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

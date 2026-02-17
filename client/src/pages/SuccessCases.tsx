import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const SUCCESS_CASE_CATEGORIES = [
  { key: "investment-immigration", label: "投资移民" },
  { key: "skilled-worker", label: "技术移民" },
  { key: "family-reunion", label: "家庭团聚移民" },
  { key: "reconsideration", label: "拒签与程序公正信" },
  { key: "temporary-visit", label: "临时访问申请" },
];

export default function SuccessCases() {
  const searchParams = new URLSearchParams(useSearch());
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search");
  
  const [searchQuery, setSearchQuery] = useState(urlSearch || "");
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const serviceItems = [
    { label: "投资移民", href: "/businessclass" },
    { label: "家庭团聚移民", href: "/familyclass" },
    { label: "枫叶卡续签与加急", href: "/prcard" },
    { label: "拒签与程序公正信", href: "/reconsideration" },
    { label: "留学与访问", href: "/temporary" },
    { label: "技术移民", href: "/skillworker" },
    { label: "公民入籍", href: "/citizenship" },
  ];

  const { data: cases, isLoading } = trpc.posts.list.useQuery({
    type: "success-case",
    publishedOnly: true,
  });

  const filteredCases = useMemo(() => {
    if (!cases) return [];
    
    return cases.filter((post: any) => {
      // 按分类过滤
      if (selectedCategory && post.successCaseCategory !== selectedCategory) {
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
  }, [cases, selectedCategory, searchQuery]);

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey === selectedCategory ? "" : categoryKey);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar - Same as Home */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm" style={{height: '55px'}}>
        <div className="container flex items-center py-4" style={{ justifyContent: 'space-between', height: '55px' }}>
          {/* Logo */}
          <Link href="/">
            <img src="/oxec-logo.png" alt="OXEC Immigration Services Ltd." className="cursor-pointer flex-shrink-0" style={{ height: '40px', width: '160px' }} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center" style={{ flex: 1, justifyContent: 'space-around', marginLeft: '32px' }}>
            <Link href="/">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">首页</span>
            </Link>
            <div className="relative group">
              <button
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="flex items-center text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
              >
                服务
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesDropdownOpen && (
                <div
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-0 w-56 bg-white border border-border rounded-md shadow-lg z-50"
                >
                  {serviceItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span className="block px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer first:rounded-t-md last:rounded-b-md">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/success-cases">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">成功案例</span>
            </Link>
            <Link href="/blog">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">博客</span>
            </Link>
            <Link href="/team">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">关于我们</span>
            </Link>
            <button
              onClick={() => setLanguage(language === "en" ? "zh" : "en")}
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              {language === "en" ? "中文" : "ENG"}
            </button>
            <Link href="/booking">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                <span>预约咨询</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="container py-4 space-y-3">
              <Link href="/">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">首页</span>
              </Link>
              <Link href="/success-cases">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">成功案例</span>
              </Link>
              <Link href="/blog">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">博客</span>
              </Link>
              <Link href="/team">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">关于我们</span>
              </Link>
              <button
                onClick={() => setLanguage(language === "en" ? "zh" : "en")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2"
              >
                {language === "en" ? "中文" : "ENG"}
              </button>
              <Link href="/booking">
                <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                  <span>预约咨询</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-accent to-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">成功案例</h1>
          <p className="text-lg opacity-90">
            真实的客户故事，他们通过我们的帮助实现了加拿大移民梦想
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12 flex-grow">
        {/* 分类过滤 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">按分类筛选</h3>
          <div className="flex flex-wrap gap-2">
            {SUCCESS_CASE_CATEGORIES.map((cat) => (
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
          <input
            type="text"
            placeholder="搜索成功案例..."
            className="w-full max-w-xl px-4 py-2 border-2 border-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Cases Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">加载中...</p>
          </div>
        ) : filteredCases && filteredCases.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredCases.map((post: any) => (
              <Link key={post.id} href={`/success-cases/${post.slug}`}>
                <div className="bg-white hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Category Badge */}
                    {post.successCaseCategory && (
                      <span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 text-sm font-medium mb-3 w-fit">
                        {getCategoryLabel(post.successCaseCategory)}
                      </span>
                    )}
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    
                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>
                    )}
                    
                    {/* Meta Information */}
                    <div className="text-sm text-muted-foreground flex flex-col gap-2 mt-auto">
                      {post.publishedAt && (
                        <span>
                          发布于 {new Date(post.publishedAt).toLocaleDateString("zh-CN")}
                        </span>
                      )}
                      {post.content && (
                        <span>
                          阅读时间 {Math.ceil(post.content.length / 300)} 分钟
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery || selectedCategory ? "未找到匹配的成功案例。" : "暂无成功案例。"}
            </p>
          </div>
        )}

        {/* CTA Section with Background Image */}
        <section
          className="py-20 flex items-center justify-center relative overflow-hidden -mx-4 md:mx-0"
          style={{
            backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/WZnaCRpbTuyKXGGm.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            minHeight: "400px",
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="container text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">准备好开启您的移民之旅了吗？</h2>
            <Link href="/booking">
              <Button
                size="lg"
                className="font-bold text-lg px-8 py-6"
                style={{
                  borderRadius: '0px',
                  borderWidth: '3px',
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  backgroundColor: '#388088'
                }}
              >
                立即预约咨询
              </Button>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "investment-immigration": "投资移民",
    "skilled-worker": "技术移民",
    "family-reunion": "家庭团聚移民",
    "reconsideration": "拒签与程序公正信",
    "temporary-visit": "临时访问申请",
    "family-reunion-migration": "家庭团聚移民",
    "maple-leaf-renewal": "枫叶卡续签",
    "temporary-resident": "临时居民申请",
    "citizenship": "公民入籍",
    "other": "其他",
  };
  return labels[category] || category;
}

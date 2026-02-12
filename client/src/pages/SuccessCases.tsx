import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Streamdown } from "streamdown";

export default function SuccessCases() {
  const { data: cases, isLoading } = trpc.posts.list.useQuery({
    type: "success-case",
    publishedOnly: true,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-primary text-primary-foreground py-12">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回主页
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <CheckCircle2 className="mr-3 h-10 w-10" />
            成功案例
          </h1>
          <p className="text-lg opacity-90">
            真实的客户故事，他们通过我们的帮助实现了加拿大移民梦想
          </p>
        </div>
      </div>

      <div className="container py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">加载中...</p>
          </div>
        ) : cases && cases.length > 0 ? (
          <div className="space-y-8">
            {cases.map((post) => (
              <Link key={post.id} href={`/success-cases/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {post.coverImage && (
                      <div className="lg:col-span-1">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover min-h-[300px]"
                        />
                      </div>
                    )}
                    <div className={post.coverImage ? "lg:col-span-2" : "lg:col-span-3"}>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          {post.contentCategory && (
                            <Badge variant="secondary" className="bg-accent/10 text-accent">
                              {getCategoryLabel(post.contentCategory)}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-2xl">{post.title}</CardTitle>
                        {post.subtitle && (
                          <p className="text-muted-foreground mt-2">{post.subtitle}</p>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {post.excerpt && (
                          <p className="text-muted-foreground">{post.excerpt}</p>
                        )}
                        {post.content && (
                          <div className="prose prose-sm max-w-none line-clamp-3">
                            <Streamdown>{post.content}</Streamdown>
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
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
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无成功案例。</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-3xl">准备好开启您的移民之旅了吗？</CardTitle>
              <p className="text-primary-foreground/80 text-lg mt-2">
                让我们经验丰富的顾问为您指导整个移民过程
              </p>
            </CardHeader>
            <CardContent>
              <Link href="/booking">
                <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  预约咨询
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "investment-immigration": "投资移民",
    "family-reunion": "家庭团聚",
    "maple-leaf-renewal": "枫叶卡续签",
    "reconsideration": "拒签重审",
    "temporary-resident": "临时居民申请",
    "skilled-worker": "技术移民",
    "citizenship": "公民入籍",
    "other": "其他",
  };
  return labels[category] || category;
}

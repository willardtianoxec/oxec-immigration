import React from "react";
import { Star, MessageCircle, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export function GoogleReviewsPreview() {
  const { data, isLoading, error } = trpc.reviews.getGoogleReviews.useQuery({
    limit: 3,
  });

  if (isLoading) {
    return (
      <section className="min-h-[600px] bg-white py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载点评中...</p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return null;
  }

  return (
    <section className="min-h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* 标题和评分区域 */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-gray-900" style={{ fontFamily: "Alibaba PuHuiTi" }}>
            客户评价
          </h2>

          {/* Google评分卡 */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://www.gstatic.com/images/branding/product/1x/googleg_standard_color_128dp.png"
                alt="Google"
                className="h-8 w-8"
              />
              <span className="text-sm font-semibold text-gray-700">Google 点评</span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">{data.rating.toFixed(1)}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              基于 {data.reviewCount} 条评论
            </p>

            <a
              href="https://www.google.com/maps/search/OXEC+Immigration"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              在Google上评价我们
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 点评卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col"
            >
              {/* 评论者信息 */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.profilePhotoUrl}
                  alt={review.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <a
                    href={review.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-900 hover:text-blue-600 text-sm"
                  >
                    {review.author}
                  </a>
                  <p className="text-xs text-gray-500">{review.relativeTimeDescription}</p>
                </div>
              </div>

              {/* 星级评分 */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* 评论文本 */}
              <p className="text-gray-700 text-sm mb-4 flex-1 line-clamp-4">
                {review.text}
              </p>

              {/* 查看原文链接 */}
              <a
                href={review.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-xs font-semibold"
              >
                在Google上查看
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* CTA按钮 */}
        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/maps/search/OXEC+Immigration"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              查看所有评价
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

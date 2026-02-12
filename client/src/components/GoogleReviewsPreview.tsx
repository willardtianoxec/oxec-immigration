import React from "react";
import { Star, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export function GoogleReviewsPreview() {
  const { data, isLoading, error } = trpc.reviews.getGoogleReviews.useQuery({
    limit: 3,
  });

  if (isLoading) {
    return (
      <section className="min-h-[200px] bg-white py-8 px-4 flex items-center justify-center">
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
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* 标题 */}
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-gray-900" style={{ fontFamily: "Alibaba PuHuiTi" }}>
          客户评价
        </h2>

        {/* Google评分展示区 - 居中布局 */}
        <div className="flex flex-col items-center justify-center gap-8 mb-12">
          <div className="flex items-center justify-center gap-12">
            {/* 左侧：评分信息 */}
            <div className="flex items-center gap-6">
              {/* 大号评分 */}
              <div className="text-6xl font-black text-gray-900 leading-none">
                {data.rating.toFixed(1)}
              </div>

              {/* 中间：标题和星级 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">Google Reviews</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-semibold">({data.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* 右侧：CTA按钮 */}
            <a
              href="https://www.google.com/maps/search/OXEC+Immigration"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full px-8 py-6 text-lg whitespace-nowrap"
              >
                Review us on Google
              </Button>
            </a>
          </div>
        </div>

        {/* 点评卡片网格 */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">最新评价</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow"
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
                <p className="text-gray-700 text-sm mb-4 flex-1 line-clamp-3">
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
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export function GoogleReviewsPreview() {
  const { data, isLoading, error } = trpc.reviews.list.useQuery();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

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

  const reviews = data.reviews;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage < 0 ? Math.max(0, reviews.length - itemsPerPage) : prev - itemsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= reviews.length ? 0 : prev + itemsPerPage));
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* 标题 */}
        <h2 className="font-black mb-12 text-gray-900" style={{ fontFamily: '"Alibaba PuHuiTi", "Noto Sans SC", sans-serif', fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 900, textAlign: 'center' }}>
          客户评价
        </h2>

        {/* Google评分展示区 - 响应式布局 */}
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full px-4">
            {/* 左侧：评分信息 */}
            <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
              {/* 大号评分 */}
              <div className="text-4xl sm:text-6xl font-black text-gray-900 leading-none">
                {data.rating.toFixed(1)}
              </div>

              {/* 中间：标题和星级 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Google Reviews</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 sm:w-5 h-4 sm:h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-semibold">({data.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* 右侧：CTA按钮 */}
            <a
              href="https://www.google.com/maps/search/OXEC+Immigration"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg w-full sm:w-auto"
              >
                Review us on Google
              </Button>
            </a>
          </div>
        </div>

        {/* 点评卡片轮播 */}
        <div className="mt-12">
          <div className="relative">
            {/* 卡片容器 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleReviews.map((review) => (
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

            {/* 左右导航按钮 */}
            {reviews.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i * itemsPerPage)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        Math.floor(currentIndex / itemsPerPage) === i
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label="Next reviews"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 虚拟Google点评数据
 * 用于演示目的，之后可以替换为真实的Google Places API调用
 */

export interface GoogleReview {
  id: string;
  author: string;
  authorUrl: string;
  profilePhotoUrl: string;
  rating: number;
  text: string;
  time: number; // Unix timestamp
  relativeTimeDescription: string;
}

export interface GoogleReviewsData {
  rating: number;
  reviewCount: number;
  reviews: GoogleReview[];
}

// 虚拟Google点评数据
export const mockGoogleReviews: GoogleReviewsData = {
  rating: 5.0,
  reviewCount: 28,
  reviews: [
    {
      id: "review_1",
      author: "李女士",
      authorUrl: "https://www.google.com/maps/contrib/123456",
      profilePhotoUrl: "https://lh3.googleusercontent.com/a-/default-user=s64",
      rating: 5,
      text: "OXEC的团队非常专业和耐心。他们帮助我成功获得了加拿大投资移民签证。整个过程中，他们详细解释了每一步，确保我理解所有的要求和流程。强烈推荐！",
      time: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30天前
      relativeTimeDescription: "1个月前",
    },
    {
      id: "review_2",
      author: "王先生",
      authorUrl: "https://www.google.com/maps/contrib/234567",
      profilePhotoUrl: "https://lh3.googleusercontent.com/a-/default-user=s64",
      rating: 5,
      text: "非常感谢OXEC的帮助！我的家庭团聚移民申请在他们的专业指导下顺利获批。他们的服务态度非常好，总是及时回答我的问题。",
      time: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60天前
      relativeTimeDescription: "2个月前",
    },
    {
      id: "review_3",
      author: "张女士",
      authorUrl: "https://www.google.com/maps/contrib/345678",
      profilePhotoUrl: "https://lh3.googleusercontent.com/a-/default-user=s64",
      rating: 5,
      text: "我在OXEC的帮助下成功申请了枫叶卡续签。他们的团队非常了解加拿大移民法律，能够快速处理我的申请。非常推荐这家公司！",
      time: Date.now() - 90 * 24 * 60 * 60 * 1000, // 90天前
      relativeTimeDescription: "3个月前",
    },
    {
      id: "review_4",
      author: "陈先生",
      authorUrl: "https://www.google.com/maps/contrib/456789",
      profilePhotoUrl: "https://lh3.googleusercontent.com/a-/default-user=s64",
      rating: 5,
      text: "OXEC帮助我成功获得了技术移民签证。他们的专业知识和耐心的服务给我留下了深刻印象。如果您正在考虑移民加拿大，我强烈推荐OXEC。",
      time: Date.now() - 120 * 24 * 60 * 60 * 1000, // 120天前
      relativeTimeDescription: "4个月前",
    },
  ],
};

/**
 * 获取虚拟Google点评数据
 * @param limit 返回的点评数量限制
 * @returns Google点评数据
 */
export function getMockGoogleReviews(limit: number = 4): GoogleReviewsData {
  return {
    ...mockGoogleReviews,
    reviews: mockGoogleReviews.reviews.slice(0, limit),
  };
}

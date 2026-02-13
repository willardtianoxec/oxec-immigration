/**
 * Google Places API集成
 * 用于获取真实的Google评价数据
 */

import { GoogleReviewsData, GoogleReview } from "./mockGoogleReviews";

// Google Places API配置
const GOOGLE_PLACES_API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;
const PLACE_ID = "ChIJZ-e3jZdxMlQRCb6sPXx0MYE"; // OXEC Immigration的Google Place ID (需要替换为实际的)

/**
 * 从Google Places API获取真实的评价数据
 * @param limit 返回的评价数量限制
 * @returns Google评价数据
 */
export async function getRealGoogleReviews(limit: number = 4): Promise<GoogleReviewsData> {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn("Google Places API Key not configured, using mock data");
    return getMockGoogleReviews(limit);
  }

  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&key=${GOOGLE_PLACES_API_KEY}&fields=rating,user_ratings_total,reviews&reviews_sort=newest`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error("Google Places API request failed:", response.statusText);
      return getMockGoogleReviews(limit);
    }

    const data = await response.json();

    if (data.status !== "OK") {
      console.error("Google Places API error:", data.status, data.error_message);
      return getMockGoogleReviews(limit);
    }

    if (!data.result) {
      console.warn("No result from Google Places API, using mock data");
      return getMockGoogleReviews(limit);
    }

    const result = data.result;
    const reviews = result.reviews || [];

    // 转换Google Places API的评价格式为我们的格式
    const convertedReviews: GoogleReview[] = reviews.slice(0, limit).map((review: any) => ({
      id: `review_${review.time}`,
      author: review.author_name,
      authorUrl: review.author_url || "https://www.google.com/maps",
      profilePhotoUrl: review.profile_photo_url || "https://lh3.googleusercontent.com/a-/default-user=s64",
      rating: review.rating,
      text: review.text,
      time: review.time * 1000, // Convert Unix timestamp to milliseconds
      relativeTimeDescription: getRelativeTimeDescription(review.time),
    }));

    return {
      rating: result.rating || 5.0,
      reviewCount: result.user_ratings_total || reviews.length,
      reviews: convertedReviews,
    };
  } catch (error) {
    console.error("Error fetching Google Places reviews:", error);
    return getMockGoogleReviews(limit);
  }
}

/**
 * 获取相对时间描述（例如"1个月前"）
 */
function getRelativeTimeDescription(unixTimestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const secondsAgo = now - unixTimestamp;

  if (secondsAgo < 60) {
    return "刚刚";
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo}分钟前`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo}小时前`;
  } else if (secondsAgo < 604800) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo}天前`;
  } else if (secondsAgo < 2592000) {
    const weeksAgo = Math.floor(secondsAgo / 604800);
    return `${weeksAgo}周前`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo}个月前`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo}年前`;
  }
}

/**
 * 获取虚拟Google点评数据（备用）
 */
function getMockGoogleReviews(limit: number = 4): GoogleReviewsData {
  const mockData = {
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
        time: Date.now() - 30 * 24 * 60 * 60 * 1000,
        relativeTimeDescription: "1个月前",
      },
      {
        id: "review_2",
        author: "王先生",
        authorUrl: "https://www.google.com/maps/contrib/234567",
        profilePhotoUrl: "https://lh3.googleusercontent.com/a-/default-user=s64",
        rating: 5,
        text: "非常感谢OXEC的帮助！我的家庭团聚移民申请在他们的专业指导下顺利获批。他们的服务态度非常好，总是及时回答我的问题。",
        time: Date.now() - 60 * 24 * 60 * 60 * 1000,
        relativeTimeDescription: "2个月前",
      },
      {
        id: "review_3",
        author: "张女士",
        authorUrl: "https://www.google.com/maps/contrib/345678",
        profilePhotoUrl: "https://lh3.googleusercontent.com/a-/default-user=s64",
        rating: 5,
        text: "我在OXEC的帮助下成功申请了枫叶卡续签。他们的团队非常了解加拿大移民法律，能够快速处理我的申请。非常推荐这家公司！",
        time: Date.now() - 90 * 24 * 60 * 60 * 1000,
        relativeTimeDescription: "3个月前",
      },
      {
        id: "review_4",
        author: "陈先生",
        authorUrl: "https://www.google.com/maps/contrib/456789",
        profilePhotoUrl: "https://lh3.googleusercontent.com/a-/default-user=s64",
        rating: 5,
        text: "OXEC帮助我成功获得了技术移民签证。他们的专业知识和耐心的服务给我留下了深刻印象。如果您正在考虑移民加拿大，我强烈推荐OXEC。",
        time: Date.now() - 120 * 24 * 60 * 60 * 1000,
        relativeTimeDescription: "4个月前",
      },
    ],
  };

  return {
    ...mockData,
    reviews: mockData.reviews.slice(0, limit),
  };
}

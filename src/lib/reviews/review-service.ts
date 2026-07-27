export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface RatingSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>; // { 5: 12, 4: 3, 3: 1, 2: 0, 1: 0 }
}

export function calculateRatingSummary(reviews: Review[]): RatingSummary {
  if (reviews.length === 0) {
    return {
      averageRating: 5.0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalSum = 0;

  reviews.forEach((r) => {
    totalSum += r.rating;
    distribution[r.rating] = (distribution[r.rating] || 0) + 1;
  });

  const average = Math.round((totalSum / reviews.length) * 10) / 10;

  return {
    averageRating: average,
    totalReviews: reviews.length,
    ratingDistribution: distribution,
  };
}

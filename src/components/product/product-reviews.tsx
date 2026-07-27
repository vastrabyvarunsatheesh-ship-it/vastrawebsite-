"use client";

import * as React from "react";
import { Star, ThumbsUp, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Review, calculateRatingSummary } from "@/lib/reviews/review-service";
import { useToast } from "../ui/toast";

const MOCK_REVIEWS: Review[] = [
  {
    id: "rev_1",
    productId: "prod_kanjeevaram_1",
    customerName: "Ananya Iyer",
    rating: 5,
    title: "Exquisite Mulberry Silk & Real Zari Finish!",
    comment: "The Kanjeevaram saree exceeded my expectations. The zari shine is subtle and elegant. Wore it for my sister's wedding reception.",
    isVerifiedPurchase: true,
    helpfulCount: 14,
    createdAt: "2026-07-20T12:00:00Z",
  },
  {
    id: "rev_2",
    productId: "prod_kanjeevaram_1",
    customerName: "Priya Nair",
    rating: 5,
    title: "Unmatched Craftsmanship",
    comment: "Pure silk mark certified quality. Fast delivery to Bengaluru within 48 hours.",
    isVerifiedPurchase: true,
    helpfulCount: 8,
    createdAt: "2026-07-15T09:30:00Z",
  },
];

export const ProductReviews: React.FC<{ productId: string }> = ({ productId }) => {
  const [reviews, setReviews] = React.useState<Review[]>(MOCK_REVIEWS);
  const [newRating, setNewRating] = React.useState(5);
  const [newTitle, setNewTitle] = React.useState("");
  const [newComment, setNewComment] = React.useState("");
  const { toast } = useToast();

  const summary = calculateRatingSummary(reviews);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newComment) return;

    const created: Review = {
      id: `rev_${Date.now()}`,
      productId,
      customerName: "Varun Satheesh",
      rating: newRating,
      title: newTitle,
      comment: newComment,
      isVerifiedPurchase: true,
      helpfulCount: 0,
      createdAt: new Date().toISOString(),
    };

    setReviews([created, ...reviews]);
    setNewTitle("");
    setNewComment("");
    toast("Review Submitted", "Thank you for sharing your experience!", "success");
  };

  return (
    <div className="space-y-8 text-left">
      {/* Rating Summary Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-obsidian/10 pb-6">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-obsidian uppercase">
            Client Reflections & Ratings
          </h3>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex text-gold-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-400" />
              ))}
            </div>
            <span className="font-serif text-sm font-bold text-obsidian">
              {summary.averageRating} out of 5
            </span>
            <span className="text-xs text-obsidian/50">({summary.totalReviews} verified reviews)</span>
          </div>
        </div>
      </div>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmitReview} className="border border-obsidian/10 bg-ivory-warm p-6 space-y-4">
        <h4 className="font-serif text-sm font-semibold text-obsidian uppercase">Write a Review</h4>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-obsidian/70">Your Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setNewRating(star)}
              className="p-1 text-gold-400 focus:outline-none"
            >
              <Star className={`h-5 w-5 ${star <= newRating ? "fill-gold-400" : "text-obsidian/30"}`} />
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Review Title (e.g. Magnificent Silk Texture)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full border border-obsidian/20 bg-ivory p-2.5 text-xs text-obsidian rounded focus:outline-none"
          required
        />
        <textarea
          placeholder="Share details about the fabric feel, drape, color accuracy..."
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border border-obsidian/20 bg-ivory p-2.5 text-xs text-obsidian rounded focus:outline-none"
          required
        />
        <Button type="submit" variant="gold" size="sm">
          Submit Review
        </Button>
      </form>

      {/* Review List */}
      <div className="divide-y divide-obsidian/10">
        {reviews.map((rev) => (
          <div key={rev.id} className="py-6 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-serif text-sm font-semibold text-obsidian">{rev.customerName}</span>
                  {rev.isVerifiedPurchase && (
                    <span className="flex items-center text-[10px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 border border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified Buyer
                    </span>
                  )}
                </div>
                <div className="flex text-gold-400 mt-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-400" />
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-obsidian/40">
                {new Date(rev.createdAt).toLocaleDateString("en-IN")}
              </span>
            </div>
            <h5 className="font-serif text-xs font-semibold text-obsidian">{rev.title}</h5>
            <p className="text-xs text-obsidian/80 leading-relaxed font-sans">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

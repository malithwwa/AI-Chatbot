import type { Review } from '../generated/prisma/client';
import { prisma } from '../index';
import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
   getReviews: async (productId: number): Promise<Review[]> => {
      return reviewRepository.getReviews(productId);
   },
   summarizeReviews: async (productId: number): Promise<string> => {
      const reviews = reviewRepository.getReviews(productId, 10);
      const joinedReviews = (await reviews).map((r) => r.content).join('\n\n');
      const summary = 'lorem summary';
      return summary;
   },
};

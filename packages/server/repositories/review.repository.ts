import { prisma } from '..';
import type { Review } from '../generated/prisma/client';

export const reviewRepository = {
   getReviews: async (productId: number, limit?: number): Promise<Review[]> => {
      return await prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   },
};

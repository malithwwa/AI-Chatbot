import dayjs from 'dayjs';
import { prisma } from '..';
import type { Review, Summary } from '../generated/prisma/client';

export const reviewRepository = {
   getReviews: async (productId: number, limit?: number): Promise<Review[]> => {
      return await prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   },
   storeReviewSummary: async (productId: number, summary: string) => {
      const now = new Date();
      const expiresAt = dayjs().add(7, 'days').toDate();

      const data = {
         content: summary,
         expiresAt,
         generatedAt: now,
         productId,
      };

      await prisma.summary.upsert({
         where: {
            productId,
         },
         create: data,
         update: data,
      });
   },

   getReviewSummary: async (productId: number): Promise<string | null> => {
      const summary = await prisma.summary.findFirst({
         where: { 
            AND: [
               { productId },
               { expiresAt: { gt: new Date() } }
            ]
          },
      });
      return summary ? summary.content : null;
   }
     
};

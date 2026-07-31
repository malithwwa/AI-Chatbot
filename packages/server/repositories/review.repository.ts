import { prisma } from "..";
import type { Review } from "../generated/prisma/client";

export const reviewRepository = {
    getReviews: async(productId: number): Promise<Review[]>=> {
        return await prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
      });
    }
}
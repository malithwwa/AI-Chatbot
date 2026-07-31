import type { Review } from "../generated/prisma/client";
import { prisma } from "../index";
import { reviewRepository } from "../repositories/review.repository";

export const reviewService = {
    getReviews: async(productId: number): Promise<Review[]>=> {
       return reviewRepository.getReviews(productId)
    }
}
import OpenAI from 'openai';
import type { Review } from '../generated/prisma/client';
import { prisma } from '../index';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';

export const reviewService = {
   getReviews: async (productId: number): Promise<Review[]> => {
      return reviewRepository.getReviews(productId);
   },
   summarizeReviews: async (productId: number): Promise<string> => {
      const reviews = reviewRepository.getReviews(productId, 10);
      const joinedReviews = (await reviews).map((r) => r.content).join('\n\n');
      const prompt = `
      Summarize  the follwing customer reviews into a short paragraph highlighting key themes, both positive and negative:

      ${joinedReviews}
      `;

      const response = await llmClient.generateText({prompt, maxTokens:500, temperature:0.2})
      return response.text;
   },
};



import  fs  from 'node:fs';
import OpenAI from 'openai';
import type { Review } from '../generated/prisma/client';
import { prisma } from '../index';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const promptPath = path.join(__dirname, '../prompts/summarize-review.txt');
const reviewPrompt = fs.readFileSync(promptPath, 'utf-8');

// const parkInfo = fs.readFileSync(
//    path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
//    'utf-8'
// );


export const reviewService = {
   getReviews: async (productId: number): Promise<Review[]> => {
      return reviewRepository.getReviews(productId);
   },
   summarizeReviews: async (productId: number): Promise<string> => {
      const reviews = reviewRepository.getReviews(productId, 10);
      const joinedReviews = (await reviews).map((r) => r.content).join('\n\n');
      const prompt = reviewPrompt.replace('{{reviews}}', joinedReviews);

      const response = await llmClient.generateText({prompt, maxTokens:500, temperature:0.2})
      return response.text;
   },
};



import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
   getReviews: async (req: Request, res: Response) => {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid Product Id' });
         return;
      }
      const product = await productRepository.getProductById(productId);

      if (!product) {
         res.status(404).json({ error: 'Product does not exist' });
         return;
      }

      const reviews = await reviewRepository.getReviews(productId);
      const summary = await reviewRepository.getReviewSummary(productId);
      res.send({ reviews, summary });
   },

   summarizeReviews: async (req: Request, res: Response) => {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid Product Id' });
         return;
      }

      const product = await productRepository.getProductById(productId);
      if (!product) {
         res.status(404).json({ error: 'Product not found' });
         return;
      }

      const reviews = await reviewRepository.getReviews(productId, 1);
      if (!reviews.length) {
         res.status(400).json({ error: 'No reviews found for this product' });
         return;
      }
      const summary = await reviewService.summarizeReviews(productId);
      res.json({ summary });
   },
};

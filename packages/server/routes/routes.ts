import express, { type Request, type Response } from 'express';
import { chatController } from '../controllers/chat.controller.js';
import { reviewController } from '../controllers/review.controller.js';


const router = express.Router();
router.get('/', (req: Request, res: Response) => {
   res.send('Hello, World!');
});

router.get('/hello', (req: Request, res: Response) => {
   res.send({ message: 'Hello, World!' });
});

router.post('/chat', chatController.sendMessage);

router.get('/products/:id/reviews', reviewController.getReviews)

export default router;
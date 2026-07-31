import express, { type Request, type Response } from 'express';
import { chatController } from '../controllers/chat.controller.js';
import { prisma } from '../index.js';


const router = express.Router();
router.get('/', (req: Request, res: Response) => {
   res.send('Hello, World!');
});

router.get('/hello', (req: Request, res: Response) => {
   res.send({ message: 'Hello, World!' });
});

router.post('/chat', chatController.sendMessage);

router.get('/products/:id/reviews', async(req: Request, res: Response) => {

   const productId = Number(req.params.id);

   if (isNaN(productId)){
      res.status(400).json({error:'Invalid Product Id'})
      return;
   }

   // dont need to write raw sql, instead object of our application
   const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc'}
   });

   res.send({ data: reviews });
})

export default router;
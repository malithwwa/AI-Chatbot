import z from 'zod';
import { chatService } from '../services/chat.service.js';
import type { Request, Response } from 'express';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, { message: 'Prompt cannot be empty' })
      .max(1000, { message: 'Prompt cannot exceed 1000 characters' }),
});

export const chatController = {
   sendMessage: async (req: Request, res: Response) => {
      const parsedResult = chatSchema.safeParse(req.body);
      if (!parsedResult.success) {
         return res.status(400).json(parsedResult.error.format());
      }
      try {
         const { prompt } = req.body;
         console.log(prompt)
         const response = await chatService.sendMessage(prompt);

         res.json({
            message: response.message,
         });
      } catch (error) {
         const message = error instanceof Error
            ? error.message
            : 'An error occurred while processing your request.';
         console.log(error)
         res.status(500).json({
            error: message,
            details: error,
         });
      }
   },
};

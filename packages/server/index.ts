import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello, World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.send({ message: 'Hello, World!' });
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

const conversations = new Map<string, string>();

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, { message: 'Prompt cannot be empty' })
      .max(1000, { message: 'Prompt cannot exceed 1000 characters' }),
   conversationId: z.string().uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const parsedResult = chatSchema.safeParse(req.body);
   if (!parsedResult.success) {
      return res.status(400).json( parsedResult.error.format());
   }
   const { prompt, conversationId } = req.body;
   try {
      const client = new OpenAI({
         baseURL: 'https://openrouter.ai/api/v1',
         apiKey: process.env.OPENROUTER_API_KEY,
      });

      // First API call with reasoning
      const response = await client.responses.create({
         model: 'openai/gpt-oss-20b:free',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id: conversations.get(conversationId),
      });
      conversations.set(conversationId, response.id);

      res.json({
         message: response.output_text,
      });
   } catch (error) {
      console.error('Error fetching chat completion:', error);
   }
});

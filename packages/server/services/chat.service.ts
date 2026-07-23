import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

type ChatService = {
   id: string;
   message: string;
};

const client = new OpenAI({
   baseURL: 'https://openrouter.ai/api/v1',
   apiKey: process.env.OPENROUTER_API_KEY,
});

export const chatService = {
   sendMessage: async (prompt: string, conversationId: string):Promise<ChatService> => {
      const response = await client.responses.create({
         model: 'openai/gpt-oss-20b:free',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 200,
         // previous_response_id: conversationRepository.getLastResponseId(conversationId),
      });
      conversationRepository.setLastResponseId(conversationId, response.id);
      return {
            id: response.id,
            message: response.output_text,
      };
   },
};

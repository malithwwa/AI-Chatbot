import fs from 'node:fs';
import path from 'node:path';
import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';
// import template from '../prompts/chatbot.txt'

type ChatResponse = {
   id: string;
   message: string;
};

const promptPath = path.join(__dirname, '../prompts/chatbot.txt');

const chatbotPrompt = fs.readFileSync(promptPath, 'utf-8');

const client = new OpenAI({
   baseURL: 'https://openrouter.ai/api/v1',
   apiKey: process.env.OPENROUTER_API_KEY,
});

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = chatbotPrompt.replace('{{parkInfo}}', parkInfo);

export const chatService = {
   sendMessage: async (
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> => {
      const response = await client.responses.create({
         model: 'openai/gpt-oss-20b:free',
         instructions,
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

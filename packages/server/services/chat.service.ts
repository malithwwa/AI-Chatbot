import fs from 'node:fs';
import path from 'node:path';
import { conversationRepository } from '../repositories/conversation.repository.js';
// import template from '../prompts/chatbot.txt'
import { fileURLToPath } from 'node:url';
import { llmClient } from '../llm/client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ChatResponse = {
   id: string;
   message: string;
};

const promptPath = path.join(__dirname, '../prompts/chatbot.txt');

const chatbotPrompt = fs.readFileSync(promptPath, 'utf-8');

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
      const response = await llmClient.generateText({
         prompt,
         instructions,
         temperature: 0.2,
         maxTokens:200,
      });
      return {
         id: response.id,
         message: response.text,
      };
   },
};

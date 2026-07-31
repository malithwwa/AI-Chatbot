import OpenAI from 'openai';

const client = new OpenAI({
   baseURL: 'https://openrouter.ai/api/v1',
   apiKey: process.env.OPENROUTER_API_KEY,
});

type GenerateTextOptions = {
   model?: string;
   prompt: string;
   instructions?:string;
   temperature?: number;
   maxTokens?: number;
   previousResponseId?: string
};

type GenerateTextResult = {
    id: string;
    text: string
}

export const llmClient = {
   generateText: async ({
      model = 'openai/gpt-oss-20b:free',
      prompt,
      instructions,
      temperature = 0.2,
      maxTokens = 300,
      previousResponseId   
   }: GenerateTextOptions): Promise<GenerateTextResult> => {
      const response = await client.responses.create({
         model,
         instructions,
         input: prompt,
         temperature,
         max_output_tokens: maxTokens,
         previous_response_id: previousResponseId
      });
      return {id: response.id, text: response.output_text};
   },
};

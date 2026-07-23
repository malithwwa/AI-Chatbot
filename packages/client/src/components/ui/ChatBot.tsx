import { Button } from './button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: string;
};

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const { register, handleSubmit, reset, formState } = useForm<FormData>({});
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({ prompt }: FormData) => {
      setMessages((prevMessages) => [
         { ...prevMessages, content: prompt, role: 'user' },
      ]);
      setIsBotTyping(true);
      reset();
      console.log(prompt, conversationId.current);
      try {
         const { data } = await axios.post<ChatResponse>(
            'http://localhost:3000/api/chat',
            { prompt, conversationId: conversationId.current }
         );
         setMessages((prevMessages) => [
            ...prevMessages,
            { content: data.message, role: 'bot' },
         ]);
         setIsBotTyping(false);

      } catch (error) {
         console.error(error);
      }
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <div>
         <div className="flex flex-col gap-3 mb-10">
            {messages.map((message, index) => (
               <div
                  key={index}
                  className={`px-2 py-1 rounded-xl ${message.role === 'user' ? 
                    'bg-blue-600 text-white self-end' : 
                    'bg-gray-100 text-black self-start'}`}
               >
                <ReactMarkdown>{message.content}</ReactMarkdown>
               </div>
            ))}
              {isBotTyping && (
                     <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
                       <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse"/>
                       <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]"/>
                       <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s]"/>
                     </div>
                  )}
         </div>
         <form
            // eslint-disable-next-line react-hooks/refs
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            className="flex flex-col gap-2 items-end border-2 border-gray-300 p-4 rounded-3xl"
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (value) => value.trim().length > 0,
               })}
               placeholder="Ask anything"
               maxLength={1000}
               className="w-full border-0 focus:outline-0 resize-none"
            />
            <Button
               disabled={!formState.isValid}
               type="submit"
               className="rounded-full w-9 h-9"
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatBot;

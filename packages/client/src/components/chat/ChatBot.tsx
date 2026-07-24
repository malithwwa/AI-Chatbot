import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TypingIndicator from './TypingIndicator';

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
   const lastMessageRef = useRef<HTMLDivElement | null>(null);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const { register, handleSubmit, reset, formState } = useForm<FormData>({});
   const conversationId = useRef(crypto.randomUUID());

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({
         behavior: 'smooth',
         block: 'end',
      });
   }, [messages]);

   const onSubmit = async ({ prompt }: FormData) => {
      try {
         setMessages((prevMessages) => [
            ...prevMessages,
            { content: prompt, role: 'user' },
         ]);
         setIsBotTyping(true);
         setError(null);
         reset({ prompt: '' });

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prevMessages) => [
            ...prevMessages,
            { content: data.message, role: 'bot' },
         ]);
         setIsBotTyping(false);
      } catch (error) {
         console.error(error);
         setError('Something went wrong, Try again!');
         setIsBotTyping(false);
      }
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   const onCopyMessage = (e: React.ClipboardEvent): void => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
            {messages.map((message, index) => (
               <div
                  key={index}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  onCopy={onCopyMessage}
                  className={`px-2 py-1 rounded-xl ${
                     message.role === 'user'
                        ? 'bg-blue-600 text-white self-end'
                        : 'bg-gray-100 text-black self-start'
                  }`}
               >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
               </div>
            ))}
            {isBotTyping && (
               <TypingIndicator />
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
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
               autoFocus
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

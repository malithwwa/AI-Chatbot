import { Button } from './button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef, useState } from 'react';

type FormData = {
   prompt: string;
};

type ChatResponse = {
  message: string;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<string[]>([]);
   const { register, handleSubmit, reset, formState } = useForm<FormData>({});
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({prompt}: FormData)=> {
    setMessages(prevMessages => [...prevMessages, prompt]);
      reset();
      console.log(prompt, conversationId.current);
      try {
         const {data} = await axios.post<ChatResponse>('http://localhost:3000/api/chat', { prompt, conversationId: conversationId.current });
         setMessages(prevMessages => [...prevMessages, data.message]);
      }
      catch (error) {
         console.error(error);
      }
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
               e.preventDefault();
               handleSubmit(onSubmit)();
            }
         } 
  
   return (
      <div>
        <div>
          {messages.map((message, index) => (
            <div key={index} className={`p-2 my-2 rounded-lg ${index % 2 === 0 ? 'bg-blue-200 self-start' : 'bg-green-200 self-end'}`}>
              {message}
            </div>
          ))}
        </div>
        <form
           // eslint-disable-next-line react-hooks/refs
           onSubmit={handleSubmit(onSubmit)}
           onKeyDown={onKeyDown}
           className="flex flex-col gap-2 items-end border-2 border-gray-300 p-4 rounded-3xl"
        >
           <textarea
              {...register('prompt', { required: true, validate: (value) => value.trim().length > 0 })}
              placeholder="Ask anything"
              maxLength={1000}
              className="w-full border-0 focus:outline-0 resize-none"
           />
           <Button disabled={!formState.isValid} type="submit" className="rounded-full w-9 h-9">
              <FaArrowUp />
           </Button>
        </form>
      </div>
   );
};

export default ChatBot;

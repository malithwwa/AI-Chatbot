import { Button } from './button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef } from 'react';

type FormData = {
   prompt: string;
};
const ChatBot = () => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>({});
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({prompt}: FormData)=> {
      reset();
      console.log(prompt, conversationId.current);
      try {
         const {data} = await axios.post('http://localhost:3000/api/chat', { prompt, conversationId: conversationId.current })
         console.log(data)
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
   );
};

export default ChatBot;

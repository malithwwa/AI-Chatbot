import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { LuSend } from 'react-icons/lu';

export type ChatFormData = {
   prompt: string;
};

type Props = {
   onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>(
      {}
   );

   const submit = handleSubmit((data) => {
      reset({ prompt: '' });
      onSubmit(data);
   });

   const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         submit();
      }
   };

   return (
      
          <div className="shrink-0 bg-white px-3 pb-3 sm:px-4">
        <form
         onSubmit={submit}
         onKeyDown={handleKeyDown}
         className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition"
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (value) => value.trim().length > 0,
            })}
            autoFocus
            placeholder="Ask anything"
            maxLength={1000}
            className="max-h-24 flex-1 resize-none bg-transparent text-[13.5px] leading-relaxed text-slate-700 placeholder:text-slate-400 focus:outline-none"
         />
         <Button
            disabled={!formState.isValid}
            type="submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-sm transition disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:brightness-110 enabled:active:scale-95"
         >
            <LuSend size={15} strokeWidth={2.25}/>
         </Button>
          </form>
        
          <p className="mt-1.5 text-center text-[10.5px] text-slate-400">
            Wonder World Assistant may not always be accurate.
          </p>
        </div>


   );
};

export default ChatInput;

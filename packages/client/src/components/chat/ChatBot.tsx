import notificationSound from '@/assets/sounds/notification.mp3';
import popSound from '@/assets/sounds/pop.mp3';
import { BASE_URL } from '@/config/api';
import axios from 'axios';
import { useRef, useState } from 'react';
import { FaHandSparkles, FaMapPin } from 'react-icons/fa';
import ChatInput, { type ChatFormData } from './ChatInput';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';
import QuickReplies from './QuickReplies';

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prevMessages) => [
            ...prevMessages,
            { content: prompt, role: 'user' },
         ]);
         setIsBotTyping(true);
         setError(null);
         popAudio.play();

         const { data } = await axios.post<ChatResponse>(
            `${BASE_URL}/api/chat`,
            {
               prompt,
               conversationId: conversationId.current,
            }
         );
         setMessages((prevMessages) => [
            ...prevMessages,
            { content: data.message, role: 'bot' },
         ]);
         notificationAudio.play();
      } catch (error) {
         console.error(error);
         setError('Something went wrong, Try again!');
      } finally {
         setIsBotTyping(false);
      }
   };

   return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-slate-50 to-sky-50 p-0 sm:p-6 font-sans">
         <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
         <div className="flex h-full w-full max-w-md flex-col overflow-hidden bg-slate-50 shadow-xl sm:h-full sm:max-h-[720px] sm:rounded-[28px] sm:border sm:border-sky-100">
            {/* Header */}
            <div className="relative flex shrink-0 items-center gap-3 bg-linear-to-r from-blue-700 via-blue-600 to-sky-600 px-4 py-4 shadow-sm sm:px-5">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] bg-size-[16px_16px]" />
               <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur">
                  <FaHandSparkles
                     size={19}
                     className="text-white"
                     strokeWidth={2}
                  />
               </div>
               <div className="relative flex-1 min-w-0">
                  <h1 className="truncate text-[15px] font-semibold tracking-tight text-white">
                     Wonder World Assistant
                  </h1>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-sky-50/90">
                     <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                     Online &middot; Ready to help
                  </div>
               </div>
               <FaMapPin
                  size={17}
                  className="relative shrink-0 text-white/70"
               />
            </div>

            {/* Messages */}
            <ChatMessages messages={messages} isBotTyping={isBotTyping} error={error}/>

            {/* Quick replies */}
           <QuickReplies onSubmit={onSubmit}/>

            {/* Input */}
            <ChatInput onSubmit={onSubmit} />
         </div>
      </div>
   );
};

export default ChatBot;

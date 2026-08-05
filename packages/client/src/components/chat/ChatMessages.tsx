import { useEffect, useRef } from 'react';
import BotBubble from './BotBubble';
import TypingBubble from './TypingBubble';
import UserBubble from './UserBubble';

export type Message = {
   content: string;
   role: 'user' | 'bot';
};

type Props = {
   messages: Message[];
   isBotTyping: boolean;
   error: string | null;
};

const ChatMessages = ({ messages, isBotTyping, error }: Props) => {
const scrollRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isBotTyping]);

   const onCopyMessage = (e: React.ClipboardEvent): void => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };

   return (
      <div
         className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-5 sm:px-5"
         style={{ scrollbarWidth: 'thin' }}
         ref={scrollRef}
      >
         {messages.map((message, index) => (
            <div
               key={index}
               onCopy={onCopyMessage}
            >
               {message.role === 'user' ? (
                  <UserBubble message={message.content} />
               ) : (
                  <BotBubble message={message.content} />
               )}
            </div>
         ))}
         {isBotTyping && <TypingBubble />}
         {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
   );
};

export default ChatMessages;

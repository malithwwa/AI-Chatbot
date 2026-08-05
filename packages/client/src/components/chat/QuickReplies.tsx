import { FaClock, FaHotel, FaMapPin, FaUtensils } from 'react-icons/fa';
import type { ChatFormData } from './ChatInput';

const quickReplies = [
  { label: "Hotel", icon: FaHotel, prompt: "Tell me about hotels near Wonder World" },
  { label: "Restaurant", icon: FaUtensils, prompt: "What restaurants are inside the park?" },
  { label: "Open Hours", icon: FaClock, prompt: "What are today's opening hours?" },
  { label: "Directions", icon: FaMapPin, prompt: "How do I get to Wonder World?" },
];

type Props = {
  onSubmit: (prompt: ChatFormData) => void;
};
const QuickReplies = ({ onSubmit }: Props) => {
  return (
    <div className="shrink-0 border-t border-sky-100 bg-white px-3 pt-2.5 pb-1 sm:px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {quickReplies.map(({ label, icon: Icon, prompt }) => (
              <button
                key={label}
                onClick={() => onSubmit({ prompt })}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[12px] font-medium text-blue-700 transition hover:bg-sky-100 hover:border-sky-300 active:scale-95"
              >
                <Icon size={13} strokeWidth={2.25} />
                {label}
              </button>
            ))}
          </div>
        </div>
  )
}

export default QuickReplies
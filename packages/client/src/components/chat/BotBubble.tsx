import Avatar from "./Avatar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  message: string;
};

export default function BotBubble({ message }: Props) {
  return (
    <div className="flex items-start gap-2.5 animate-[fadeIn_0.35s_ease-out]">
      <Avatar />
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="rounded-2xl rounded-tl-sm border border-sky-100 bg-white px-4 py-3 shadow-sm">
          <p className="text-[13.5px] leading-relaxed text-slate-700 whitespace-pre-line">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
          </p>
        </div>
      </div>
    </div>
  );
}
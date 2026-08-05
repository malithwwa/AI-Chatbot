
export default function UserBubble({ message }: { message: string }) {
  return (
    <div className="flex justify-end animate-[fadeIn_0.35s_ease-out]">
      <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-sm bg-linear-to-br from-blue-600 to-sky-600 px-4 py-2.5 text-[13.5px] leading-relaxed text-white shadow-sm">
        {message}
      </div>
    </div>
  );
}
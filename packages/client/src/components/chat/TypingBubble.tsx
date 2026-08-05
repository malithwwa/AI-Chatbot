import Avatar from "./Avatar";

export default function TypingBubble() {
  return (
    <div className="flex items-start gap-2.5">
      <Avatar />
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-sky-100 bg-white px-4 py-3.5 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
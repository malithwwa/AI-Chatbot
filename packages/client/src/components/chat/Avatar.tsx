import { LuSparkles } from "react-icons/lu";

export default function Avatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-blue-600 text-white shadow-sm ring-2 ring-white">
      <LuSparkles size={15} strokeWidth={2.25} />
    </div>
  );
}
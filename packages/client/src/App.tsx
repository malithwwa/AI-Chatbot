import ChatBot from './components/chat/ChatBot';

function App() {
   return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-linear-to-b from-sky-50 via-slate-50 to-sky-50 p-0 sm:p-6 font-sans">
         <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
         <ChatBot />
      </div>
   );
}
export default App;

import ChatBot from './components/chat/ChatBot';

function App() {
   return (
       <main className="bg-linear-to-l from-gray-200 via-blue-200 to-stone-100 min-h-screen w-full flex items-center justify-center p-2">
      <div className="bg-[url('/images/chat-background.jpg')] bg-cover bg-center p-4 h-[97vh] w-full bg-yellow-200 max-w-4xl mx-auto my-auto border-4 border-blue-300 rounded-3xl">
         <ChatBot />
      </div>
      </main>
   );
}
export default App;

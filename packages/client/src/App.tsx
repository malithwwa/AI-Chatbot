import { useEffect, useState } from 'react';


function App() {
 const [message, setMessage] = useState<string>("");

 useEffect(() => {
   fetch("/api/hello")
     .then((response) => response.json())
     .then((data) => setMessage(data.message))
 }, []);

 return (
   <div>
     <p className='font-bold p-4 text-3xl'>{message}</p>
   </div>
 );
}
export default App

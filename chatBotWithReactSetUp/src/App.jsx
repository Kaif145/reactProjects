import { useState ,useEffect} from "react";

import { ChatInput } from "./component/ChatInput.jsx";
import { ChatMessagesList } from "./component/ChatMessagesList.jsx";

import "./App.css";


function App() {
  const [chatMessages, setChatMessages] = useState(()=>{
    const storedMessages = localStorage.getItem('chatMessages');
    if(storedMessages){
      return JSON.parse(storedMessages);
    }
    return [];
  });
  //here we set the chatMessages state to the value stored in localStorage if it exists, otherwise we set it to an empty array. This way, when the user refreshes the page, the chat messages will persist.
   useEffect(()=>{
          localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
        }, [chatMessages]);

  const [isBotTyping, setIsBotTyping] = useState(false);
  

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h2>AI Assistant</h2>
        <p>Ask me anything</p>
      </div>

      <ChatMessagesList chatMessages={chatMessages} isBotTyping={isBotTyping} />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isBotTyping={isBotTyping}
        setIsBotTyping={setIsBotTyping}
      />
    </div>
  );
}

export default App;

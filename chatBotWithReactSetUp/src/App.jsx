import { useState } from "react";

import { ChatInput } from "./component/ChatInput.jsx";
import { ChatMessagesList } from "./component/ChatMessagesList.jsx";

import "./App.css";
import dayjs from 'dayjs'
console.log(dayjs().valueOf());
function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  //its destructuring array in state
  //  const chatMessages = array[0]; //its our inital valu
  //  const setChatMessages = array[1];//its out update valu

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

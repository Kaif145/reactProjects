import { useState,useEffect,useRef } from 'react' ;

import {Chatbot} from 'supersimpledev'

import botimg from './assets/bot.webp'
import userimg from './assets/OIP.webp'

import './App.css'

        function CharInput({
        chatMessages,
        setChatMessages,
        // isBotTyping,
        setIsBotTyping,
      }) {
        const [inputValue, setInputValue] = useState("");

        function saveInputValue(event) {
          setInputValue(event.target.value);
        }

        function sendMessage() {
          if (!inputValue.trim()) return;

          setChatMessages([
            ...chatMessages,
            {
              message: inputValue,
              sender: "user",
              id: crypto.randomUUID(),
            },
          ]);

          setIsBotTyping(true);

          const response = Chatbot.getResponse(inputValue);
         

          setTimeout(() => {
            setChatMessages((prevMessages) => [
              ...prevMessages,
              {
                message: response,
                sender: "bot",
                id: crypto.randomUUID(),
              },
            ]);
            setInputValue("");
            setIsBotTyping(false);
          }, 2000);
        }

        function handleKeyDown(event) {
          if (event.key === "Enter") {
            sendMessage();
          }
        }
        function handleEsc(event) {
          if (event.key === "Escape") {
            setInputValue("");
          }
        }

        return (
          <div className="chat-input-area">
            <input
              className="input-field"
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={saveInputValue}
              onKeyDown={handleKeyDown}
              onKeyUp={handleEsc}
            ></input>
            <button className="send-button" onClick={sendMessage}>
              Send
            </button>
          </div>
        );
      }

      function ChatMessages({ message, sender }) {
        return (
          <div
            className={`chat-message ${sender === "bot" ? "bot-message" : "user-message"}`}
          >
            {sender === "bot" && <img src={botimg} alt="Bot" width="32" />}
            {message}
            {sender === "user" && <img src={userimg} alt="User" width="32" />}
          </div>
        );
      }

      function ChatMessagesList({ chatMessages, isBotTyping }) {
       const chatMessagesListRef = useRef(null);
          useEffect(()=>{
          const chatMessagesList = chatMessagesListRef.current;
          chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
        }, [chatMessages]);

        return (
          <div className="chat-messages-list" ref={chatMessagesListRef}>
            {chatMessages.length === 0 && (
              <div style={{ textAlign: "center", color: "#9ca3af" }}>
                No messages yet. Start the conversation!  
              </div>
            )}
            {chatMessages.map((chatMessage) => {
              
              return (
                <ChatMessages
                  key={chatMessage.id}
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                />
              );
            })}
            {isBotTyping && (
              <div className="typing-indicator">
                <img src={botimg} alt="Bot" width="24" />
                <div className="typing-text">
                  <span>Bot is typing</span>
                  <span className="typing-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      }

      function App() {
        const [chatMessages, setChatMessages] =useState([]);
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

            <ChatMessagesList
              chatMessages={chatMessages}
              isBotTyping={isBotTyping}
            />

            <CharInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              isBotTyping={isBotTyping}
              setIsBotTyping={setIsBotTyping}
            />
          </div>
        );
      }

export default App

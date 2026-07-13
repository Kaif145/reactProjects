import {useEffect, useRef} from "react";
import { ChatMessages } from "./ChatMessages.jsx";
import botimg from "../assets/bot.webp";

export function ChatMessagesList({ chatMessages, isBotTyping }) {
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
                  time={chatMessage.time}
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

export default ChatMessagesList;
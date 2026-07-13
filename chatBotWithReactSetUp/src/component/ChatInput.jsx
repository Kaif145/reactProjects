import { useState } from "react";
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs'
console.log(dayjs().valueOf());
export function ChatInput({
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
          const time = dayjs().valueOf();
          setChatMessages([
            ...chatMessages,
            {
              message: inputValue,
              sender: "user",
              id: crypto.randomUUID(),
              time: dayjs(time).format('h:mma'),
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
                time: dayjs().format('h:mma'),
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


export default ChatInput;
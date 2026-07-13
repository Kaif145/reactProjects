import botimg from '../assets/bot.webp'
import userimg from '../assets/OIP.webp'

export function ChatMessages({ message, sender, time }) {
        return (
          <div
            className={`chat-message ${sender === "bot" ? "bot-message" : "user-message"}`}
          >
            {sender === "bot" && <img src={botimg} alt="Bot" width="32" />}
            {message}
            {sender === "user" && <img src={userimg} alt="User" width="32" />}
            <span className="message-time">{time}</span>
          </div>
        );
      }
         

export default ChatMessages;
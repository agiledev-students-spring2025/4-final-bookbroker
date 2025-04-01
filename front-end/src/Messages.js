import './Messages.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const fakeMessages = [
            { sender: "Alice", receiver: "You", content: "See you tomorrow!", timestamp: "2025-04-01T12:00:00Z" },
            { sender: "Bob", receiver: "You", content: "Let's meet at 5 PM.", timestamp: "2025-04-01T10:30:00Z" },
            { sender: "You", receiver: "Alice", content: "Sounds good!", timestamp: "2025-04-01T12:10:00Z" },
            { sender: "Charlie", receiver: "You", content: "I have that !asdfasdfsdfasdfassdfasdfsdasdfasdfasdfs", timestamp: "2025-03-31T15:45:00Z" },
            ];
            setMessages(fakeMessages);
        };
  
        fetchMessages();
    }, []); // Empty dependency array ensures this runs only once

    // Group messages by user and get the last message sent
    // Change the user to be whoever is not the client so we can create a link dynamically
    const lastMessages = messages.reduce((acc, msg) => {
      const otherUser = msg.sender === "You" ? msg.receiver : msg.sender;
  
      if (!acc[otherUser] || new Date(msg.timestamp) > new Date(acc[otherUser].timestamp)) {
        acc[otherUser] = msg;
      }
      
  
      return acc;
    }, {});
  
    return (
      <main>
        <h2 class='font-bold text-center p-4'>Messages</h2>

        <ul class='space-y-4'>
        {Object.entries(lastMessages).map(([user, message]) => (
            <li key={user} class='border-solid border-2 border-black p-2 '>
              <Link to={`/messages/${user}`}>
                {/* Div around all content used to allign time stamp to the right */}
                <div class='flex w-full justify-between'>

                    {/* Div box for pfp, username, and text*/}
                    <div className="flex items-center space-x-3">
                        <img className="w-10 h-10 bg-gray-300" alt="Profile" />
                        <p className="font-bold text-brown">{user}</p>


                        {/* Trunkate text to ensure the box doesn't break */}
                        <div className="w-[140px] overflow-hidden text-center">
                            <p className="truncate max-w-[140px] text-brown">{message.content}</p>
                        </div>
                    </div>

                    {/* Include timestamp of message*/}
                    <p class='text-sm text-orange absolute right-2'> | {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
};


export default Messages;
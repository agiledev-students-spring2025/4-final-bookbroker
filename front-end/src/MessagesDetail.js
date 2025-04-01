import './Messages.css'
import { useState, useEffect, } from 'react';
import { Link, useParams } from 'react-router-dom';

const MessagesDetail = () => {
    const { user } = useParams();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fake fetch
        // This will be all messages sent between this client and the other user
        const fetchMessages = async () => {
            const fakeMessages = [
            { sender: "Alice", content: "Hi, I'd like this book!", timestamp: "2025-04-01T12:00:00Z" },
            { sender: "You", content: "Let's meet at 5 PM.", timestamp: "2025-04-01T10:30:00Z" },
            { sender: "Alice", content: "Sounds good!", timestamp: "2025-04-01T12:10:00Z" },
            ];
            setMessages(fakeMessages);
        };
  
        fetchMessages();
    }, []);

    return (
        <main>
            <div class='font-bold text-center p-4'>{user}</div>

            <ul class='space-y-4'>
                {messages.map((message, index) => (
                    
                    <li key={index} class='border-solid border-2 border-black p-2 '>
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

                    </li>
                ))}
            </ul>

        </main>
    );
}

export default MessagesDetail;
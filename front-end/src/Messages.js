import './Messages.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Messages = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/messages`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMessages(data)
        })
        .catch(err => {
            console.log("Failed to fetch messages:", err)
            setMessages([])
        })
    }, [])

    return (
      <main>
        <h2 class='font-bold text-center p-4'>Messages</h2>

        <ul class='space-y-4'>
        {messages.map((message, index) => (
            <li key={index} class='border-solid border-2 border-black p-2 '>
                {/* Clickable dynamic link to new page */}
                <Link to={`/messages/${message.otherUser}`}>
                    {/* Div around all content used to allign time stamp to the right */}
                    <div class='flex w-full justify-between'>

                        {/* Div box for pfp, username, and text*/}
                        <div className="flex items-center space-x-3">
                            <img className="w-10 h-10 bg-gray-300" alt="Profile" />
                            <p className="font-bold text-brown">{message.otherUser}</p>


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
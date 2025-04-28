import './Messages.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Messages = () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/messages`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
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
        <div className="titlebox mb-4">
            <h1 className="title"> Messages </h1>
        </div>

        <ul className='messages-container space-y-4'>
        {messages.map((message, index) => (
            <li key={index} className='infoContainer fade-in'>
                {/* Clickable dynamic link to new page */}
                <Link to={`/messages/${message.otherUser.id}`}>
                    {/* Div around all content used to allign time stamp to the right */}
                    <div className='flex w-full justify-between'>

                        {/* Div box for pfp, username, and text*/}
                        <div className="flex items-center space-x-3">
                            <p className="font-bold text-brown">{message.otherUser.username}</p>


                            {/* Trunkate text to ensure the box doesn't break */}
                            <div className="w-[140px] overflow-hidden text-center">
                                <p className="truncate max-w-[140px] text-brown">{message.content}</p>
                            </div>
                        </div>

                        {/* Include timestamp of message*/}
                        <p className='text-sm text-orange absolute right-2'> | {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                </Link>
            </li>
          ))}
        </ul>
      </main>
    );
};


export default Messages;
import './Messages.css'
import { useState, useEffect, } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

const MessagesDetail = () => {
    const { user } = useParams();
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/messages/${user}`,{
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
                <button className="iconButton backButton" onClick={() => navigate(-1)}>
                    <FaAngleLeft />
                </button>

                <h1 className="title"> {user} </h1>
            </div>

            <ul class='messages-container space-y-4'>
                {messages.map((message, index) => (
                    
                    <li key={index} class='infoContainer fade-in'>
                        {/* Div around all content used to allign time stamp to the right */}
                        <div class='flex w-full justify-between'>

                            {/* Div box for pfp, username, and text*/}
                            <div className="flex items-center space-x-3">
                                <img className="w-10 h-10 bg-gray-300" alt="Profile" />
                                <p className="font-bold text-brown">{message.sender}</p>


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
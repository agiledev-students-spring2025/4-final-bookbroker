import './Messages.css'
import { useState, useEffect, } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

const MessagesDetail = () => {
    const [otherUser, setOtherUser] = useState("Loading...")
    const { user } = useParams();
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [message, setMessage] = useState("")

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${user}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOtherUser(data)
            })
            .catch(err => {
                console.log("Failed to fetch user", err)
            })

        }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/messages/${user}`,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                data = data.sort((a, b) => b.timestamp - a.timestamp)
                setMessages(data)
            })
            .catch(err => {
                console.log("Failed to fetch messages:", err)
                setMessages([])
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    function handleMessageSend(e) {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/messages/${user}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ content: message })
        })    
    }

    return (
        <main>
            <div className="titlebox mb-4">
                <button className="iconButton backButton" onClick={() => navigate(-1)}>
                    <FaAngleLeft />
                </button>

                <h1 className="title"> {otherUser.username} </h1>
            </div>

            <ul class='messages-container space-y-4'>
                {messages.map((message, index) => (
                    
                    <li key={index} class='infoContainer fade-in'>
                        {/* Div around all content used to allign time stamp to the right */}
                        <div class='flex w-full justify-between'>

                            {/* Div box for pfp, username, and text*/}
                            <div className="flex items-center space-x-3">
                                <p className="font-bold text-brown">{message.sender.username}</p>


                                {/* Trunkate text to ensure the box doesn't break */}
                                <div className="text-right">
                                    <p className="text-brown">{message.content}</p>
                                </div>
                            </div>

                            {/* Include timestamp of message*/}
                            <p class='text-sm text-orange absolute right-2'> | {new Date(message.timestamp).toLocaleString()}</p>
                        </div>

                    </li>
                ))}
            </ul>
            <form onSubmit={handleMessageSend}>
                <input type="text" value={message} placeholder="Send message..." onChange={e => setMessage(e.target.value)} />
                <input type="submit" />
            </form>

        </main>
    );
}

export default MessagesDetail;
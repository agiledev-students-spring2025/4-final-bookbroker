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
                const sortedData = data.toSorted((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp)
                })
                setMessages(sortedData)
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
        <main className="h-screen overflow-hidden">
            <div className="titlebox mb-4">
                <button className="iconButton backButton" onClick={() => navigate(-1)}>
                    <FaAngleLeft />
                </button>

                <a href={`/users/${user}`}><h1 className="truncate title pl-4"> {otherUser.username} </h1></a>
            </div>

            <ul class='messages-container h-2/3 border-2 border-black border-solid rounded-lg p-4 overflow-y-scroll space-y-4'>
                {messages.map((message, index) => (
                    
                    <li key={index} class='bg-white rounded-lg p-2 fade-in'>
                        {/* Div around all content used to allign time stamp to the right */}
                        <div class='flex w-full justify-between'>

                            {/* Div box for pfp, username, and text*/}
                            <div className="flex mt-6 items-center space-x-3">

                                <div className="">
                                    <p className="text-brown">{message.content}</p>
                                </div>
                            </div>

                            <p className="font-bold truncate absolute left-2 text-brown">{message.sender.username}</p>
                            
                            {/* Include timestamp of message*/}
                            <p class='text-sm text-orange absolute right-2'> {new Date(message.timestamp).toLocaleString([], {month:'short', year:'numeric', day:'2-digit',  hour: '2-digit', minute:'2-digit'})}</p>
                        </div>

                    </li>
                ))}
            </ul>
            <form className="absolute bottom-16 w-full text-center" onSubmit={handleMessageSend}>
                <input className="p-2" type="text" value={message} placeholder="Send message..." onChange={e => setMessage(e.target.value)} />
                <input className="bg-white rounded-lg p-2 ml-4 hover:bg-grey cursor-pointer" type="submit" value="Send" />
            </form>

        </main>
    );
}

export default MessagesDetail;
import './MyTrades.css'
import { useEffect, useState } from 'react';
import { FaBookOpen, FaAngleLeft, FaTrash} from 'react-icons/fa';
import { generateBooks } from '../MockData';
import { Link } from 'react-router-dom';

const MyBooks = () => {

  const [offeringsBooks, setOfferingsBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/offered`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        setOfferingsBooks(data);
    })
    .catch(err => {
        console.log("Failed to fetch offerings:", err);
        setOfferingsBooks({});
    })
  }, []);

  const handleDelete = (bookId) => {
    console.log(bookId)
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/offered/${bookId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if(res.ok){
            setOfferingsBooks(prevBooks => prevBooks.filter(book => book._id !== bookId))
        }
        else{
            console.error("Failed to delete book from wishlist");
        }
    })
    .catch(err => {
        console.error("Error deleting book:", err);
    });
  }

  return (
    <div>
        <div className="titlebox offeringsHeader">
            <Link to="/profile" className="iconButton backButton">
                <FaAngleLeft />
            </Link>
            <h1 className="title">Offerings</h1>
        </div>
        <main className="profile">
        <div className="mytradesContainer fade-in">
            <ul className="offerings">
            {offeringsBooks.length > 0 ? (
                offeringsBooks.map((book, index) => (
                <li key={index} className="offeringItem">
                    <FaBookOpen className="bookIcon" />
                    <strong>{book.title}</strong>
                    <button 
                      className="deleteButton"
                      onClick={() => handleDelete(book._id)} 
                      style={{ marginLeft: "10px", background: "none", border: "none", cursor: "pointer" }}
                    >
                      <FaTrash />
                    </button>
                </li>
                ))
            ) : (
                <li>Loading Offerings...</li>
            )}
            </ul>
        </div>
        </main>
    </div>
    
  );
};

export default MyBooks;
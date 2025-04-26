import './MyBooks.css';
import { useEffect, useState } from 'react';
import { FaBookOpen, FaAngleLeft, FaTrash } from 'react-icons/fa';
import { generateBooks } from '../MockData';
import { Link } from 'react-router-dom';

const MyBooks = () => {

  const [wishlistBooks, setWishlistBooks] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/wishlist`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        setWishlistBooks(data);
    })
    .catch(err => {
        console.log("Failed to fetch wishlist:", err);
        setWishlistBooks({});
    })
  }, []);

  const handleDelete = (bookId) => {
    console.log(bookId)
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/wishlist/${bookId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if(res.ok){
            setWishlistBooks(prevBooks => prevBooks.filter(book => book._id !== bookId))
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
        <div className="titlebox wishlistHeader">
            <Link to="/profile" className="iconButton backButton">
                <FaAngleLeft />
            </Link>
            <h1 className="title">Wishlist</h1>
        </div>
        <main className="profile">
        <div className="mybooksContainer fade-in">
            <ul className="wishlist">
            {wishlistBooks.length > 0 ? (
                wishlistBooks.map((book, index) => (
                <li key={index} className="wishlistItem">
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
                <li>Loading wishlist...</li>
            )}
            </ul>
        </div>
        </main>
    </div>
    
  );
};

export default MyBooks;
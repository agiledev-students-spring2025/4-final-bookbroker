import './MyBooks.css';
import { useEffect, useState } from 'react';
import { FaBookOpen, FaAngleLeft} from 'react-icons/fa';
import { generateBooks } from '../MockData';
import { Link } from 'react-router-dom';

const MyBooks = () => {

  const [wishlistBooks, setWishlistBooks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/wishlist`)
    .then(res => res.json())
    .then(data => {
        setWishlistBooks(data);
    })
    .catch(err => {
        console.log("Failed to fetch wishlist:", err);
        setWishlistBooks({});
    })
  }, []);

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
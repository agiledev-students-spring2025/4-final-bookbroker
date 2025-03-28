import './MyBooks.css';
import { useEffect, useState } from 'react';
import { FaBookOpen, FaAngleLeft} from 'react-icons/fa';
import { generateBooks } from '../MockData';
import { Link } from 'react-router-dom';

const MyBooks = () => {

  const [wishlistBooks, setWishlistBooks] = useState([]);

  useEffect(() => {
    // In production: fetch from backend instead
    setWishlistBooks(generateBooks(20));
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
import './Profile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({});
    const [wishlistBooks, setWishlistBooks] = useState([]);
    const [offeredBooks, setOfferedBooks] = useState([]);

    // Fetch User Data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://my.api.mockaroo.com/users.json?key=${process.env.REACT_APP_MOCK_USER_API_KEY}`);
                setUser(response.data[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    // Fetch Books Data
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`https://my.api.mockaroo.com/books.json?key=${process.env.REACT_APP_MOCK_BOOK_API_KEY_2}`);
                const books = response.data;
                console.log(books)
                const wishlist = books.slice(0, 4); 
                const offerings = books.slice(4, 8); 

                setWishlistBooks(wishlist);
                setOfferedBooks(offerings);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <main className="profile">
            <h1 className="title">Profile</h1>
            <div className="infoContainer">
                <img className="profilePhoto" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="Profile" />
                <ul className="infoList">
                    <li><strong>Username:</strong> {user.username} </li>
                    <li><strong>Email:</strong> {user.email} </li>
                    <li><strong>Location:</strong> {user.location} </li>
                    <li><strong>Ratings:</strong> ⭐ {user.ratings} </li>
                </ul>
            </div>

            {/* Wishlist Section */}
            <div className="wishlistContainer">
                <h2 className="sectionTitle">📚 Wishlist</h2>
                <ul className="wishlist">
                    {wishlistBooks.length > 0 ? (
                        wishlistBooks.map((book, index) => (
                            <li key={index} className="wishlistItem">
                                📖 <strong>{book.title}</strong> | {book.author}
                            </li>
                        ))
                    ) : (
                        <li>Loading wishlist...</li>
                    )}
                </ul>
            </div>

            {/* Offerings Section */}
            <div className="offeringsContainer">
                <h2 className="sectionTitle">📦 Offerings</h2>
                <ul className="offerings">
                    {offeredBooks.length > 0 ? (
                        offeredBooks.map((book, index) => (
                            <li key={index} className="offeringItem">
                                📖 <strong>{book.title}</strong> | {book.author}
                            </li>
                        ))
                    ) : (
                        <li>Loading offerings...</li>
                    )}
                </ul>
            </div>
        </main>
    );
};

export default Profile;

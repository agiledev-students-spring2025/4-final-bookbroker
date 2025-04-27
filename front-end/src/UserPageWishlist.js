import { useEffect, useState } from 'react';
import { FaBookOpen, FaAngleLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const UserPageWishlist = () => {
    const [wishlistBooks, setWishlistBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${id}/wishlist`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setWishlistBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.log("Failed to fetch wishlist:", err);
                setWishlistBooks([]);
                setLoading(false);
            });
    }, [id]);

    return (
        <div>
            <div className="titlebox wishlistHeader">
                <Link to={`/users/${id}`} className="iconButton backButton">
                    <FaAngleLeft />
                </Link>
                <h1 className="title">Wishlist</h1>
            </div>
            <main className="profile">
                <div className="mybooksContainer fade-in">
                    <ul className="wishlist">
                        {loading ? (
                            <li>Loading Wishlist...</li>
                        ) : wishlistBooks.length > 0 ? (
                            wishlistBooks.map((book, index) => (
                                <li key={index} className="wishlistItem">
                                    <FaBookOpen className="bookIcon" />
                                    <strong>{book.title}</strong>
                                </li>
                            ))
                        ) : (
                            <li>No items in wishlist.</li>
                        )}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default UserPageWishlist;
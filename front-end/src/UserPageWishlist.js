import { useEffect, useState } from 'react';
import { FaBookOpen, FaAngleLeft} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const UserPageWishlist = () => {

    const [wishlistBooks, setWishlistBooks] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}/wishlist`)
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
                <Link to={`/users/${id}`} className="iconButton backButton">
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
                    <li>Loading Wishlist...</li>
                )}
                </ul>
            </div>
            </main>
        </div>
        
    );
};

export default UserPageWishlist;
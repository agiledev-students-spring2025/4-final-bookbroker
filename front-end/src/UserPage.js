import './UserPage.css'
import { useParams} from 'react-router-dom'
import { useState, useEffect} from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaStar, FaBookOpen, FaAngleRight, FaAngleLeft} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UserPage = () => {
    const { id } = useParams()
    const [user, setUser] = useState({});
    const [wishlistBooks, setWishlistBooks] = useState([]);
    const [offeredBooks, setOfferedBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
                console.log("Fetched user data from backend:", data);
            })
            .catch(err => {
                console.error('Failed to fetch book:', err);
                setUser({});
            });

            fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${id}/wishlist`)
            .then(res => res.json())
            .then(data => {
                setWishlistBooks(data)
            })
            .catch(err => {
                console.log("Failed to fetch wishlist:", err)
                setWishlistBooks({})
            })
        
            fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${id}/offered`)
            .then(res => res.json())
            .then(data => {
                setOfferedBooks(data)
            })
            .catch(err => {
                console.log("Failed to fetch offerings", err)
                setOfferedBooks({})
            })
    }, [id]);

    const [fadeInClass, setFadeInClass] = useState({
        profile: 'fade-start',
        wishlist: 'fade-start',
        offerings: 'fade-start'
    });
    
    //animation when clicking on the page
    useEffect(() => {
        // staggered fade-in
        setTimeout(() => setFadeInClass(prev => ({ ...prev, profile: 'fade-in' })), 200);
        setTimeout(() => setFadeInClass(prev => ({ ...prev, wishlist: 'fade-in' })), 300);
        setTimeout(() => setFadeInClass(prev => ({ ...prev, offerings: 'fade-in' })), 500);
    }, []);

    return (
        <div>
        <main className={"profile"}>

            {/*profile info section*/}
            <div className="userpage-header">
                <button className="iconButton backButton" onClick={() => navigate(-1)}>
                        <FaAngleLeft />
                </button>
            </div>
            <div className={`infoContainer  ${fadeInClass.profile}`}>
                <div className="photoAndButton">
                    <img className="profilePhoto" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="Profile" />
                    <button className="messageUserBtn">Message</button>
                </div>
                <ul className="infoList">
                    <li>
                        <div className="infoRow">
                        <span className="truncate usernameText">{user.username}</span>
                        </div>
                    </li>
                    <li>
                        <div className="infoRow">
                        <FaEnvelope className="infoIcon" />
                        <span className="truncate">{user.email}</span>
                        </div>
                    </li>
                    <li>
                        <div className="infoRow">
                        <FaMapMarkerAlt className="infoIcon" />
                        <span className="truncate">{user.location}</span>
                        </div>
                    </li>
                    <li>
                        <div className="infoRow">
                        <FaStar className="infoIcon" />
                        <span className="truncate">{user.ratings}</span>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Wishlist Section */}
            <div className={`wishlistContainer ${fadeInClass.wishlist}`}>
                <div className="sectionHeader">
                    <h2 className="sectionTitle">Wishlist</h2>
                    <Link to={`/users/${id}/wishlist`} className="iconButton">
                        <FaAngleRight />
                    </Link>
                </div>
                <ul className="wishlist">
                    {wishlistBooks.length > 0 ? (
                        wishlistBooks.slice(0,4).map((book, index) => (
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

            {/* Offerings Section */}
            <div className={`offeringsContainer ${fadeInClass.offerings}`}>
                <div className="sectionHeader">
                        <h2 className="sectionTitle">Offerings</h2>
                        <Link to={`/users/${id}/offered`} className="iconButton">
                            <FaAngleRight />
                        </Link>
                </div>
                <ul className="offerings">
                    {offeredBooks.length > 0 ? (
                        offeredBooks.slice(0,4).map((book, index) => (
                            <li key={index} className="offeringItem">
                                <FaBookOpen className="bookIcon" />
                                <strong>{book.title}</strong>
                            </li>
                        ))
                    ) : (
                        <li>Loading offerings...</li>
                    )}
                </ul>
            </div>
        </main>

        </div>
        
    );
}

export default UserPage
import './Profile.css';
import { useState, useEffect } from 'react';
import { generateUser, generateBooks } from './MockData.js';
import { FaMapMarkerAlt, FaEnvelope, FaStar, FaBookOpen, FaPlus, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [offeredBooks, setOfferedBooks] = useState([]);
  const [fadeInClass, setFadeInClass] = useState({
    profile: 'fade-start',
    wishlist: 'fade-start',
    offerings: 'fade-start'
  });
  
  // For wishlist modal
  const [showAddModal, setShowAddModal] = useState(false);

  // For offerings modal
  const [showAddOfferingsModal, setShowAddOfferingsModal] = useState(false);

  // Fade-in animation
  useEffect(() => {
    setTimeout(() => setFadeInClass(prev => ({ ...prev, profile: 'fade-in' })), 200);
    setTimeout(() => setFadeInClass(prev => ({ ...prev, wishlist: 'fade-in' })), 300);
    setTimeout(() => setFadeInClass(prev => ({ ...prev, offerings: 'fade-in' })), 500);
  }, []);

  // Fetch user data
  useEffect(() => {
    setUser(generateUser());
  }, []);

  // Fetch books
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/wishlist`)
    .then(res => res.json())
    .then(data => {
        setWishlistBooks(data)
    })
    .catch(err => {
        console.log("Failed to fetch wishlist:", err)
        setWishlistBooks({})
    })

    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/offered`)
    .then(res => res.json())
    .then(data => {
        setOfferedBooks(data)
    })
    .catch(err => {
        console.log("Failed to fetch offerings", err)
        setOfferedBooks({})
    })
  }, []);

  // Handle adding a wishlist book
  const handleAddBook = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const publisher = e.target.publisher.value;

    console.log('New Wishlist Book:', { title, author, publisher });
    
    // Reset form & close modal
    e.target.reset();
    setShowAddModal(false);
  };

  // Handle adding an offering
  const handleAddOffering = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const publisher = e.target.publisher.value;

    console.log('New Offering Book:', { title, author, publisher });
    
    // Reset form & close modal
    e.target.reset();
    setShowAddOfferingsModal(false);
  };

  return (
    <div>
      <div className="titlebox">
        <h1 className="title">Profile</h1>
      </div>
      
      <main className="profile">
        {/* Profile info section */}
        <div className={`infoContainer ${fadeInClass.profile}`}>
          <div className="photoAndButton">
            <img
              className="profilePhoto"
              src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              alt="Profile"
            />
            <button className="editProfileBtn">Edit Profile</button>
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
            <button className="iconButton" onClick={() => setShowAddModal(true)}>
              <FaPlus />
            </button>
            <h2 className="sectionTitle">Wishlist</h2>
            <Link to="/profile/my-books" className="iconButton">
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
            <button className="iconButton" onClick={() => setShowAddOfferingsModal(true)}>
              <FaPlus />
            </button>
            <h2 className="sectionTitle">Offerings</h2>
            <Link to="/profile/my-trades" className="iconButton">
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

      {/* --- Wishlist Modal --- */}
      {showAddModal && (
        <div className="modalOverlay" onClick={() => setShowAddModal(false)}>
          <div className="modalSheet" onClick={e => e.stopPropagation()}>
            <h2>Add Book to Wishlist</h2>
            <form onSubmit={handleAddBook}>
              <div className="modalFields">
                <div className="fieldRow">
                  <label>Title:</label>
                  <input type="text" name="title" required />
                </div>
                <div className="fieldRow">
                  <label>Author:</label>
                  <input type="text" name="author" required />
                </div>
                <div className="fieldRow">
                  <label>Publisher:</label>
                  <input type="text" name="publisher" required />
                </div>
              </div>
              <button type="submit" className="editProfileBtn">Add</button>
            </form>
          </div>
        </div>
      )}

      {/* --- Offerings Modal --- */}
      {showAddOfferingsModal && (
        <div className="modalOverlay" onClick={() => setShowAddOfferingsModal(false)}>
          <div className="modalSheet" onClick={e => e.stopPropagation()}>
            <h2>Add Book to Offerings</h2>
            <form onSubmit={handleAddOffering}>
              <div className="modalFields">
                <div className="fieldRow">
                  <label>Title:</label>
                  <input type="text" name="title" required />
                </div>
                <div className="fieldRow">
                  <label>Author:</label>
                  <input type="text" name="author" required />
                </div>
                <div className="fieldRow">
                  <label>Publisher:</label>
                  <input type="text" name="publisher" required />
                </div>
              </div>
              <button type="submit" className="editProfileBtn">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

import './Profile.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateUser } from './MockData.js';
import { FaMapMarkerAlt, FaEnvelope, FaStar, FaBookOpen, FaPlus, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

const fetchBooksFromGoogle = async (query) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.items.map(item => ({
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.join(', ') || 'Unknown',
    publisher: item.volumeInfo.publisher || 'Unknown',
    year: item.volumeInfo.publishedDate?.substring(0, 4),
    cover: item.volumeInfo.imageLinks?.thumbnail,
    isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || '',
    genre: item.volumeInfo.categories?.[0] || 'Unknown',
    desc: item.volumeInfo.description || ''
  }));
};

const Profile = () => {
  const [user, setUser] = useState({});
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [offeredBooks, setOfferedBooks] = useState([]);
  const [fadeInClass, setFadeInClass] = useState({ profile: 'fade-start', wishlist: 'fade-start', offerings: 'fade-start' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddOfferingsModal, setShowAddOfferingsModal] = useState(false);
  const [showToastWishlist, setShowToastWishlist] = useState(false);
  const [showToastOfferings, setShowToastOfferings] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTextOffer, setSearchTextOffer] = useState("");
  const [searchResultsOffer, setSearchResultsOffer] = useState([]);
  const [selectedBookOffer, setSelectedBookOffer] = useState(null);
  const [location, setLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId')


const fetchUserData = () => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user?id=${userId}`, {
        headers: {
        "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log('Failed to fetch user:', err));
};

  useEffect(() => {
    setTimeout(() => setFadeInClass(prev => ({ ...prev, profile: 'fade-in' })), 200);
    setTimeout(() => setFadeInClass(prev => ({ ...prev, wishlist: 'fade-in' })), 300);
    setTimeout(() => setFadeInClass(prev => ({ ...prev, offerings: 'fade-in' })), 500);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/wishlist`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })
      .then(res => res.json())
      .then(data => setWishlistBooks(data))
      .catch(err => console.log("Failed to fetch wishlist:", err));

    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/offered`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
      .then(res => res.json())
      .then(data => setOfferedBooks(data))
      .catch(err => console.log("Failed to fetch offerings", err));
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!selectedBook) return;

    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/add-wishlist-book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify(selectedBook)
    })
      .then(res => res.json())
      .then(() => {
        setShowToastWishlist(true);
        setTimeout(() => setShowToastWishlist(false), 2000);
        setShowAddModal(false);
        setSelectedBook(null);
        setSearchText("");
      })
      .catch(console.error);
  };

  const handleAddOffering = (e) => {
    e.preventDefault();
    if (!selectedBookOffer) return;    
    selectedBookOffer.owner = userId
    console.log(selectedBookOffer)


    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/add-offered-book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify(selectedBookOffer)
    })
      .then(res => res.json())
      .then(() => {
        setShowToastOfferings(true);
        setTimeout(() => setShowToastOfferings(false), 2000);
        setShowAddOfferingsModal(false);
        setSelectedBookOffer(null);
        setSearchTextOffer("");
      })
      .catch(console.error);
  };

  const handleProfileEdit = (e, close) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const finalLocation = location=='Other' ? customLocation : location;

    const data = { user: { username, email, location: finalLocation } };

    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log("new user data:", data.user);
        fetchUserData();
        close();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        console.log("Logout success:", data);
  
        //Remove tokens and user info from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
  
        //Redirect to login
        window.location.href = '/login';
      })
      .catch(err => {
        console.error("Logout error:", err);
      });
  };
  

  const navigate = useNavigate();

  return (
    <div>
      <div className="titlebox">
        <h1 className="title">Profile</h1>
      </div>
      <main className="profile">
        <div className={`infoContainer ${fadeInClass.profile}`}>
          <div className="photoAndButton">
            <img className="profilePhoto" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="Profile" />

            <div className="profile-buttons">
            <Popup
              trigger={<button className="editProfileBtn">Edit Profile</button>}
              modal
            >
            {(close) => (
              <div className="edit-popup">
                <form onSubmit={(e) => handleProfileEdit(e, close)}>
                  <div className="form-group">
                    <label htmlFor="username">Enter username:</label>
                    <input type="text" name="username" id="username" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Enter email:</label>
                    <input type="text" name="email" id="email" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Select city:</label>
                    <select
                      id="location"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      {/* Your city options */}
                      <option value="">--Choose a city--</option>
                      <option value="New York">New York, NY</option>
                      <option value="Los Angeles">Los Angeles, CA</option>
                      {/* ... all other cities ... */}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {location === 'Other' && (
                    <div className="edit-profile-custom-location">
                      <label htmlFor="customLocation">Enter your city:</label>
                      <input
                        type="text"
                        id="customLocation"
                        name="customLocation"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <button type="submit" className="editProfileBtn">Submit</button>
                </form>
              </div>
            )}
          </Popup>

              <button className="editProfileBtn logout-button"
                onClick={handleLogout}
              > Logout </button>
            </div>          
          </div>
          <ul className="infoList">
            <li><div className="infoRow"><span className="truncate usernameText">{user.username}</span></div></li>
            <li><div className="infoRow"><FaEnvelope className="infoIcon" /><span className="truncate">{user.email}</span></div></li>
            <li><div className="infoRow"><FaMapMarkerAlt className="infoIcon" /><span className="truncate">{user.location??'N/A'}</span></div></li>
            <li><div className="infoRow"><FaStar className="infoIcon" /><span className="truncate">{user.ratings}</span></div></li>
          </ul>
        </div>

        <div className={`wishlistContainer ${fadeInClass.wishlist}`}>
          <div className="sectionHeader">
            <button className="iconButton" onClick={() => setShowAddModal(true)}><FaPlus /></button>
            <h2 className="sectionTitle">Wishlist</h2>
            <Link to="/profile/my-books" className="iconButton"><FaAngleRight /></Link>
          </div>
          <ul className="wishlist">
            {wishlistBooks.length > 0 ? wishlistBooks.slice(0, 4).map((book, index) => (
              <li key={index} className="wishlistItem"><FaBookOpen className="bookIcon" /><strong>{book.title}</strong></li>
            )) : <li>Loading wishlist...</li>}
          </ul>
        </div>

        <div className={`offeringsContainer ${fadeInClass.offerings}`}>
          <div className="sectionHeader">
            <button className="iconButton" onClick={() => setShowAddOfferingsModal(true)}><FaPlus /></button>
            <h2 className="sectionTitle">Offerings</h2>
            <Link to="/profile/my-trades" className="iconButton"><FaAngleRight /></Link>
          </div>
          <ul className="offerings">
            {offeredBooks.length > 0 ? offeredBooks.slice(0, 4).map((book, index) => (
              <li key={index} className="offeringItem"><FaBookOpen className="bookIcon" /><strong>{book.title}</strong></li>
            )) : <li>Loading offerings...</li>}
          </ul>
        </div>
      </main>

      {showAddModal && (
        <div className="modalOverlay" onClick={() => setShowAddModal(false)}>
          <div className="modalSheet" onClick={e => e.stopPropagation()}>
            <h2>Add Book to Wishlist</h2>
            <form onSubmit={handleAddBook}>
              <div className="modalFields">
                <div className="fieldRow" style={{ position: 'relative' }}>
                  <label>Search Book:</label>
                  <input type="text" value={searchText} onChange={async (e) => {
                    setSearchText(e.target.value);
                    if (e.target.value.length > 1) {
                      const results = await fetchBooksFromGoogle(e.target.value);
                      setSearchResults(results);
                    } else {
                      setSearchResults([]);
                    }
                  }} placeholder="Type book name..." />
                  {searchResults.length > 0 && (
                    <ul className="search-dropdown">
                      {searchResults.map((book, idx) => (
                        <li key={idx} onClick={() => {
                          setSelectedBook(book);
                          setSearchText(book.title);
                          setSearchResults([]);
                        }}>
                          <img src={book.cover} alt="cover" width="40" style={{ marginRight: '10px' }} />
                          {book.title} — {book.author}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <button type="submit" className="editProfileBtn">Add</button>
            </form>
          </div>
        </div>
      )}

      {showAddOfferingsModal && (
        <div className="modalOverlay" onClick={() => setShowAddOfferingsModal(false)}>
          <div className="modalSheet" onClick={e => e.stopPropagation()}>
            <h2>Add Book to Offerings</h2>
            <form onSubmit={handleAddOffering}>
              <div className="modalFields">
                <div className="fieldRow" style={{ position: 'relative' }}>
                  <label>Search Book:</label>
                  <input type="text" value={searchTextOffer} onChange={async (e) => {
                    setSearchTextOffer(e.target.value);
                    if (e.target.value.length > 1) {
                      const results = await fetchBooksFromGoogle(e.target.value);
                      setSearchResultsOffer(results);
                    } else {
                      setSearchResultsOffer([]);
                    }
                  }} placeholder="Type book name..." />
                  {searchResultsOffer.length > 0 && (
                    <ul className="search-dropdown">
                      {searchResultsOffer.map((book, idx) => (
                        <li key={idx} onClick={() => {
                          setSelectedBookOffer(book);
                          setSearchTextOffer(book.title);
                          setSearchResultsOffer([]);
                        }}>
                          <img src={book.cover} alt="cover" width="40" style={{ marginRight: '10px' }} />
                          {book.title} — {book.author}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <button type="submit" className="editProfileBtn">Add</button>
            </form>
          </div>
        </div>
      )}

      {showToastWishlist && <div className="toast-success-wishlist">Book added to wishlist!</div>}
      {showToastOfferings && <div className="toast-success-offerings">Book added to offerings!</div>}
    </div>
  );
};

export default Profile;
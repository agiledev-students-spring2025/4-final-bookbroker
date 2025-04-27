import { useState, useEffect, useRef } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState(null);
    const screenRefs = useRef([]);
    const [showToast, setShowToast] = useState(false);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        // Fetch real offered books from backend
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/feed`)
            .then(res => res.json())
            .then(data => {
                setBooks(data);
            })
            .catch(err => {
                console.error("Failed to fetch books:", err);
                setBooks([]);
            });
    }, []);

    useEffect(() => {
        // Fetch real user data
        if (userId && token) {
            fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user?id=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setUser(data);
            })
            .catch(err => {
                console.error('Failed to fetch user:', err);
                setUser(null);
            });
        }
    }, [userId, token]);

    useEffect(() => {
        // Intersection Observer for fade-in
        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        };

        const observer = new IntersectionObserver(callback, { threshold: 0.2 });

        screenRefs.current.forEach(screen => {
            if (screen) observer.observe(screen);
        });

        return () => observer.disconnect();
    }, [books]);

    const handleAddBook = (book) => {
        if (!token) {
            alert("Please log in to add books to your wishlist!");
            return;
        }

        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/add-wishlist-book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(book)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log("Book added to wishlist:", data);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        })
        .catch(err => {
            console.error("Error adding book to wishlist:", err);
        });
    };

    return (
        <main className="Home">
            <div className="home-header">
                <div className="titlebox">
                    <h1 className="title">Home</h1>
                </div>
                <div className="home-header-message"> 
                    <h3>
                        You've traded {user ? user.ratings || 0 : 0} books.<br/> 
                        <a href="/feed" className="underline">
                            Make it {user ? (user.ratings || 0) + 1 : 1}!
                        </a>
                    </h3>
                    <h3>Today's picks:</h3>
                </div>
            </div>

            {/* success toast for adding book */}
            {showToast && (
                <div className="toast-success">
                    Book added to wishlist!
                </div>
            )}

            <div>
                {books.length > 0 ? (
                    books.map((book, index) => (
                        <div
                            key={book._id || index}
                            className="home-book-screen fade-start"
                            ref={(el) => (screenRefs.current[index] = el)}
                        >
                            <div className="home-book-wrapper">
                                {/* Blurred background */}
                                <div
                                    className="home-book-blur"
                                    style={{
                                        backgroundImage: `url(${book.cover || '/default-book.png'})`
                                    }}
                                />
                                {/* Foreground image */}
                                <Link to={`/books/${book._id}`}>
                                    <img
                                        src={book.cover || '/default-book.png'}
                                        alt="Book Cover"
                                        className="home-book-image"
                                    /> 
                                    <div className="home-book-info-centered">
                                        <p className="home-book-title">{book.title || "[NO TITLE]"}</p>
                                        <p className="home-book-year">{book.year || "[NO DATE]"}</p>
                                        <p className="home-book-author">{book.author || "[NO AUTHOR]"}</p>
                                    </div>
                                </Link>

                                {/* Buttons */}
                                <button className="home-book-btn wishlist-btn" onClick={() => handleAddBook(book)}>
                                    Add to Wishlist
                                </button>
                                <Link to={`/books/${book._id}`}>
                                    <button className="home-book-btn details-btn">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-books">No books found in this genre.</p>
                )}
            </div>
        </main>
    );
};

export default Home;

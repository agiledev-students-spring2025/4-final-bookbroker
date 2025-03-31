import { useState, useEffect, useRef } from 'react';
import './Home.css';
import { generateUser, generateBooks, getBookImage } from './MockData';
import { Link } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState();
    const screenRefs = useRef([]);
    const [showToast, setShowToast] = useState(false);


    useEffect(() => {
        setBooks(generateBooks(5));
    }, []);

    useEffect(() => {
        setUser(generateUser());
    }, []);

    useEffect(() => {
        // Intersection Observer callback
        const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            // Fade it in
            entry.target.classList.add('fade-in');
            }
        });
        };

        const options = {
        threshold: 0.2, // 20% visible triggers fade
        };

        // Create observer
        const observer = new IntersectionObserver(callback, options);

        // Observe each screen
        screenRefs.current.forEach(screen => {
            if (screen) observer.observe(screen);
        });
    }, [books]);

    const handleAddBook = (book) => {
        fetch('http://localhost:3000/user/add-wishlist-book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
                You've traded {user ? user.trades : 0} books.<br/> 
                <a href="/feed" className="underline">
                Make it {user ? user.trades + 1 : 1}!
                </a>
            </h3>
            <h3>Today's picks:</h3>
            </div>
        </div>
        
        {/*success toast for adding book to wishlist*/}
        {showToast && (
            <div className="toast-success">
                Book added to wishlist!
            </div>
        )}

        <div>
            {books.length > 0 ? (
            books.map((book, index) => (
                <div
                key={book.id}
                className="home-book-screen fade-start" // start hidden
                ref={(el) => (screenRefs.current[index] = el)}
                >
                <div className="home-book-wrapper">
                    {/* Blurred background layer */}
                    <div
                    className="home-book-blur"
                    style={{
                        backgroundImage: `url(${getBookImage(book.id)})`
                    }}
                    />
                    {/* Foreground image and info */}
                    <Link to={`/books/${book.id}`}>
                        <img
                            src={getBookImage(book.id)}
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
                    <button className="home-book-btn wishlist-btn" onClick={() => handleAddBook(book)}>Add to Wishlist</button>
                    <Link to={`/books/${book.id}`}>
                    <button className="home-book-btn details-btn">View Details</button>
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

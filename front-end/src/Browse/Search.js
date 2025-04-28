import './Search.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from 'react-icons/fa';

const Search = () => {
    const navigate = useNavigate();
    const [booksData, setBooksData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [hasSearched, setHasSearched] = useState(false); // New: track if user clicked search

    const handleSearch = () => {
        const query = inputValue.trim();
        if (!query) return;

        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/books?query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                setBooksData(data);
                setHasSearched(true); // Mark that user has searched
            })
            .catch(err => {
                console.error("Failed to fetch search results:", err);
                setBooksData([]);
                setHasSearched(true); // Still mark searched even if error
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <main className="Search">
            <h1 className="search-title">
            <button className="back-btn" onClick={() => navigate(-1)}>
                    <FaAngleLeft />
                </button>
                Search
            </h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search by title, author, or ISBN" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={handleSearch}>
                    Search
                </button>
            </div>

            {/* Books */}
            {hasSearched && (
                <div className="search-books">
                    {booksData.length > 0 ? (
                        booksData.map((book, index) => (
                            <div key={book._id || index} className="search-book">
                                <img src={book.cover || '/default-book.png'} alt="Book Cover" />

                                <div className="search-book-text">
                                    <h2>{book.title || "[NO TITLE]"}</h2>
                                    <p>{book.year || "[NO DATE]"}</p>
                                    <p>{book.author || "[NO AUTHOR]"}</p>
                                </div>

                                <Link to={`/books/${book._id}`} className="search-book-button">
                                    <button>
                                        Show Interest
                                    </button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="no-books">No books found for this search.</p>
                    )}
                </div>
            )}
        </main>
    );
};

export default Search;

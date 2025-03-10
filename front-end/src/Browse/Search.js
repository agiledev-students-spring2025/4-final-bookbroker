import './Search.css'
import axios from "axios";
import { useState, useEffect } from "react";

const Search = () => {
    const [ booksData, setBooksData ] = useState([]);
    const [ searchQuery, setSearchQuery ] = useState(null);

    useEffect(() => {
        if (searchQuery === null) {
            return;
        }

        axios
            .get(`https://my.api.mockaroo.com/books.json?key=${process.env.REACT_APP_MOCK_BOOK_API_KEY_2}`)
            .then(response => setBooksData(response.data))
            .catch(err => console.error(err))
    }, [searchQuery])

    return (
        <main className="Search">
            <h1 className="search-title">
                Search
            </h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Search for books" />
                <button onClick={() => {
                    setSearchQuery("");
                }}>
                    Search
                </button>
            </div>

            {/* Books */}
            <div className="search-books">
                {booksData.map((book, index) => (
                    <div key={index} className="search-book">
                        <img src={book.imgUrl} alt="Book Cover" />
                        
                        <div className="search-book-text">
                            <h2>{book.title}</h2>
                            <p>{book.year}</p>
                            <p>{book.author}</p>
                        </div>

                        <a href={book.bookUrl} className="search-book-button">
                            <button>
                                Show Interest
                            </button>
                        </a>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Search
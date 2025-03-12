import './Search.css'
// import axios from "axios"; Commenting until server is ready
import { useState, useEffect } from "react";
import { generateBooks, getBookImage } from '../MockData.js'

const Search = () => {
    const [ booksData, setBooksData ] = useState([]);
    const [ searchQuery, setSearchQuery ] = useState(null);

    useEffect(() => {
    /*
    Commenting until server is ready

        if (searchQuery === null) {
            return;
        }

        axios
            .get(`https://my.api.mockaroo.com/books.json?key=${process.env.REACT_APP_MOCK_BOOK_API_KEY_2}`)
            .then(response => setBooksData(response.data))
            .catch(err => console.error(err))
    */

        setBooksData(generateBooks(25))
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
                        <img src={getBookImage(book.id)} alt="Book Cover" />
                        
                        <div className="search-book-text">
                            <h2>{book.title}</h2>
                            <p>{book.year}</p>
                            <p>{book.author}</p>
                        </div>

                        <a href={"/books/" + book.id} className="search-book-button">
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
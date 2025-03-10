import './Feed.css'
import axios from "axios";
import { useState, useEffect } from "react";

const Feed = () => {
    const [ booksData, setBooksData ] = useState([]);

    useEffect(() => {
        axios
            .get(`https://my.api.mockaroo.com/books.json?key=${process.env.REACT_APP_MOCK_BOOK_API_KEY_2}`)
            .then(response => setBooksData(response.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <main className="Feed">
            <h1 className="feed-title">
                For You
            </h1>

            {/* Books */}
            <div className="feed-books">
                {booksData.map((book, index) => (
                    <div key={index} className="feed-book">
                        <img src={book.imgUrl} alt="Book Cover" />
                        
                        <div className="feed-book-text">
                            <h2>{book.title}</h2>
                            <p>{book.year}</p>
                            <p>{book.author}</p>
                        </div>

                        <a href={book.bookUrl} className="feed-book-button">
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

export default Feed
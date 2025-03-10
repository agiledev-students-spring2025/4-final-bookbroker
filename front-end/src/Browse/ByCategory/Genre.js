import './Genre.css'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Genre = () => {
    const navigate = useNavigate();
    const { genre } = useParams()
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios
            .get(`https://my.api.mockaroo.com/books.json?key=${process.env.REACT_APP_MOCK_BOOK_API_KEY_3}`)
            .then(response => {
                console.log("API Response:", response.data);
                    setBooks(response.data)
                })
            .catch(err => console.error(err))
    }, [genre])

    

    const filteredBooks = books.filter((book) => book.genre?.toLowerCase() === genre.toLowerCase());
    
    return (
        <main className="Genre">
            <div className="titlebox">
                <h1 className="genre-title">
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </h1>
            </div>
            <div className="book-list">
                {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                    <div key={book.id} className="book-item">
                    {/* Book Image */}
                    <Link to={`/books/${book.id}`}>
                        <img src={`https://picsum.photos/80/100?random=${index}`} alt="Book Cover" className="book-image" />
                    </Link>

                    {/* Book Details */}
                    <div className="book-info">
                        <p className="book-title">{book.title ? book.title : "[NO TITLE]"}</p>
                        <p className="book-year">{book.year ? book.year : "[NO DATE]"}</p>
                        <p className="book-author">{book.author ? book.author : "[NO AUTHOR]"}</p>
                    </div>

                    {/* Show Interest Button */}
                    <button className="interest-btn">Show Interest</button>
                    </div>
                ))
                ) : (
                <p className="no-books">No books found in this genre.</p>
                )}
            </div>

            <div className="bottom-nav">
                {["Home", "Browse", "Feed", "Messages", "Profile"].map((tab, index) => (
                <button key={index} onClick={() => navigate(`/${tab.toLowerCase()}`)}  className="nav-item">{tab}</button>
                ))}
            </div>
        </main>
    )
}

export default Genre
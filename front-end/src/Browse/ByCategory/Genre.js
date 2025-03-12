import './Genre.css'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { generateBooks, getBookImage } from '../../MockData.js'
import { useEffect, useState } from 'react'

/* 
Commenting until server is running

import axios from 'axios' Until server 
*/

const Genre = () => {
    const navigate = useNavigate();
    const { genre } = useParams()

    const [books, setBooks] = useState([])

    useEffect(() => {
    /*
    Commenting until server is running

        axios
            .get(`${process.env.REACT_APP_SERVER_ADDRESS}?genre=${genre}`)
            .then(response => {
                console.log("API Response:", response.data);
                    setBooks(response.data)
                })
            .catch(err => console.error(err))
    */

        setBooks(generateBooks(250).filter((book) => book.genre?.toLowerCase() === genre.toLowerCase()))
    }, [genre])


    return (
        <main className="Genre">
            <div className="titlebox">
                <h1 className="genre-title">
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </h1>
            </div>
            <div className="book-list">
                {books.length > 0 ? (
                books.map((book, index) => (
                    <div key={book.id} className="book-item">
                    {/* Book Image */}
                    <Link to={`/books/${book.id}`}>
                        <img src={getBookImage(book.id)} alt="Book Cover" className="book-image" />
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
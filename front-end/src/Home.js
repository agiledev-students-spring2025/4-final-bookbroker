import './Home.css'
import { generateUser, generateBooks, getBookImage } from './MockData'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home = () => {
    const [books, setBooks] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        setBooks(generateBooks(5))
    }, [])

    useEffect(() => {
        setUser(generateUser())
    }, [])

    return (
        <main className="Home bg-background text-center">
            <h1 className='text-brown text-heading-lg'>
                Home
            </h1>
            {/* Commenting out for clarity purposes until login is done on server side
                <a href="/login" className="underline">Login to view books</a>
            */}
            <h3>
                You've traded {user ? user.trades : 0} books.<br/> 
                <a href="/feed" className="underline">Make it {user ? user.trades + 1 : 1}!</a>
            </h3>
            <h3>Today's picks:</h3>
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
        </main>
    )
}

export default Home
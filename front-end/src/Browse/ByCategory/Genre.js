import './Genre.css'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

const Genre = () => {
    const navigate = useNavigate();
    const { genre } = useParams()
    const books=[
        {
            title: "Book Title",
            year: "Book Year",
            author: "Book Author",
            genre: "fiction",
            bookUrl: ".",
            imgUrl: "."
        },
        {
            title: "Book Title",
            year: "Book Year",
            author: "Book Author",
            genre: "fiction",
            bookUrl: ".",
            imgUrl: "."
        },
        {
            title: "Book Title",
            year: "Book Year",
            author: "Book Author",
            genre: "nonfiction",
            bookUrl: ".",
            imgUrl: "."
        },
        {
            title: "Book Title",
            year: "Book Year",
            author: "Book Author",
            genre: "fiction",
            bookUrl: ".",
            imgUrl: "."
        },
        {
            title: "Book Title",
            year: "Book Year",
            author: "Book Author",
            genre: "nonfiction",
            bookUrl: ".",
            imgUrl: "."
        },
        {
            title: "Book Title",
            year: "Book Year",
            author: "Book Author",
            genre: "fiction",
            bookUrl: ".",
            imgUrl: "."
        }
    ]

    const filteredBooks = books.filter((book) => book.genre === genre.toLowerCase());
    
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
                        <p className="book-title">{book.title}</p>
                        <p className="book-year">{book.year}</p>
                        <p className="book-author">{book.author}</p>
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
import './Genre.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookImage } from '../../MockData.js';
import { useEffect, useState } from 'react';

const Genre = () => {
    const navigate = useNavigate();
    const { genre } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/books?genre=${encodeURIComponent(genre)}`)
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(err => {
                console.error("Failed to fetch books:", err);
                setBooks([]);
            });
    }, [genre]);

    return (
        <main className="Genre">
            <h1 className="genre-title">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h1>

            <div className="genre-books">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book.id} className="genre-book">
                            <img src={getBookImage(book.id)} alt="Book Cover" />

                            <div className="genre-book-text">
                                <h2>{book.title || "[NO TITLE]"}</h2>
                                <p>{book.year || "[NO DATE]"}</p>
                                <p>{book.author || "[NO AUTHOR]"}</p>
                            </div>

                            <Link to={`/books/${book.id}`} className="genre-book-button">
                                <button className="interest-btn">Show Interest</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="no-books">No books found in this genre.</p>
                )}
            </div>
        </main>
    );
};

export default Genre;
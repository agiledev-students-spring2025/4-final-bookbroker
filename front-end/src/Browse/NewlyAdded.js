import './NewlyAdded.css'
import { Link } from 'react-router-dom';
import { getBookImage } from '../MockData.js';
import { useEffect, useState } from 'react';

const NewlyAdded = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/new`)
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(err => {
                console.error("Failed to fetch new books:", err);
                setBooks([]);
            });
    }, []);

    return (
        <main className="NewlyAdded">
            <h1 className="new-title">Newly Added</h1>

            <div className="new-books">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book.id} className="new-book">
                            <img src={getBookImage(book.id)} alt="Book Cover" />

                            <div className="new-book-text">
                                <h2>{book.title || "[NO TITLE]"}</h2>
                                <p>{book.year || "[NO DATE]"}</p>
                                <p>{book.author || "[NO AUTHOR]"}</p>
                            </div>

                            <Link to={`/books/${book.id}`}>
                                <button className="interest-btn">Show Interest</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="no-books">No newly added books found.</p>
                )}
            </div>
        </main>
    );
};
export default NewlyAdded
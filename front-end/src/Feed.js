import './Feed.css'

import { useState, useEffect } from "react";
import { generateBooks, getBookImage } from './MockData.js'

const Feed = () => {
    const [ booksData, setBooksData ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/feed')
        .then(res => res.json())
        .then(data => console.log(data) || setBooksData(data))
        .catch(err => {
            console.error('Failed to fetch feed books:', err);
            setBooksData([]);
        });
}, []);


    return (
        <main className="Feed">
            <h1 className="feed-title">
                For You
            </h1>

            {/* Books */}
            <div className="feed-books">
                {booksData.map((book, index) => (
                    <div key={index} className="feed-book">
                        <img src={getBookImage(book.id)} alt="Book Cover" />
                        
                        <div className="feed-book-text">
                            <h2>{book.title ? book.title : "[NO TITLE]"}</h2>
                            <p>{book.year ? book.year : "[NO YEAR]"}</p>
                            <p>{book.author ? book.author : "[NO AUTHOR]"}</p>
                        </div>

                        <a href={"/books/" + book.id} className="feed-book-button">
                            <button className="interest-btn">
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
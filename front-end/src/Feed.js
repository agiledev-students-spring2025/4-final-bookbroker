import './Feed.css';
import { useState, useEffect } from "react";

const Feed = () => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/feed`)
      .then(res => res.json())
      .then(data => setBooksData(data))
      .catch(err => {
        console.error('Failed to fetch feed books:', err);
        setBooksData([]);
      });
  }, []);

  return (
    <main className="Feed">
      <h1 className="feed-title">For You</h1>

      {/* Books */}
      <div className="feed-books">
        {booksData.map((book, index) => (
          <div key={index} className="feed-book">
            <img
              src={book.cover || 'https://via.placeholder.com/128x192?text=No+Cover'}
              alt="Book Cover"
            />
            <div className="feed-book-text">
              <h2>{book.title || "[NO TITLE]"}</h2>
              <p>{book.year || "[NO YEAR]"}</p>
              <p>{book.author || "[NO AUTHOR]"}</p>
            </div>
            <a href={`/books/${book._id}`} className="feed-book-button">
              <button className="interest-btn">Show Interest</button>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Feed;

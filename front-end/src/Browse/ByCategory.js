import './ByCategory.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';

const ByCategory = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/genres`)
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
      })
      .catch((error) => {
        console.error('Failed to fetch genres:', error);
        setGenres([]);
      });
  }, []);

  return (
    <main className="ByCategory">
      <div className="titlebox">
      <button className="back-btn" onClick={() => navigate(-1)}>
                    <FaAngleLeft />
                </button>
        <h1 className='title'>Choose a Genre</h1>
      </div>
      <ul className="list">
        {genres.map((genre, index) => (
          <li key={index}>
            <button
              onClick={() => navigate(`/browse/by-category/${encodeURIComponent(genre.toLowerCase())}`)}
              className="category-btn"
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ByCategory;
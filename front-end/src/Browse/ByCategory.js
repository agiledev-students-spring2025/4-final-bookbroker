import './ByCategory.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { getGenres } from '../MockData.js'

const ByCategory = () => {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);


    useEffect(() => {
        fetch('http://localhost:3000/genres') 
        .then((res) => res.json())
        .then((data) => {
            setGenres(data);
        })
        .catch((error) => {
            console.error('Failed to fetch genres:', error);
        });
}, []);

    return (
        <main className="ByCategory">
            <div className="titlebox">
                <h1 className='title'>Choose a Genre</h1>
            </div>
            <ul className="category-list">
                {genres.map((genre, index) => (
                <li key={index}>
                    <button onClick={() => navigate(`/browse/by-category/${genre.toLowerCase()}`)} className="category-btn">
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </button>
                </li>
                ))}
            </ul>

        </main>
    )
}

export default ByCategory
import './ByCategory.css'
import { useNavigate } from "react-router-dom";
// import axios from 'axios' Commenting until server is ready
import { useEffect, useState } from 'react'
import { getGenres } from '../MockData.js'

const ByCategory = () => {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);


    useEffect(() => {
        /*
        Commenting until server is ready

        axios
            .get(`https://my.api.mockaroo.com/books.json?key=${process.env.REACT_APP_MOCK_BOOK_API_KEY_3}`)
            .then(response =>  {
                console.log("API Response:", response.data);
                if (Array.isArray(response.data)) {
                const uniqueGenres = [...new Set(response.data.map(book => book.genre?.toLowerCase()))]
                        console.log("Extracted Genres:", uniqueGenres); 
                    setGenres(uniqueGenres);
            } else {
                console.error("API did not return an array:", response.data);
                setGenres([]);
            }
        })
            .catch(err => console.error(err))
    */

    setGenres(getGenres(15))
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
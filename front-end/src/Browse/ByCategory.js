import './ByCategory.css'
import { useNavigate } from "react-router-dom";

const ByCategory = () => {
    const navigate = useNavigate();
    const genres = ["Fiction", "Nonfiction"];

    return (
        <main className="ByCategory">
            <div className="titlebox">
                <h1 className='title'>Choose a Genre</h1>
            </div>
            <ul className="category-list">
                {genres.map((genre, index) => (
                <li key={index}>
                    <button onClick={() => navigate(`/browse/by-category/${genre.toLowerCase()}`)} className="category-btn">
                    {genre}
                    </button>
                </li>
                ))}
            </ul>

            <div className="bottom-nav">
                {["Home", "Browse", "Feed", "Messages", "Profile"].map((tab, index) => (
                <button key={index} onClick={() => navigate(`/${tab.toLowerCase()}`)}  className="nav-item">{tab}</button>
                ))}
            </div>
        </main>
    )
}

export default ByCategory
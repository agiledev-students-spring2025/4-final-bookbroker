import './Browse.css'
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from 'react-icons/fa';

const Browse = () => {
    const navigate = useNavigate();

    const routes = {
        "Popular Now": "/browse/popular",
        "Newly Added": "/browse/newly-added",
        "By Category": "/browse/by-category",
        "Search": "/browse/search",
      };

    return (
        <main className="Browse">
            <div className="titlebox">

                <h1 className="title">Browse</h1>
            </div>
            

            <div className="category-list">
                {["Popular Now", "Newly Added", "By Category", "Search"].map((item, index) => (
                    <button key={index} onClick={() => navigate(routes[item])} className="category-btn">
                    {item}
                    </button>
                ))}
            </div>

        
        </main>
    )
}

export default Browse
import './MyTrades.css'
import { useEffect, useState } from 'react';
import { FaBookOpen, FaAngleLeft} from 'react-icons/fa';
import { generateBooks } from '../MockData';
import { Link } from 'react-router-dom';

const MyBooks = () => {

  const [offeringsBooks, setOfferingsBooks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/offered`)
    .then(res => res.json())
    .then(data => {
        setOfferingsBooks(data);
    })
    .catch(err => {
        console.log("Failed to fetch offerings:", err);
        setOfferingsBooks({});
    })
  }, []);

  return (
    <div>
        <div className="titlebox offeringsHeader">
            <Link to="/profile" className="iconButton backButton">
                <FaAngleLeft />
            </Link>
            <h1 className="title">Offerings</h1>
        </div>
        <main className="profile">
        <div className="mytradesContainer fade-in">
            <ul className="offerings">
            {offeringsBooks.length > 0 ? (
                offeringsBooks.map((book, index) => (
                <li key={index} className="offeringItem">
                    <FaBookOpen className="bookIcon" />
                    <strong>{book.title}</strong>
                </li>
                ))
            ) : (
                <li>Loading Offerings...</li>
            )}
            </ul>
        </div>
        </main>
    </div>
    
  );
};

export default MyBooks;
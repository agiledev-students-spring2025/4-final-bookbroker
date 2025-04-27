import { useEffect, useState } from 'react';
import { FaBookOpen, FaAngleLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const UserPageOffered = () => {
    const [offeringsBooks, setOfferingsBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${id}/offered`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOfferingsBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.log("Failed to fetch offerings:", err);
                setOfferingsBooks([]);
                setLoading(false);
            });
    }, [id]);

    return (
        <div>
            <div className="titlebox offeringsHeader">
                <Link to={`/users/${id}`} className="iconButton backButton">
                    <FaAngleLeft />
                </Link>
                <h1 className="title">Offerings</h1>
            </div>
            <main className="profile">
                <div className="mytradesContainer fade-in">
                    <ul className="offerings">
                        {loading ? (
                            <li>Loading Offerings...</li>
                        ) : offeringsBooks.length > 0 ? (
                            offeringsBooks.map((book, index) => (
                                <li key={index} className="offeringItem">
                                    <FaBookOpen className="bookIcon" />
                                    <strong>{book.title}</strong>
                                </li>
                            ))
                        ) : (
                            <li>No offerings available.</li>
                        )}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default UserPageOffered;
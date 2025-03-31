import './BookPage.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import { getBookImage } from './MockData.js';
import { FaAngleLeft } from 'react-icons/fa' 
import { useNavigate } from 'react-router-dom';

const BookPage = () => {
    const { id } = useParams()

    const [book, setBook] = useState({})
    const [user, setUser] = useState({})
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/books/${id}`)
        .then(res => res.json())
        .then(data => {
            setBook(data)
            fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${data.userid}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
            .catch(err => {
                console.log('Failed to fetch user', err);
                setUser({});
            })
        })
        .catch(err => {
            console.error('Failed to fetch book:', err);
            setBook({});
        });
    }, [id]); // Empty dependency array triggers only on page load (zzz was such a headache)

    const bookImageSource = getBookImage(id)
    return (
        <main className="BookPage page-slide-in">
            <div className="bookpage-header">
                <button className="iconButton backButton" onClick={() => navigate(-1)}>
                    <FaAngleLeft />
                </button>
            </div>

            <div className="book-title-section">
                <img src={bookImageSource} alt="book" />
                <div className="book-info-section">
                    <h1 className="book-title">{book.title || "[NO TITLE]"}</h1>
                    <h3 className='book-author'>{book.author ? book.author: "[NO AUTHOR]"}, {book.year ? book.year : "[NO DATE]"}</h3>
                    <h2 className='book-owner'>
                        Offered by: 
                        <Link to={`/users/${book.userid}`}>
                        { user.username || "[NO USER]"}
                        </Link>
                    </h2>
                </div>
            </div>

            <div className="book-page-actions">
                <button className="book-action-btn wishlist-btn">Add to Wishlist</button>
                <button className="book-action-btn contact-btn">Contact Owner</button>
            </div>

            <div className="book-description-section">
                <h1 className="about-this-book">About this book</h1>
                <p>{book.desc ? book.desc : "[NO DESC]"}</p>
            </div>
            <div className="isbn-section">
                <h1 className="isbn-header"> ISBN </h1>
                <h3 className='book-isbn'>{book.isbn ? book.isbn : "[NO ISBN]"}</h3>
            </div>
            <div className="genre-section">
                <h1 className="genre-header"> Genre </h1>
                <h3 className='book-genre'>{book.genre ? book.genre : "[NO GENRE]"}</h3>
            </div>
        </main>
    )
}

export default BookPage
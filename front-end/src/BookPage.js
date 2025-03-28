import './BookPage.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import { getBookImage } from './MockData.js';

const BookPage = () => {
    const { id } = useParams()

    const [book, setBook] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/books/${id}`)
        .then(res => res.json())
        .then(data => {
            setBook(data)
            fetch(`http://localhost:3000/users/${data.userid}`)
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
        <main className="BookPage content-center mt-10">
            <div className="header text-center mb-5">            
                <h1 className="text-4xl">{book.title ? book.title : "[NO TITLE]"}</h1>
                <h2 className="text-2xl">
                    Offered by:
                    <Link to={`/users/${book.userid}`}>
                    {user.username ? user.username : "[NO USER]"}
                    </Link>
                </h2>    
            </div>
            <img src={bookImageSource} alt="book" className="mx-auto mb-5" />
            <div className="book-description text-left mx-10">            
                <h3>{book.author ? book.author: "[NO AUTHOR]"}, {book.year ? book.year : "[NO DATE]"}</h3>
                <p>{book.desc ? book.desc : "[NO DESC]"}</p>
                <p>ISBN: {book.isbn ? book.isbn : "[NO ISBN]"}, Genre: {book.genre ? book.genre : "[NO GENRE]"}</p>
            </div>
        </main>
    )
}

export default BookPage
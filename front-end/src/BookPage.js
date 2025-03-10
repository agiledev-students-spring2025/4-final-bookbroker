import './BookPage.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const BookPage = () => {
    const { id } = useParams()
    const [book, setBook] = useState({})

    useEffect(() => {
        axios
            .get(`https://my.api.mockaroo.com/book?id=${id}&key=${process.env.REACT_APP_MOCK_BOOK_API_KEY}`)
            .then(response => setBook(response.data))
            .catch(err => console.error(err))
    }, [book, id])

    const bookImageSource = process.env.REACT_APP_MOCK_IMG_SRC

    return (
        <main className="BookPage content-center mt-10">
            <div className="header text-center mb-5">            
                <h1 className="text-4xl">{book.title ? book.title : "[NO TITLE]"}</h1>
                <h2 className="text-2xl">Offered by: {book.user ? book.user : "[NO USER]"}</h2>
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
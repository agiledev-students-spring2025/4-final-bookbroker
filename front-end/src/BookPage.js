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

    return (
        <main className="BookPage">
            <h1 className="text-4xl">{book.title}</h1>
            <h2>Offered by: {book.user}</h2>
            <img src="https://picsum.photos/200/300" alt="book" />
            <h3>{book.author}, {book.year}</h3>
            <p>{book.desc}</p>
            <p>{book.isbn}, {book.genre}</p>
        </main>
    )
}

export default BookPage
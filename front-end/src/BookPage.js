import './BookPage.css'
import { useParams } from 'react-router-dom'

const BookPage = () => {
    const { id } = useParams()
    return (
        <main className="BookPage">
            <h1>
                Book with id: { id }
            </h1>
        </main>
    )
}

export default BookPage
import './Genre.css'
import { useParams } from 'react-router-dom'
 
const Genre = () => {
    const { genre } = useParams()
    return (
        <main className="Genre">
            <h1>
                { genre }
            </h1>
        </main>
    )
}

export default Genre
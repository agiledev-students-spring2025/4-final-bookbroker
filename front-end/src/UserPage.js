import './UserPage.css'
import { useParams } from 'react-router-dom'

const UserPage = () => {
    const { id } = useParams()
    return (
        <main className="UserPage">
            <h1>
                User with id: { id }
            </h1>
        </main>
    )
}

export default UserPage
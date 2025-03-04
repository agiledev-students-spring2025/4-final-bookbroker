import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Feed from './Feed'
import Browse from './Browse'
import NewlyAdded from './Browse/NewlyAdded'
import PopularNow from './Browse/PopularNow'
import Search from './Browse/Search'
import ByCategory from './Browse/ByCategory'
import Genre from './Browse/ByCategory/Genre'
import Profile from './Profile'
import EditProfile from './Profile/EditProfile'
import MyBooks from './Profile/MyBooks'
import MyTrades from './Profile/MyTrades'
import Messages from './Messages'
import BookPage from './BookPage'
import UserPage from './UserPage'

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/newly-added" element={<NewlyAdded />} />
        <Route path="/browse/popular-now" element={<PopularNow />} />
        <Route path="/browse/search" element={<Search />} />
        <Route path="/browse/by-category" element={<ByCategory />} />
        <Route path="/browse/by-category/:genre" element={<Genre />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/my-books" element={<MyBooks />} />
        <Route path="/profile/my-trades" element={<MyTrades />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/users/:id" element={<UserPage />} />
      </Routes>
    </Router>
  )
}

export default App
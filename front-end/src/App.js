import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
import Login from './Login'

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="feed" element={<Feed />} />
        <Route path="login" element={<Login />} />
        <Route path="browse" >
          <Route index element={<Browse />} />
          <Route path="newly-added" element={<NewlyAdded />} />
          <Route path="popular" element={<PopularNow />} />
          <Route path="search" element={<Search />} />
          <Route path="by-category" >
            <Route index element={<ByCategory />} />
            <Route path=":genre" element={<Genre />} />
          </Route>
        </Route>
        <Route path="profile" >
          <Route index element={<Profile />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="my-books" element={<MyBooks />} />
          <Route path="my-trades" element={<MyTrades />} />
        </Route>
        <Route path="messages" element={<Messages />} />
        <Route path="books/:id" element={<BookPage />} />
        <Route path="users/:id" element={<UserPage />} />
      </Routes>
    </Router>
  )
}

export default App
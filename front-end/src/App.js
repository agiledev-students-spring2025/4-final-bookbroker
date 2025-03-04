import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Feed from './Feed'
import Browse from './Browse'
import Profile from './Profile'
import Messages from './Messages'

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  )
}

export default App
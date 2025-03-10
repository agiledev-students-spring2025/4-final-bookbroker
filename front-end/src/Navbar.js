import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaHome, FaSearch, FaEnvelope, FaUser, FaBook } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home" className="nav-item">
        <FaHome className="nav-icon" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/browse" className="nav-item">
        <FaSearch className="nav-icon" />
        <span>Browse</span>
      </NavLink>
      <NavLink to="/feed" className="nav-item">
        <FaBook className="nav-icon" />
        <span>Feed</span>
      </NavLink>
      <NavLink to="/messages" className="nav-item">
        <FaEnvelope className="nav-icon" />
        <span>Messages</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item">
        <FaUser className="nav-icon" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
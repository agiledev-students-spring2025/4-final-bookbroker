import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaHome, FaSearch, FaEnvelope, FaUser, FaBook } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar fixed -bottom-0 w-full h-12 flex justify-evenly content-center bg-brown">
      <NavLink to="/home" className="nav-item">
        <FaHome className="nav-icon" />
      </NavLink>
      <NavLink to="/browse" className="nav-item">
        <FaSearch className="nav-icon" />
      </NavLink>
      <NavLink to="/feed" className="nav-item">
        <FaBook className="nav-icon" />
      </NavLink>
      <NavLink to="/messages" className="nav-item">
        <FaEnvelope className="nav-icon" />
      </NavLink>
      <NavLink to="/profile" className="nav-item">
        <FaUser className="nav-icon" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
import { NavLink } from 'react-router-dom';
import { FaHome, FaSearch, FaEnvelope, FaUser, FaBook } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full h-12 flex bg-brown">
      <NavLink to="/home" className="flex-1 flex justify-center items-center py-2">
        <FaHome className="text-white text-2xl" />
      </NavLink>
      <NavLink to="/browse" className="flex-1 flex justify-center items-center py-2">
        <FaSearch className="text-white text-2xl" />
      </NavLink>
      <NavLink to="/feed" className="flex-1 flex justify-center items-center py-2">
        <FaBook className="text-white text-2xl" />
      </NavLink>
      <NavLink to="/messages" className="flex-1 flex justify-center items-center py-2">
        <FaEnvelope className="text-white text-2xl" />
      </NavLink>
      <NavLink to="/profile" className="flex-1 flex justify-center items-center py-2">
        <FaUser className="text-white text-2xl" />
      </NavLink>
    </nav>
  );
};

export default Navbar;

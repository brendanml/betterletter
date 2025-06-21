import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "@/services/userService";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">Admin Panel</div>
      <div className="space-x-4">
        <Link to="/" className={`text-white ${location.pathname === '/' ? 'underline' : ''}`}>
          Home
        </Link>
        <Link to="/prompt" className={`text-white ${location.pathname === '/account' ? 'underline' : ''}`}>
          prompt
        </Link>
        <Link to="/login" className={`text-white ${location.pathname === '/login' ? 'underline' : ''}`}>
          Login
        </Link>
        <button 
          onClick={async () => {
            await logoutUser();
            window.location.href = '/login'; // Redirect to login after logout
          }} 
          className="text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
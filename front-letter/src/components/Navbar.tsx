import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "@/services/userService";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-between p-4 border-b-1 text-black w-full">
      <div className="text-lg font-bold ">Better Letter</div>
      <div className="space-x-4">
        <Link to="/" className={`text-white ${location.pathname === '/' ? 'underline' : ''}`}>
          Home
        </Link>
        <Link to="/generate" className={`text-white ${location.pathname === '/account' ? 'underline' : ''}`}>
          Generator
        </Link>
        <Link to="/login" className={`text-white ${location.pathname === '/login' ? 'underline' : ''}`}>
          Login
        </Link>
        <Link to="/account" className={`text-white ${location.pathname === '/account' ? 'underline' : ''}`}>
          Account
        </Link>
        <button 
          onClick={async () => {
            await logoutUser();
            window.location.href = '/login'; // Redirect to login after logout
          }} 
          className="text-black"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
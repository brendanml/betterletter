import { useNavigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {Button} from "../components/ui/button";
import {logoutUser} from "../services/UserService";



const HomePage = () => {
  const navigate = useNavigate();
  const {data, isLoading, isError} = useAuth();
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <div>
      {!isLoading && !isError && data ? (
        <div>
          <h1>Welcome, {data.username}!</h1>
          <p>Email: {data.email}</p>
          <Button onClick={async () => {
            await logoutUser();
            navigate('/login');
          }}>Logout</Button>
        </div>
      ) : (
        <div>
          <h1>Please log in or register</h1>
          <Button onClick={handleLogin}>Login</Button>
        </div>
      )
      }
      <p>This is the main page of our application.</p>
    </div>
  );
}

export default HomePage;
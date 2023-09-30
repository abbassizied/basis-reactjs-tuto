import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import AuthService from "../Services/AuthService";
import { useAuth } from "../Context/AuthProvider";

export function Nav() {
  const { currentUser, setCurrentUser } = useAuth();
 
  const handleLogout = async () => {
    setCurrentUser({});
    await AuthService.logout();
  };

  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">List Of Posts</Link>
        </li>
        <li>
          <Link to="/users">User</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {currentUser.token ?(
          <li>
            <Button onClick={handleLogout}>Logout</Button>
          </li>
        ):(
          <li>
          <Link to="/login">Login</Link>
        </li>          
        )}
      </ul>
    </>
  );
}

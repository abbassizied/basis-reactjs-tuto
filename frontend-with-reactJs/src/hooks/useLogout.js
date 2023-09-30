// 2 remove
// xxxx not used yet
//
import { useAuth } from "../Context/AuthProvider";

const useLogout = () => {
  const { setCurrentUser } = useAuth();

  const logout = async () => {
    setCurrentUser({}); 
    localStorage.removeItem("token");
    /*
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    */
  };

  return logout;
};

export default useLogout;

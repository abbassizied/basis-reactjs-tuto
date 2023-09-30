// Step 3: Provide the context
// AuthProvider.js
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
  // creating a local state
  const [currentUser, setCurrentUser] = useState({
    email: "",
    role: "",
    token: "",
    username: "",
  });
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>  {/* passing state to in provider */}
      {children}
    </AuthContext.Provider>
  );
};

// xxxxx
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

/*

{
    email: "",
    role: "",
    token: "",
    username: "",
  }

*/

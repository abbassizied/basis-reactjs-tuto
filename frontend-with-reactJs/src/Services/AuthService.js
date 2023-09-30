// Authentication service
import api from "../Helper/Api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const register = (username, password) => {
  return api
    .post("/register", {
      username,
      password,
    })
    .catch((error) => {
      console.log(error.response);
    });
};

const login = (username, password) => {
  console.log("calling login endpoint ...");
  return api
    .post("/login", {
      username,
      password,
    })
    .catch((error) => {
      console.log(error.response);
    });
};

const logout = () => {
  api.post("/logout").then((response) => {
    localStorage.removeItem("token");
    // localStorage.removeItem("refreshToken");
    cookies.remove("jwt-refreshToken", { path: "/" });
    // redirect user to home page
    window.location.href = "/";
  });
};

// define function to get new access token using refresh token
const refreshAccessToken = () => {
  console.log("calling refresh endpoint ...");
  console.log("refreshing access token ...");
  return api.post("/refresh", { withCredentials: true }).catch((error) => {
    console.log(error.response);
  });
};

const AuthService = {
  register,
  login,
  logout,
  refreshAccessToken,
};

export default AuthService;

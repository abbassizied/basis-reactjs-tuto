import axios from "axios";
import AuthService from "../Services/AuthService";
const BASE_URL = "http://localhost:8000";

const customAxiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/*****************************************************************************
 * Add a request interceptor to add the JWT token to the authorization header
 ******************************************************************************/
customAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

/**********************************************************************
 *  Add a response interceptor to refresh the JWT token if it's expired
 ***********************************************************************/
customAxiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async function (error) {
    // Set Failed Request
    const failedRequest = error?.config;
  
      console.log("------ 0");
      if (error?.response?.status === 401 && !failedRequest._retry) {
        console.log("------ 1 if");
        failedRequest._retry = true;
        console.log("------ 2");
        await AuthService.refreshAccessToken().then((response) => {
          console.log("response.data.token : ", response.data.token);
          const newAccessToken = response.data.token;
          console.log("newAccessToken : ", newAccessToken);
          console.log("------ 3");
          localStorage.setItem("token", newAccessToken);
          // Set axios instance header
          customAxiosInstance.headers["Authorization"] =
            "Bearer " + newAccessToken;
          // Set failed request header
          failedRequest.headers["Authorization"] = "Bearer " + newAccessToken;
          console.log("------ 4");
          // You should update context with new access token(hint:authprovider, useEffec)
          //Retry failed request
          return customAxiosInstance(failedRequest);
        });
        console.log("------ 5");
      } else if (error.response.status === 403 && failedRequest.url === "/refresh") {
        // this failed, so let's redirect to the login page
        AuthService.logout();
      } else {
        console.log("------ 1 else");
        return Promise.reject(error); // Return the original error if we can't handle it
      }
 
  } // end async function
);

export default customAxiosInstance;

import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { VpnKey } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
 
import AuthService from "../Services/AuthService";
import { Alert, AlertTitle } from "@mui/material";

// Step 2: Use the context
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthContext.js";
import { useAuth } from "../Context/AuthProvider";

import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

export function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const { currentUser, setCurrentUser } = useAuth();
  // const { setCurrentUser } = useContext(AuthContext);
  const { setCurrentUser } = useAuth();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validationSchema = yup.object({
    userName: yup
      .string("Enter your UserName")
      .required("UserName is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    // console.log("✅ Submitting form with state:", { userName, password });
    await AuthService.login(userName, password).then((response) => {
      // console.log("data : ", response.data);
      const token = response.data.token;
      const refreshToken = response.data.refreshToken;

      if (token) {
        localStorage.setItem("token", token);
        // localStorage.setItem("refreshToken", refreshToken);
        cookies.set("jwt-refreshToken", refreshToken, { path: "/" });
        const user = jwt_decode(token);
        setCurrentUser({ ...user, token: token, refreshToken: refreshToken });
        // console.log("🎟️ User Infos : ", currentUser);
      }
      //return response.data.token;
    });
    // redirect user to home page
    //return redirect("/home");
     navigate(from, { replace: true }); 
  };

  return (
    <>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("userName")}
          fullWidth
          id="userName"
          label="userName"
          name="userName"
          placeholder="type your user name..."
          value={userName}
          onChange={handleUserNameChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <TextField
          {...register("password")}
          fullWidth
          id="password"
          label="passwords"
          name="password"
          type="password"
          placeholder="type your password..."
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKey />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          endIcon={<AddCircleOutlineIcon />}
        >
          Send
        </Button>
      </form>
      {(errors.userName || errors.password) && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <p>{errors.userName?.message}</p>
          <p>{errors.password?.message}</p>
        </Alert>
      )}
    </>
  );
}

/*
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
*/

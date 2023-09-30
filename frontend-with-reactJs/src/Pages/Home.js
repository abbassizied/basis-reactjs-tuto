import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Step 2: Use the context
import { useAuth } from "../Context/AuthProvider";

export function Home() {
    // getting the state from Context
  const  {currentUser} = useAuth();

  return (
    <>
      <h1>Home</h1>
      <div>
        <h2>🎟️ User Infos :</h2>
        <p>username : {currentUser.username}</p>
        <p>role : {currentUser.role}</p>
        <p>email : {currentUser.email}</p>
        <p>refreshToken : {currentUser.refreshToken}</p>
        <p>token : {currentUser.token}</p>
      </div>
      <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />

        <Button variant="contained">Hello World</Button>
      </div>
    </>
  );
}

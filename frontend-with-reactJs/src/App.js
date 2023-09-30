// import { useState } from "react";
import { Home } from "./Pages/Home";
import { NoMatch } from "./Pages/NoMatch";
import { About } from "./Pages/About";
import { Login } from "./Pages/Login";
import { Posts } from "./Pages/Posts";
import { Unauthorized } from "./Pages/Unauthorized";
import { Nav } from "./Components/Nav";
import { Layout } from "./Components/Layout";
import { ViewPost } from "./Components/Post/ViewPost";
import { EditPost } from "./Components/Post/EditPost";
import { UserList } from "./Components/User/UserList";
import { AddUser } from "./Components/User/AddUser";
import { EditUser } from "./Components/User/EditUser";
import RouteGuard from "./Helper/RouteGuard";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useAuth } from "./Context/AuthProvider";
import { useEffect } from "react";

import jwt_decode from "jwt-decode";

const ROLES = {
  User: "User",
  Admin: "Admin",
};

function App() {
  const navigate = useNavigate();

  // getting the state from Context
  const { currentUser, setCurrentUser } = useAuth();

//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
  // to verify????!!!
  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      const user = jwt_decode(token);
      if (user) {
        setCurrentUser({ ...user, token: token, refreshToken: refreshToken });
      } else {
        navigate("/login");
      }
    }
  }, []);
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------


  return (
    <>
      <div>
        <h1>🎟️ User Infos : {currentUser.username}</h1>
      </div>

      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route
            element={<RouteGuard allowedRoles={[ROLES.User, ROLES.Admin]} />}
          >
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/view-post/:id" element={<ViewPost />} />
            <Route path="/posts/edit-post/:id" element={<EditPost />} />
          </Route>

          <Route element={<RouteGuard allowedRoles={[ROLES.Admin]} />}>
            <Route path="/users" element={<UserList />} />
            <Route path="/posts/add-user/" element={<AddUser />} />
            <Route path="/posts/edit-post/:id" element={<EditUser />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

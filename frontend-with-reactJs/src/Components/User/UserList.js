 

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from"../slices/getAllUsers";

export  function UserList() {

  useEffect(() => {
    dispatch(getAllUsers());
}, [dispatch]);

    return (
      <>
        <h1>UserList</h1>
      </>
    );
  }
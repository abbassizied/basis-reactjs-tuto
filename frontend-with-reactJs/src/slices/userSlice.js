// Create a Redux State Slice

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../Services/UserService";

const initialState = {};
/*
{
  "id": 0,
  "email": '',
  "firstName":'',
  "lastName": '',
  "username": '',
  "password": '',
  "role":'',
}
*/

// {email, firstName, lastName, username, password, role}
export const createUser = createAsyncThunk(
  "users/add",
  async (user) => {
    const res = await UserService.create(user);
    return res.data;
  }
);
  
export const getALLUsers = createAsyncThunk("users/getAll", async () => {
  const response =  await UserService.getAll();
  return response.data;
});

export const retrieveUser = createAsyncThunk("users/retrieve", async (user) => {
  const res = await UserService.create(user);
  return res.data;
});
/*
// { id, data }
export const updateUser = createAsyncThunk("users/update", async (id, user) => {
  const res = await UserService.update(id, user);
  return res.data;
});
*/
export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  const res = await UserService.remove(id);
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState, 
  extraReducers: {
    // add your async reducers here
    [getALLUsers.fulfilled]: (state, action) => {
      state.push(action.payload);
    },    
    [createUser.fulfilled]: (state, action) => {
      state.push(action.payload);
    },    
    [deleteUser.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    }, 
  },
});

 
 
const { reducer } = userSlice;
export default reducer;
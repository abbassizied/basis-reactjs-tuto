// Create a Redux Store
// This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"; // Add Slice Reducers to the Store

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  devTools: true,
});
 
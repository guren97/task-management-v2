import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice.jsx"; // Import the default export of authSlice

const store = configureStore({
  reducer: {
    auth: authReducer, // Provide the authSlice reducer to the store configuration
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import clockReducer from "./features/ClockSlice.js"; // Import the calculator slice

// Create the Redux store
const Store = configureStore({
  reducer: {
    clock: clockReducer, // Add the calculator slice
  },
});

export default Store;

import { createSlice, configureStore } from "@reduxjs/toolkit";

// Auth slice for managing authentication state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false, // Changed variable name for clarity
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

// Exporting the auth actions for use in components
export const authActions = authSlice.actions;

// Configure and export the Redux store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Named reducer for scalability
  },
});

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/types";

// Check localStorage for persisted auth data
const persistedAuthState = JSON.parse(localStorage.getItem("authState") || "null");

const initialState: AuthState = persistedAuthState || {
  user: null,
  token: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loggedIn = !!action.payload.user && !!action.payload.token;

      // Persist state to localStorage
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      // Clear state and localStorage
      localStorage.removeItem("authState");
      localStorage.removeItem("jwtToken");
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

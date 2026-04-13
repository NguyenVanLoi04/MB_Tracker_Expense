import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfile } from "../../interfaces/user.interface";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: IUserProfile | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isInitialized = true;
    },
    setUser: (state, action: PayloadAction<IUserProfile | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    completeInitialization: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setToken, setUser, logout, completeInitialization } =
  authSlice.actions;
export default authSlice.reducer;

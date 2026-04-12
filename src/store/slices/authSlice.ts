import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isInitialized: false,
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
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
    completeInitialization: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setToken, logout, completeInitialization } = authSlice.actions;
export default authSlice.reducer;

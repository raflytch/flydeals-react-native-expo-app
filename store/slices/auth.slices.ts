import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/common/types/auth";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setAuthenticated, setLoading, setToken, logout } =
  authSlice.actions;
export default authSlice.reducer;

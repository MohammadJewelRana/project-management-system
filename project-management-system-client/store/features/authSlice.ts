import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUser } from "@/types/auth.types";

const initialState: IAuthState & { isInitialized: boolean } = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: IUser;
        accessToken: string | null;
        refreshToken: string | null;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isInitialized = true;
    },
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isInitialized = true;
    },
  },
});

export const { setUser, setTokens, setInitialized, logout } = authSlice.actions;
export default authSlice.reducer;

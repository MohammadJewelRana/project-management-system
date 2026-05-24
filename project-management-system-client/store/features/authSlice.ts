import { createSlice } from "@reduxjs/toolkit";

import { IAuthState } from "@/types/auth.types";

const initialState: IAuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;

      state.accessToken = action.payload.accessToken;
    },

    logout: (state) => {
      state.user = null;

      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

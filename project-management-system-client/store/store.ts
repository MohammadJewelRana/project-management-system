import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./baseApi";

import authReducer from "@/store/features/authSlice";

export const store = configureStore({
  reducer: {
    // RTK QUERY
    [baseApi.reducerPath]: baseApi.reducer,

    // AUTH
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// TYPES
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

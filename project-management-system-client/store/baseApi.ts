import envConfig from "@/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.baseUrl,
    credentials: "include",
  }),
  tagTypes: ["Feedback"],
  endpoints: () => ({}),
});

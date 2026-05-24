import envConfig from "@/config/envConfig";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, setTokens } from "./features/authSlice";
import { tokenManager } from "./hooks/tokenManager";

type RefreshResponse = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: envConfig.baseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      headers.set("authorization", `${token}`);
      // headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const isRefreshEndpoint =
    typeof args !== "string" && args.url === "/auth/refresh-token";

  if (result.error?.status === 401 && !isRefreshEndpoint) {
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      tokenManager.clearTokens();
      api.dispatch(logout());
      return result;
    }

    const refreshBaseQuery = fetchBaseQuery({
      baseUrl: envConfig.baseUrl,
      credentials: "include",
    });

    const refreshResult = await refreshBaseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    const refreshData = refreshResult.data as RefreshResponse | undefined;

    if (refreshData?.success) {
      const { accessToken, refreshToken: newRefreshToken } = refreshData.data;

      tokenManager.setTokens(accessToken, newRefreshToken);

      api.dispatch(
        setTokens({
          accessToken,
          refreshToken: newRefreshToken,
        }),
      );

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      tokenManager.clearTokens();
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Feedback",
    "Auth",
    "Project",
    "Task",
    "Sprint",
    "Comment",
    "User",
  ],
  endpoints: () => ({}),
});

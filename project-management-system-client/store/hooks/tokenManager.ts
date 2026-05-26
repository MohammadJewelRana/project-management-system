import Cookies from "js-cookie";

export const tokenManager = {
  getAccessToken: () => Cookies.get("accessToken") || null,
  getRefreshToken: () => Cookies.get("refreshToken") || null,
  setTokens: (accessToken: string, refreshToken: string) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  },
  clearTokens: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
  },
};
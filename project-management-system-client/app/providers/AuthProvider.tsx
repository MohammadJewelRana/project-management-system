"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/reduxHooks";
import { useGetMeQuery } from "@/store/services/auth.api";
import { logout, setInitialized, setUser } from "@/store/features/authSlice";
import { tokenManager } from "@/store/hooks/tokenManager";
 

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [tokenReady, setTokenReady] = useState(false);
  const token = tokenManager.getAccessToken();

  useEffect(() => {
    setTokenReady(true);
  }, []);

  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !tokenReady || !token,
  });

  useEffect(() => {
    if (data?.success) {
      dispatch(
        setUser({
          user: data.data,
          accessToken: token,
          refreshToken: tokenManager.getRefreshToken(),
        }),
      );
      return;
    }

    if (tokenReady && !token) {
      dispatch(setInitialized());
    }

    if (isError && token) {
      tokenManager.clearTokens();
      dispatch(logout());
    }
  }, [data, isError, dispatch, token, tokenReady]);

  if (tokenReady && token && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        Loading...
      </div>
    );
  }

  return children;
}

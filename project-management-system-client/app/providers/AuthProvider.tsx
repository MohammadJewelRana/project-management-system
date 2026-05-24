"use client";

import { useEffect } from "react";

import Cookies from "js-cookie";

import { useAppDispatch } from "@/store/reduxHooks";

 

import {
  useGetMeQuery,
} from "@/store/services/auth.api";
import { logout, setUser } from "@/store/features/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const token =
    Cookies.get("accessToken");

  const {
    data,
    isLoading,
    isError,
  } = useGetMeQuery(undefined, {
    skip: !token,
  });

  // SET USER
  useEffect(() => {
    if (data?.success) {
      dispatch(
        setUser({
          user: data.data,
          accessToken: token,
        })
      );
    }

    // INVALID TOKEN
    if (isError) {
      Cookies.remove("accessToken");

      Cookies.remove("role");

      dispatch(logout());
    }
  }, [
    data,
    isError,
    dispatch,
    token,
  ]);

  // LOADER
  if (token && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        Loading...
      </div>
    );
  }

  return children;
}
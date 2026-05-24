import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useLoginMutation, useRegisterMutation } from "../services/auth.api";
import { useAppDispatch } from "../reduxHooks";
import { logout, setUser } from "../features/authSlice";
import { tokenManager } from "./tokenManager";
 

 
 
 

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [loginMutation, result] = useLoginMutation();

  const login = async (data: any) => {
    try {
      const res = await loginMutation(data).unwrap();
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      tokenManager.setTokens(accessToken, refreshToken);
      Cookies.set("role", res.data.user.role);

      dispatch(
        setUser({
          user: res.data.user,
          accessToken,
          refreshToken,
        })
      );

      toast.success("Login successful!");
      return res;
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed!");
      throw error;
    }
  };

  return { login, ...result };
};

export const useRegister = () => {
  const [registerMutation, result] = useRegisterMutation();

  const register = async (data: any) => {
    try {
      const res = await registerMutation(data).unwrap();
      toast.success("Registration successful!");
      return res;
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed!");
      throw error;
    }
  };

  return { register, ...result };
};

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    tokenManager.clearTokens();
    dispatch(logout());
    toast.success("Logout successful!");
  };

  return { logoutUser };
};
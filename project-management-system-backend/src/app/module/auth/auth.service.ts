import bcrypt from "bcrypt";

import jwt, { JwtPayload } from "jsonwebtoken";

import httpStatus from "http-status";

import config from "../../config";

import { AppError } from "../../errors/AppError";

import { createToken } from "../../utils/jwt";

import { User } from "../user/user.model";

// LOGIN USER
const loginUser = async (payload: { email: string; password: string }) => {
  // FIND USER
  const user = await User.findOne({
    email: payload.email,
    isDeleted: false,
  }).select("+password");

  // CHECK USER
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // CHECK STATUS
  if (user.status === "suspended") {
    throw new AppError(httpStatus.FORBIDDEN, "User is suspended");
  }

  // CHECK PASSWORD
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password incorrect");
  }

  // JWT PAYLOAD
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  // ACCESS TOKEN
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret!,
    config.jwt_access_expires_in!
  );

  // REFRESH TOKEN
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret!,
    config.jwt_refresh_expires_in!
  );

  // REMOVE PASSWORD
  user.password = "";

  return {
    accessToken,
    refreshToken,
    user,
  };
};

// REFRESH TOKEN
const refreshToken = async (token: string) => {
  // CHECK TOKEN
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token required");
  }

  // VERIFY TOKEN
  const decoded = jwt.verify(token, config.jwt_refresh_secret!) as JwtPayload;

  // FIND USER
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // CREATE NEW ACCESS TOKEN
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret!,
    config.jwt_access_expires_in!
  );

  return {
    accessToken,
  };
};

// GET CURRENT USER
const getMe = async (userId: string) => {
  const result = await User.findById(userId).select("-password");

  return result;
};

// CHANGE PASSWORD
const changePassword = async (
  userId: string,
  payload: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // CHECK OLD PASSWORD
  const isMatched = await bcrypt.compare(payload.oldPassword, user.password);

  if (!isMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password incorrect");
  }

  // HASH NEW PASSWORD
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  // UPDATE PASSWORD
  user.password = hashedPassword;

  await user.save();

  return null;
};

// FORGOT PASSWORD
const forgotPassword = async (email: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // LATER:
  // SEND EMAIL WITH RESET TOKEN

  return {
    message: "Password reset link sent",
  };
};

// RESET PASSWORD
const resetPassword = async (userId: string, newPassword: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  user.password = hashedPassword;

  await user.save();

  return null;
};

export const AuthServices = {
  loginUser,
  refreshToken,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
};

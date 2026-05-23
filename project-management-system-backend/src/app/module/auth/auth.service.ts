import bcrypt from "bcrypt";

import { createToken } from "../../utils/jwt";

import { User } from "../user/user.model";

import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";

// REGISTER USER
const registerUser = async (payload: any) => {
  // CHECK EXISTING USER
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  // CREATE USER
  const result = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return result;
};

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

  // CHECK PASSWORD
  const isMatched = await bcrypt.compare(payload.password, user.password);

  if (!isMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password incorrect");
  }

  // JWT PAYLOAD
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  // ACCESS TOKEN
  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET!,
    process.env.JWT_ACCESS_EXPIRES_IN!
  );

  // REFRESH TOKEN
  const refreshToken = createToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET!,
    process.env.JWT_REFRESH_EXPIRES_IN!
  );

  // REMOVE PASSWORD
  user.password = "";

  return {
    accessToken,
    refreshToken,
    user,
  };
};

// CURRENT USER
const getMe = async (userId: string) => {
  const result = await User.findById(userId);

  return result;
};

export const AuthServices = {
  registerUser,
  loginUser,
  getMe,
};

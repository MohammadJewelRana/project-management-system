import bcrypt from "bcrypt";

import httpStatus from "http-status";

import config from "../../config";

import { AppError } from "../../errors/AppError";

import { User } from "./user.model";

// CREATE USER
const registerUser = async (
  payload: any
) => {
  const existingUser =
    await User.findOne({
      email: payload.email,
    });

  if (existingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      payload.password,
      Number(
        config.bcrypt_salt_rounds
      )
    );

  const result =
    await User.create({
      ...payload,
      password: hashedPassword,
    });

  return result;
};

// GET ALL USERS
const getAllUsers = async () => {
  const result = await User.find({
    isDeleted: false,
  }).select("-password");

  return result;
};

// GET SINGLE USER
const getSingleUser = async (
  id: string
) => {
  const result =
    await User.findById(id).select(
      "-password"
    );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found"
    );
  }

  return result;
};

// UPDATE USER
const updateUser = async (
  id: string,
  payload: any
) => {
  const isUserExists =
    await User.findById(id);

  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found"
    );
  }

  if (payload.password) {
    payload.password =
      await bcrypt.hash(
        payload.password,
        Number(
          config.bcrypt_salt_rounds
        )
      );
  }

  const result =
    await User.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

  return result;
};

// UPDATE USER STATUS
const updateUserStatus =
  async (
    id: string,
    payload: {
      status: string;
    }
  ) => {
    const isUserExists =
      await User.findById(id);

    if (!isUserExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "User not found"
      );
    }

    const result =
      await User.findByIdAndUpdate(
        id,
        {
          status:
            payload.status,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    return result;
  };

// UPDATE USER ROLE
const updateUserRole =
  async (
    id: string,
    payload: {
      role: string;
    }
  ) => {
    const isUserExists =
      await User.findById(id);

    if (!isUserExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "User not found"
      );
    }

    const result =
      await User.findByIdAndUpdate(
        id,
        {
          role: payload.role,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    return result;
  };

// DELETE USER
const deleteUser = async (
  id: string
) => {
  const isUserExists =
    await User.findById(id);

  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found"
    );
  }

  const result =
    await User.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );

  return result;
};

export const UserServices = {
  registerUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserStatus,
  updateUserRole,
  deleteUser,
};
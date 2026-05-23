import httpStatus from "http-status";

import { AppError } from "../errors/AppError";
import { User } from "../module/user/user.model";

 
export const validateActiveUser =
  async (userId: string) => {
    const user =
      await User.findOne({
        _id: userId,
        isDeleted: false,
      });

    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "User not found"
      );
    }

    if (
      user.status !==
      "active"
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Inactive user"
      );
    }

    return user;
  };
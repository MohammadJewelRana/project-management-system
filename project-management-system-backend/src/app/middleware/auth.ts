import jwt, {
  JwtPayload,
} from "jsonwebtoken";

import {
  NextFunction,
  Request,
  Response,
} from "express";

import httpStatus from "http-status";

import { catchAsync } from "../utils/catchAsync";

 

import config from "../config";
 
import { AppError } from "../errors/AppError";
import { User } from "../module/user/user.model";
import { TUserRole } from "../module/user/user.constant";

 

const auth =
  (...requiredRoles: TUserRole[]) => {
    return catchAsync(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        // GET TOKEN
        const token =
          req.headers.authorization;

        // CHECK TOKEN
        if (!token) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are unauthorized user"
          );
        }

        // VERIFY TOKEN
        let decoded;

        try {
          decoded = jwt.verify(
            token,
            config.jwt_access_secret as string
          ) as JwtPayload;
        } catch (error) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "Invalid token"
          );
        }

        // EXTRACT USER INFO
        const {
          role,
          userId,
        } = decoded;

        // CHECK USER EXISTS
        const isUserExists =
          await User.findById(
            userId
          ).select("+password");

        if (!isUserExists) {
          throw new AppError(
            httpStatus.NOT_FOUND,
            "User does not exist"
          );
        }

        // CHECK DELETED
        if (
          isUserExists.isDeleted ===
          true
        ) {
          throw new AppError(
            httpStatus.NOT_FOUND,
            "User already deleted"
          );
        }

        // CHECK STATUS
        if (
          isUserExists.status ===
          "suspended"
        ) {
          throw new AppError(
            httpStatus.FORBIDDEN,
            "User is suspended"
          );
        }

        // ROLE VALIDATION
        if (
          requiredRoles.length &&
          !requiredRoles.includes(
            role
          )
        ) {
          throw new AppError(
            httpStatus.FORBIDDEN,
            "You are not authorized"
          );
        }

        // SET USER
        req.user =
          decoded as JwtPayload;

        next();
      }
    );
  };

export default auth;
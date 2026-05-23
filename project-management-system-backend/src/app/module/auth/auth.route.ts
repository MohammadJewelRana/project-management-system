import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { AuthControllers } from "./auth.controller";

const router = express.Router();

// LOGIN
router.post("/login", AuthControllers.loginUser);

// REFRESH TOKEN
router.post("/refresh-token", AuthControllers.refreshToken);

// GET CURRENT USER
router.get(
  "/me",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  AuthControllers.getMe
);

// CHANGE PASSWORD
router.patch(
  "/change-password",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  AuthControllers.changePassword
);

// FORGOT PASSWORD
router.post("/forgot-password", AuthControllers.forgotPassword);

// RESET PASSWORD
router.post("/reset-password", AuthControllers.resetPassword);

export const AuthRoutes = router;

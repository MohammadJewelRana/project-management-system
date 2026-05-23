import express from "express";

import { AuthControllers } from "./auth.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middleware/auth";

const router = express.Router();

// REGISTER
router.post(
  "/create-user",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AuthControllers.registerUser
);

// LOGIN
router.post("/login", AuthControllers.loginUser);

// CURRENT USER
router.get("/me", AuthControllers.getMe);

export const AuthRoutes = router;

import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "./user.constant";

import { UserControllers } from "./user.controller";

const router = express.Router();

// CREATE USER
router.post(
  "/create-user",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.registerUser
);

// GET ALL USERS
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getAllUsers
);

// GET SINGLE USER
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getSingleUser
);

// UPDATE USER
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.updateUser
);

// UPDATE USER STATUS
router.patch(
  "/status/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.updateUserStatus
);

// UPDATE USER ROLE
router.patch(
  "/role/:id",
  auth(USER_ROLE.superAdmin),
  UserControllers.updateUserRole
);

// DELETE USER
router.delete("/:id", auth(USER_ROLE.superAdmin), UserControllers.deleteUser);

export const UserRoutes = router;

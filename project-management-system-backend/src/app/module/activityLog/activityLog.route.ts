import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { ActivityLogController } from "./activityLog.controller";

const router = express.Router();

// GET ALL
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ActivityLogController.getAllActivities
);

// GET SINGLE
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ActivityLogController.getSingleActivity
);

export const ActivityLogRoutes = router;

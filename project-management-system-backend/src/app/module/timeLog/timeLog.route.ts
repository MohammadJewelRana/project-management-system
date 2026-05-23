import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { TimeLogController } from "./timeLog.controller";

const router = express.Router();

// CREATE
router.post(
  "/create-log",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  TimeLogController.createTimeLog
);

// GET ALL
router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  TimeLogController.getAllTimeLogs
);

// GET SINGLE
router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  TimeLogController.getSingleTimeLog
);

// UPDATE
router.patch(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  TimeLogController.updateTimeLog
);

// DELETE
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TimeLogController.deleteTimeLog
);

export const TimeLogRoutes = router;

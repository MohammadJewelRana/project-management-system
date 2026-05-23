import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { SprintController } from "./sprint.controller";

const router = express.Router();

// CREATE SPRINT
router.post(
  "/create-sprint",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  SprintController.createSprint
);

// GET ALL SPRINTS
router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  SprintController.getAllSprints
);

// GET SINGLE SPRINT
router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  SprintController.getSingleSprint
);

// UPDATE SPRINT
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  SprintController.updateSprint
);

// DELETE SPRINT
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SprintController.deleteSprint
);

export const SprintRoutes = router;

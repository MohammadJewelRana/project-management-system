import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { TaskController } from "./task.controller";

const router = express.Router();

// CREATE TASK
router.post(
  "/create-task",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  TaskController.createTask
);

// GET ALL TASKS
router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  TaskController.getAllTasks
);

// GET SINGLE TASK
router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  TaskController.getSingleTask
);

// UPDATE TASK
router.patch(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  TaskController.updateTask
);

// DELETE TASK
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TaskController.deleteTask
);

export const TaskRoutes = router;

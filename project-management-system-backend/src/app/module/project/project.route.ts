import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { ProjectController } from "./project.controller";

const router = express.Router();

// CREATE PROJECT
router.post(
  "/create-project",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ProjectController.createProject
);

// GET ALL PROJECTS
router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  ProjectController.getAllProjects
);

// GET SINGLE PROJECT
router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  ProjectController.getSingleProject
);

// UPDATE PROJECT
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ProjectController.updateProject
);

// DELETE PROJECT
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProjectController.deleteProject
);

// ADD MEMBER
router.patch(
  "/add-member/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ProjectController.addMemberToProject
);

// REMOVE MEMBER
router.patch(
  "/remove-member/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ProjectController.removeMemberFromProject
);

export const ProjectRoutes = router;

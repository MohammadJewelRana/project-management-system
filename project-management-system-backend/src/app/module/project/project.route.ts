import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { ProjectController } from "./project.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project Management APIs
 */

/**
 * @swagger
 * /projects/create-project:
 *   post:
 *     summary: Create Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - client
 *               - description
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Project Management SaaS
 *
 *               client:
 *                 type: string
 *                 example: Rtemis Limited
 *
 *               description:
 *                 type: string
 *                 example: Full project management application
 *
 *               startDate:
 *                 type: string
 *                 example: 2026-05-25
 *
 *               endDate:
 *                 type: string
 *                 example: 2026-07-30
 *
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                   - urgent
 *
 *               status:
 *                 type: string
 *                 enum:
 *                   - planned
 *                   - active
 *                   - on-hold
 *                   - completed
 *                   - archived
 *
 *               projectManager:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b1111
 *
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *
 *     responses:
 *       201:
 *         description: Project created successfully
 */

// CREATE PROJECT
router.post(
  "/create-project",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ProjectController.createProject
);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get All Projects
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search projects
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 */

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

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get Single Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *
 *       404:
 *         description: Project not found
 */

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

/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: Update Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *
 *               description:
 *                 type: string
 *
 *               status:
 *                 type: string
 *
 *               priority:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Project updated successfully
 */

// UPDATE PROJECT
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ProjectController.updateProject
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */

// DELETE PROJECT
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProjectController.deleteProject
);

/**
 * @swagger
 * /projects/add-member/{id}:
 *   patch:
 *     summary: Add Member To Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *             properties:
 *               memberId:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b1111
 *
 *     responses:
 *       200:
 *         description: Member added successfully
 */

// ADD MEMBER
router.patch(
  "/add-member/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ProjectController.addMemberToProject
);

/**
 * @swagger
 * /projects/remove-member/{id}:
 *   patch:
 *     summary: Remove Member From Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *             properties:
 *               memberId:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b1111
 *
 *     responses:
 *       200:
 *         description: Member removed successfully
 */

// REMOVE MEMBER
router.patch(
  "/remove-member/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ProjectController.removeMemberFromProject
);

export const ProjectRoutes = router;

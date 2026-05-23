import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { SprintController } from "./sprint.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sprint
 *   description: Sprint Management APIs
 */

/**
 * @swagger
 * /sprints/create-sprint:
 *   post:
 *     summary: Create Sprint
 *     tags: [Sprint]
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
 *               - name
 *               - project
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sprint 1
 *
 *               goal:
 *                 type: string
 *                 example: Complete authentication module
 *
 *               project:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b1111
 *
 *               sprintManager:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b2222
 *
 *               startDate:
 *                 type: string
 *                 example: 2026-05-25
 *
 *               endDate:
 *                 type: string
 *                 example: 2026-06-05
 *
 *               status:
 *                 type: string
 *                 enum:
 *                   - planned
 *                   - active
 *                   - completed
 *
 *     responses:
 *       201:
 *         description: Sprint created successfully
 */

// CREATE SPRINT
router.post(
  "/create-sprint",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  SprintController.createSprint
);

/**
 * @swagger
 * /sprints:
 *   get:
 *     summary: Get All Sprints
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search sprint
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: project
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
 *         description: Sprints retrieved successfully
 */

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

/**
 * @swagger
 * /sprints/{id}:
 *   get:
 *     summary: Get Single Sprint
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sprint ID
 *
 *     responses:
 *       200:
 *         description: Sprint retrieved successfully
 *
 *       404:
 *         description: Sprint not found
 */

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

/**
 * @swagger
 * /sprints/{id}:
 *   patch:
 *     summary: Update Sprint
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sprint ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *               goal:
 *                 type: string
 *
 *               status:
 *                 type: string
 *
 *               sprintManager:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Sprint updated successfully
 */

// UPDATE SPRINT
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  SprintController.updateSprint
);

/**
 * @swagger
 * /sprints/{id}:
 *   delete:
 *     summary: Delete Sprint
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sprint ID
 *
 *     responses:
 *       200:
 *         description: Sprint deleted successfully
 */

// DELETE SPRINT
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SprintController.deleteSprint
);

export const SprintRoutes = router;

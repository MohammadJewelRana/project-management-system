import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { TimeLogController } from "./timeLog.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TimeLog
 *   description: Time Log Management APIs
 */

/**
 * @swagger
 * /time-logs/create-log:
 *   post:
 *     summary: Create Time Log
 *     tags: [TimeLog]
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
 *               - task
 *               - project
 *               - hours
 *             properties:
 *               task:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b1111
 *
 *               project:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b2222
 *
 *               hours:
 *                 type: number
 *                 example: 5
 *
 *               description:
 *                 type: string
 *                 example: Worked on authentication module
 *
 *               workDate:
 *                 type: string
 *                 example: 2026-05-25
 *
 *     responses:
 *       201:
 *         description: Time log created successfully
 */

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

/**
 * @swagger
 * /time-logs:
 *   get:
 *     summary: Get All Time Logs
 *     tags: [TimeLog]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search time logs
 *
 *       - in: query
 *         name: task
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: project
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: user
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
 *         description: Time logs retrieved successfully
 */

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

/**
 * @swagger
 * /time-logs/{id}:
 *   get:
 *     summary: Get Single Time Log
 *     tags: [TimeLog]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Time Log ID
 *
 *     responses:
 *       200:
 *         description: Time log retrieved successfully
 *
 *       404:
 *         description: Time log not found
 */

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

/**
 * @swagger
 * /time-logs/{id}:
 *   patch:
 *     summary: Update Time Log
 *     tags: [TimeLog]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Time Log ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hours:
 *                 type: number
 *                 example: 8
 *
 *               description:
 *                 type: string
 *                 example: Updated work progress
 *
 *     responses:
 *       200:
 *         description: Time log updated successfully
 */

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

/**
 * @swagger
 * /time-logs/{id}:
 *   delete:
 *     summary: Delete Time Log
 *     tags: [TimeLog]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Time Log ID
 *
 *     responses:
 *       200:
 *         description: Time log deleted successfully
 */

// DELETE
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TimeLogController.deleteTimeLog
);

export const TimeLogRoutes = router;

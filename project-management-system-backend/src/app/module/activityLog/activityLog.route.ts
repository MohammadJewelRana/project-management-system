import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { ActivityLogController } from "./activityLog.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ActivityLog
 *   description: Activity Log Management APIs
 */

/**
 * @swagger
 * /activity-logs:
 *   get:
 *     summary: Get All Activity Logs
 *     tags: [ActivityLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search activity logs
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Number of items per page
 *
 *     responses:
 *       200:
 *         description: Activity logs retrieved successfully
 */

// GET ALL
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ActivityLogController.getAllActivities
);

/**
 * @swagger
 * /activity-logs/{id}:
 *   get:
 *     summary: Get Single Activity Log
 *     tags: [ActivityLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity Log ID
 *
 *     responses:
 *       200:
 *         description: Activity log retrieved successfully
 *
 *       404:
 *         description: Activity log not found
 */

// GET SINGLE
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  ActivityLogController.getSingleActivity
);

export const ActivityLogRoutes = router;

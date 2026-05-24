import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { TaskController } from "./task.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task Management APIs
 */

/**
 * @swagger
 * /tasks/create-task:
 *   post:
 *     summary: Create Task
 *     tags: [Task]
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
 *               - project
 *             properties:
 *               title:
 *                 type: string
 *                 example: Implement JWT Authentication
 *
 *               description:
 *                 type: string
 *                 example: Create secure JWT login system
 *
 *               project:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b1111
 *
 *               sprint:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b2222
 *
 *               assignee:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b3333
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
 *                   - todo
 *                   - in-progress
 *                   - review
 *                   - done
 *
 *               estimatedHours:
 *                 type: number
 *                 example: 12
 *
 *               dueDate:
 *                 type: string
 *                 example: 2026-06-10
 *
 *     responses:
 *       201:
 *         description: Task created successfully
 */

// CREATE TASK
router.post(
  "/create-task",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.manager),
  TaskController.createTask
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get All Tasks
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search task
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
 *         name: project
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: sprint
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: assignee
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
 *         description: Tasks retrieved successfully
 */

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

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get Single Task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *
 *       404:
 *         description: Task not found
 */

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

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update Task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
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
 *                 enum:
 *                   - todo
 *                   - in-progress
 *                   - review
 *                   - done
 *
 *               priority:
 *                 type: string
 *
 *               assignee:
 *                 type: string
 *
 *               progress:
 *                 type: number
 *
 *     responses:
 *       200:
 *         description: Task updated successfully
 */

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

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete Task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */

// DELETE TASK
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TaskController.deleteTask
);

export const TaskRoutes = router;

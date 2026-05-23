import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "../user/user.constant";

import { CommentController } from "./comment.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment Management APIs
 */

/**
 * @swagger
 * /comments/create-comment:
 *   post:
 *     summary: Create Comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *               - project
 *               - content
 *             properties:
 *               task:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b1111
 *
 *               project:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b2222
 *
 *               parentComment:
 *                 type: string
 *                 example: 6852e6e21ab23f1f5a1b3333
 *
 *               content:
 *                 type: string
 *                 example: This task needs improvement
 *
 *     responses:
 *       201:
 *         description: Comment created successfully
 */

// CREATE
router.post(
  "/create-comment",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  CommentController.createComment
);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get All Comments
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search comments
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
 *         description: Comments retrieved successfully
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
  CommentController.getAllComments
);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get Single Comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *
 *       404:
 *         description: Comment not found
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
  CommentController.getSingleComment
);

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: Update Comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment text
 *
 *     responses:
 *       200:
 *         description: Comment updated successfully
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
  CommentController.updateComment
);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete Comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */

// DELETE
router.delete(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.manager,
    USER_ROLE.member
  ),
  CommentController.deleteComment
);

export const CommentRoutes = router;

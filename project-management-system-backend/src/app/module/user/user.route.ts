import express from "express";

import auth from "../../middleware/auth";

import { USER_ROLE } from "./user.constant";

import { UserControllers } from "./user.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Management APIs
 */

/**
 * @swagger
 * /users/create-user:
 *   post:
 *     summary: Create User
 *     tags: [User]
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
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Md Jewel Rana
 *
 *               email:
 *                 type: string
 *                 example: jewel@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *               role:
 *                 type: string
 *                 enum:
 *                   - superAdmin
 *                   - admin
 *                   - manager
 *                   - member
 *
 *               phone:
 *                 type: string
 *                 example: 01700000000
 *
 *               designation:
 *                 type: string
 *                 example: MERN Stack Developer
 *
 *     responses:
 *       201:
 *         description: User created successfully
 */

// CREATE USER
router.post(
  "/create-user",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.registerUser
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get All Users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search users
 *
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: status
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
 *         description: Users retrieved successfully
 */

// GET ALL USERS
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getAllUsers
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get Single User
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *
 *       404:
 *         description: User not found
 */

// GET SINGLE USER
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getSingleUser
);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update User
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *               phone:
 *                 type: string
 *
 *               designation:
 *                 type: string
 *
 *               avatar:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: User updated successfully
 */

// UPDATE USER
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.updateUser
);

/**
 * @swagger
 * /users/status/{id}:
 *   patch:
 *     summary: Update User Status
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - blocked
 *
 *     responses:
 *       200:
 *         description: User status updated successfully
 */

// UPDATE USER STATUS
router.patch(
  "/status/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.updateUserStatus
);

/**
 * @swagger
 * /users/role/{id}:
 *   patch:
 *     summary: Update User Role
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - manager
 *                   - member
 *
 *     responses:
 *       200:
 *         description: User role updated successfully
 */

// UPDATE USER ROLE
router.patch(
  "/role/:id",
  auth(USER_ROLE.superAdmin),
  UserControllers.updateUserRole
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete User
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

// DELETE USER
router.delete("/:id", auth(USER_ROLE.superAdmin), UserControllers.deleteUser);

export const UserRoutes = router;

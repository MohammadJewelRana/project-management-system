import express from "express";

import { AuthControllers } from "./auth.controller";

const router = express.Router();

// REGISTER
router.post("/register", AuthControllers.registerUser);

// LOGIN
router.post("/login", AuthControllers.loginUser);

// CURRENT USER
router.get("/me", AuthControllers.getMe);

export const AuthRoutes = router;

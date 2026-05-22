import express from "express";

import { ProjectController } from "./project.controller";

const router = express.Router();

router.post("/", ProjectController.createProject);

router.get("/", ProjectController.getAllProjects);

router.get("/:id", ProjectController.getSingleProject);

router.patch("/:id", ProjectController.updateProject);

router.delete("/:id", ProjectController.deleteProject);

export const ProjectRoutes = router;



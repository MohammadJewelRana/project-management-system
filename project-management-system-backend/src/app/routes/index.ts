import { Router } from "express";
import { ProjectRoutes } from "../module/project/project.route";
import { AuthRoutes } from "../module/auth/auth.route";
 

const router = Router();

const moduleRoutes = [
  {
    path: "/projects",
    route: ProjectRoutes,
  },
    {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

import { Router } from "express";
import { ProjectRoutes } from "../module/project/project.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/user/user.route";
import { SprintRoutes } from "../module/sprint/sprint.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },

  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/sprints",
    route: SprintRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

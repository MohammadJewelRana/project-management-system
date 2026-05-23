import { Router } from "express";
import { ProjectRoutes } from "../module/project/project.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/user/user.route";
import { SprintRoutes } from "../module/sprint/sprint.route";
import { TaskRoutes } from "../module/task/task.route";
import { TimeLogRoutes } from "../module/timeLog/timeLog.route";

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
    path: "/tasks",
    route: TaskRoutes,
  },
  {
    path: "/sprints",
    route: SprintRoutes,
  },
  {
    path: "/time-logs",
    route: TimeLogRoutes,
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

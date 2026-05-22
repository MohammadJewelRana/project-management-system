import { Router } from "express";
import { SurahRoutes } from "../module/project/project.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/surahs",
    route: SurahRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

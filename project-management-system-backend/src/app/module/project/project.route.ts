import express from "express";
import { SurahController } from "./project.controller";

const router = express.Router();

router.get("/", SurahController.getAllSurahs);
router.get("/search", SurahController.searchAyah);
router.get("/:id", SurahController.getSingleSurah);

export const SurahRoutes = router;















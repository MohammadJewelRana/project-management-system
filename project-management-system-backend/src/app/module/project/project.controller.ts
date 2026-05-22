import { Request, Response } from "express";
import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";

import { SurahService } from "./project.service";
import { catchAsync } from "../../utils/catchAsync";
import { request } from "http";

const getAllSurahs = catchAsync(async (req: Request, res: Response) => {
  const result = await SurahService.getAllSurahs(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Surahs retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

//  Get Single Surah
const getSingleSurah = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { page, limit } = req.query;

  const result = await SurahService.getSingleSurah(Number(id), {
    page: page as string,
    limit: limit as string,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Surah retrieved successfully",
    data: result,
  });
});

//  Search Ayah
const searchAyah = catchAsync(async (req: Request, res: Response) => {
  const { q, surahId } = req.query;

  const query = typeof q === "string" ? q.trim() : "";
  const parsedSurahId =
    typeof surahId === "string" ? Number(surahId) : undefined;

  if (!query) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Empty query",
      data: [],
    });
  }

  const result = await SurahService.searchAyah(query, parsedSurahId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Search results retrieved successfully",
    data: result,
  });
});

export const SurahController = {
  getAllSurahs,
  getSingleSurah,
  searchAyah,
};

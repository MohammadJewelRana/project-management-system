import { Surah } from "./project.model";

import { ParsedQs } from "qs";

type SurahQuery = {
  page?: string;
  limit?: string;
};

const getAllSurahs = async (query: SurahQuery) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 12;
  const skip = (page - 1) * limit;

  const total = await Surah.countDocuments();

  const data = await Surah.find(
    {},
    {
      _id: 0,
      id: 1,
      name: 1,
      transliteration: 1,
      total_verses: 1,
      type: 1,
    }
  )
    .sort({ id: 1 })
    .skip(skip)
    .limit(limit);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

//  Get Single Surah
const getSingleSurah = async (
  id: number,
  query: { page?: string; limit?: string }
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const result = await Surah.findOne({ id }, { _id: 0, __v: 0 }).lean();

  if (!result) {
    throw new Error("Surah not found");
  }

  const totalVerses = result.verses.length;
  const totalPages = Math.ceil(totalVerses / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    id: result.id,
    name: result.name,
    transliteration: result.transliteration,
    total_verses: result.total_verses,
    type: result.type,
    translation: result.translation,
    verses: result.verses.slice(start, end),
    meta: {
      page,
      limit,
      totalVerses,
      totalPages,
    },
  };
};

const searchAyah = async (query: string, surahId?: number): Promise<any[]> => {
  if (!query?.trim()) return [];

  const filter: any = {
    $text: { $search: query },
  };

  if (surahId) {
    filter.id = surahId;
  }

  const surahs = await Surah.find(filter, {
    score: { $meta: "textScore" },
  })
    .sort({ score: { $meta: "textScore" } })
    .select("id name transliteration verses")
    .limit(10)
    .lean();

  const results: any[] = [];

  for (const surah of surahs) {
    const matchedVerses = surah.verses
      .filter((verse: any) =>
        verse.translation?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map((verse: any) => ({
        ayahId: verse.id,
        text: verse.text,
        translation: verse.translation,
        preview: verse.translation.slice(0, 120),
      }));

    if (matchedVerses.length > 0) {
      results.push({
        surahId: surah.id,
        surahName: surah.name,
        transliteration: surah.transliteration,
        verses: matchedVerses,
      });
    }
  }

  return results;
};

export const SurahService = {
  getAllSurahs,
  getSingleSurah,
  searchAyah,
};

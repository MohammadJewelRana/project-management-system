export const formatSurahResponse = (data: any) => {
  return {
    id: data.id,
    name: data.name,
    transliteration: data.transliteration,
    total_verses: data.total_verses,
  };
};
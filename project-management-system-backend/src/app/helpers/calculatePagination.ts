export const calculatePagination =
  (
    total: number,
    page: number,
    limit: number
  ) => {
    return {
      page,
      limit,
      total,
      totalPage:
        Math.ceil(
          total / limit
        ),
    };
  };
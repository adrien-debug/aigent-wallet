export type PaginationMeta = {
  limit: number;
  offset: number;
  returned: number;
  total: number;
};

export function parsePagination(searchParams: URLSearchParams): {
  limit: number;
  offset: number;
} {
  const rawLimit = searchParams.get("limit");
  const rawOffset = searchParams.get("offset");
  const limitParsed = parseInt(rawLimit ?? "50", 10);
  const offsetParsed = parseInt(rawOffset ?? "0", 10);
  const limit = Number.isFinite(limitParsed)
    ? Math.min(Math.max(limitParsed, 1), 200)
    : 50;
  const offset = Number.isFinite(offsetParsed) ? Math.max(offsetParsed, 0) : 0;
  return { limit, offset };
}

export function paginateSlice<T>(
  rows: T[],
  limit: number,
  offset: number,
): { slice: T[]; meta: PaginationMeta } {
  const slice = rows.slice(offset, offset + limit);
  return {
    slice,
    meta: {
      limit,
      offset,
      returned: slice.length,
      total: rows.length,
    },
  };
}

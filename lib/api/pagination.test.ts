import { describe, expect, it } from "vitest";
import { TX_DEFAULT_LIMIT, TX_MAX_LIMIT } from "@/lib/api/constants";
import { paginateSlice, parsePagination } from "@/lib/api/pagination";

describe("parsePagination", () => {
  it("uses defaults", () => {
    const u = new URLSearchParams();
    expect(parsePagination(u)).toEqual({
      limit: TX_DEFAULT_LIMIT,
      offset: 0,
    });
  });

  it("clamps limit to max", () => {
    const u = new URLSearchParams({ limit: "9999", offset: "0" });
    expect(parsePagination(u).limit).toBe(TX_MAX_LIMIT);
  });

  it("parses offset", () => {
    const u = new URLSearchParams({ limit: "10", offset: "5" });
    expect(parsePagination(u)).toEqual({ limit: 10, offset: 5 });
  });
});

describe("paginateSlice", () => {
  it("returns meta totals", () => {
    const rows = [1, 2, 3, 4, 5];
    const { slice, meta } = paginateSlice(rows, 2, 1);
    expect(slice).toEqual([2, 3]);
    expect(meta).toMatchObject({
      limit: 2,
      offset: 1,
      returned: 2,
      total: 5,
    });
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isNetworkId, isWalletType } from "@/lib/api/stubs";
import {
  optDiscriminant,
  reqDiscriminant,
  reqFiniteNumber,
  reqTrimmedString,
} from "@/lib/api/validate";

function req(url = "http://test.local") {
  return new Request(url);
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("reqTrimmedString", () => {
  it("rejects blank", () => {
    const r = reqTrimmedString({ name: "  " }, "name", req());
    expect(r.ok).toBe(false);
  });

  it("trims", () => {
    const r = reqTrimmedString({ name: "  x  " }, "name", req());
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe("x");
  });
});

describe("reqFiniteNumber", () => {
  it("enforces min", () => {
    const r = reqFiniteNumber({ n: -1 }, "n", req(), 0);
    expect(r.ok).toBe(false);
  });

  it("accepts valid", () => {
    const r = reqFiniteNumber({ n: 10 }, "n", req(), 0);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(10);
  });
});

describe("reqDiscriminant", () => {
  it("uses guard", () => {
    const ok = reqDiscriminant({ t: "agent" }, "t", req(), isWalletType);
    expect(ok.ok).toBe(true);
    const bad = reqDiscriminant({ t: "nope" }, "t", req(), isWalletType);
    expect(bad.ok).toBe(false);
  });
});

describe("optDiscriminant", () => {
  it("allows undefined", () => {
    const r = optDiscriminant({}, "s", req(), isNetworkId);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBeUndefined();
  });
});

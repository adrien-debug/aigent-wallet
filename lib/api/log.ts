type Fields = Record<string, string | number | undefined>;

function scrub(fields?: Fields) {
  if (!fields) return {};
  return Object.fromEntries(
    Object.entries(fields).filter(([, v]) => v !== undefined),
  ) as Record<string, string | number>;
}

export function apiLogError(code: string, httpStatus: number, fields?: Fields) {
  console.error("[api]", JSON.stringify({ code, httpStatus, ...scrub(fields) }));
}

export function apiLogInfo(event: string, fields?: Fields) {
  console.info("[api]", JSON.stringify({ event, ...scrub(fields) }));
}

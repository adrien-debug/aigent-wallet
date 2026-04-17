export type ReadJsonResult<T> = { ok: true; data: T } | { ok: false; message: string };

export async function readJson<T = unknown>(
  request: Request,
): Promise<ReadJsonResult<T>> {
  try {
    const text = await request.text();
    if (!text.trim()) {
      return { ok: false, message: "Request body is empty." };
    }
    const data = JSON.parse(text) as T;
    return { ok: true, data };
  } catch {
    return { ok: false, message: "Invalid JSON body." };
  }
}

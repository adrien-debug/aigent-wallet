import { getWalletById } from "@/lib/api/memory-store";
import { jsonErr, jsonOk } from "@/lib/api/response";

export function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (!id?.trim()) {
    return jsonErr(400, "invalid_id", "Wallet id is required.", undefined, request);
  }
  const wallet = getWalletById(id);
  if (!wallet) {
    return jsonErr(404, "wallet_not_found", "Wallet not found.", {
      walletId: id,
    }, request);
  }
  return jsonOk({ wallet }, { request });
}

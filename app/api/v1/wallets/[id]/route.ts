import { wallets } from "@/data/wallets";
import { jsonErr, jsonOk } from "@/lib/api/response";

export function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (!id?.trim()) {
    return jsonErr(400, "invalid_id", "Wallet id is required.");
  }
  const wallet = wallets.find((w) => w.id === id);
  if (!wallet) {
    return jsonErr(404, "wallet_not_found", "Wallet not found.", {
      walletId: id,
    });
  }
  return jsonOk({ wallet });
}

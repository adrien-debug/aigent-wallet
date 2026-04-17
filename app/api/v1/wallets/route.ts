import { wallets } from "@/data/wallets";
import { jsonOk } from "@/lib/api/response";

export function GET() {
  return jsonOk({ wallets, count: wallets.length });
}

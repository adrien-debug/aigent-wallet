import { transactions } from "@/data/transactions";
import { paginateSlice, parsePagination } from "@/lib/api/pagination";
import {
  filterTransactions,
  parseTransactionStatus,
} from "@/lib/api/transactions-query";
import { jsonErr, jsonOk } from "@/lib/api/response";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const statusRaw = searchParams.get("status");
  const parsed = parseTransactionStatus(statusRaw);
  if (parsed === null) {
    return jsonErr(
      400,
      "invalid_status",
      "Invalid status filter.",
      {
        status: statusRaw ?? "",
      },
      request,
    );
  }
  const q = searchParams.get("q") ?? undefined;
  const walletId = searchParams.get("walletId") ?? undefined;
  const filtered = filterTransactions(transactions, {
    q,
    status: parsed,
    walletId: walletId || undefined,
  });
  const { limit, offset } = parsePagination(searchParams);
  const { slice, meta } = paginateSlice(filtered, limit, offset);
  return jsonOk(
    {
      transactions: slice,
      pagination: meta,
      sourceTotal: transactions.length,
    },
    { request },
  );
}

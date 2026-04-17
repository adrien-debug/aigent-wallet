import {
  dashboardMetrics,
  riskTrend,
  spendByWallet,
  volumeSeries,
} from "@/data/metrics";
import { jsonOk } from "@/lib/api/response";

export function GET(request: Request) {
  return jsonOk(
    {
      dashboard: dashboardMetrics,
      charts: {
        volume: volumeSeries,
        spendByWallet,
        riskTrend,
      },
    },
    { request },
  );
}

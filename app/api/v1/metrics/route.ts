import {
  dashboardMetrics,
  riskTrend,
  spendByWallet,
  volumeSeries,
} from "@/data/metrics";
import { jsonOk } from "@/lib/api/response";

export function GET() {
  return jsonOk({
    dashboard: dashboardMetrics,
    charts: {
      volume: volumeSeries,
      spendByWallet,
      riskTrend,
    },
  });
}

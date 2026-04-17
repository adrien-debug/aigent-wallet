import { teamMembers } from "@/data/team";
import { jsonOk } from "@/lib/api/response";

export function GET() {
  return jsonOk({ members: teamMembers, count: teamMembers.length });
}

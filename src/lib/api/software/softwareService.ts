import { Software } from "@/lib/types/software/software";
import { API_BASE_URL } from "../../constants";
export async function getAllSoftware(): Promise<Software[]> {
  const res = await fetch(
    `${API_BASE_URL}/Software?includeDevelopmentTeams=false`
  );
  if (!res.ok) throw new Error(`Lỗi API: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data["$values"]) ? data["$values"] : [];
}

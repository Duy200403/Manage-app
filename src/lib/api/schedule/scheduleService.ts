import { Schedule } from "@/lib/types/schedule/schedule";
import { API_BASE_URL } from "@/lib/constants";
export async function fetchSchedule(): Promise<Schedule[]> {
  const res = await fetch(`${API_BASE_URL}/Shift?includeEmployees=true`);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const data = await res.json();
  //   console.log(data);
  // Trường hợp sử dụng `$values` từ C# WebAPI
  return data.$values ?? data;
}

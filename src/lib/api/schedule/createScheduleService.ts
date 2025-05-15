import { CreateShiftPayload } from "@/lib/types/schedule/createSchedule";
import { API_BASE_URL } from "@/lib/constants";
export async function createShift(payload: CreateShiftPayload) {
  const response = await fetch(`${API_BASE_URL}/Shift`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Lỗi khi tạo ca trực");
  }
}

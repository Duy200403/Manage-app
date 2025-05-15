import { Employee } from "@/lib/types/employee/employee";
import { API_BASE_URL } from "../../constants";
export async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch(`${API_BASE_URL}/Employee?includeShifts=false`);
  const data = await res.json();
  console.log(data);
  if (data && Array.isArray(data["$values"])) {
    return data["$values"];
  } else {
    throw new Error("Dữ liệu trả về không hợp lệ.");
  }
}
export async function fetchEmployee(id: string): Promise<Employee> {
  const res = await fetch(`${API_BASE_URL}/Employee/${id}?includeShifts=false`);
  const data = await res.json();
  return data;
}
